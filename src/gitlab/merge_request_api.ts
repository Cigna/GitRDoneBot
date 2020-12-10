import { URI } from "./uri";
import {
  AuthorizationFailureResponse,
  NotFoundORNetworkFailureResponse,
  SuccessfulGetResponse,
  SuccessfulPostORPutResponse,
} from "./api_responses";
import { FetchWrapper } from "./fetch_wrapper";

/**
 * This class aggregates the logic to interact with the GitLab API.
 *
 * Its private properties are used to cache GET responses that may be
 * used in more than one Bot Action in order to reduce overall number of requests.
 *
 * Each instance of this class constructs instances of the utility classes URI and FetchWrapper.
 */
export class MergeRequestApi {
  private MRChanges!: SuccessfulGetResponse;
  private MRCommits!: SuccessfulGetResponse;
  readonly uriBuilder!: URI;
  readonly fetchWrapper!: FetchWrapper;

  constructor(
    readonly token: string,
    readonly projectId: number,
    readonly mergeReqId: number,
    readonly baseURI: string,
  ) {
    this.uriBuilder = new URI(baseURI, projectId, mergeReqId);
    this.fetchWrapper = new FetchWrapper(token);
  }

  // EMOJIS

  public postEmoji(
    qs: any,
  ): Promise<SuccessfulPostORPutResponse | NotFoundORNetworkFailureResponse> {
    const uri: string = this.uriBuilder.forEmojis();
    return this.fetchWrapper.makePostRequest(uri, {
      name: qs,
    });
  }

  /** HELPER METHOD FOR TESTS ONLY */
  public deleteEmoji(
    awardId: number,
  ): Promise<
    | SuccessfulGetResponse
    | NotFoundORNetworkFailureResponse
    | AuthorizationFailureResponse
  > {
    const uri: string = this.uriBuilder.forSingleEmoji(awardId);
    return this.fetchWrapper.makeDeleteRequest(uri);
  }

  /** HELPER METHOD FOR TESTS ONLY */
  public getAllEmojis(): Promise<
    | SuccessfulGetResponse
    | NotFoundORNetworkFailureResponse
    | AuthorizationFailureResponse
  > {
    const uri: string = this.uriBuilder.forEmojis();
    return this.fetchWrapper.makeGetRequest(uri);
  }

  // NOTES

  /**
   * @remarks
   * If api returns a page with less than 100 notes, that is the last page available.
   * This method should never use cached responses, as it may be called multiple times to get additional pages of results.
   * */
  public getAllMRNotes(
    page: number,
  ): Promise<
    | SuccessfulGetResponse
    | NotFoundORNetworkFailureResponse
    | AuthorizationFailureResponse
  > {
    const uri: string = this.uriBuilder.forNotesFilterByPage(page);
    return this.fetchWrapper.makeGetRequest(uri);
  }

  public editMRNote(
    noteId: number,
    qs: any,
  ): Promise<SuccessfulPostORPutResponse | NotFoundORNetworkFailureResponse> {
    const uri: string = this.uriBuilder.forSingleNote(noteId);
    return this.fetchWrapper.makePutRequest(uri, { body: qs });
  }

  public newMRNote(
    qs: any,
  ): Promise<SuccessfulPostORPutResponse | NotFoundORNetworkFailureResponse> {
    const uri: string = this.uriBuilder.forNotes();
    return this.fetchWrapper.makePostRequest(uri, { body: qs });
  }

  /**
   * HELPER METHOD FOR TESTS ONLY
   * @remarks
   * This will only delete comments directly posted on the MR -
   * it will NOT delete comments that are listed on MR that come from commits or other sources -
   * if it's tried, a 403 Forbidden status will be returned :) */
  public deleteMRNote(
    noteId: number,
  ): Promise<
    | SuccessfulGetResponse
    | NotFoundORNetworkFailureResponse
    | AuthorizationFailureResponse
  > {
    const uri: string = this.uriBuilder.forSingleNote(noteId);
    return this.fetchWrapper.makeDeleteRequest(uri);
  }

  // GENERAL MERGE REQUEST

  public getMergeRequestsByAssigneeId(
    assigneeId: number,
    threshold: number,
  ): Promise<
    | SuccessfulGetResponse
    | NotFoundORNetworkFailureResponse
    | AuthorizationFailureResponse
  > {
    const uri: string = this.uriBuilder.forMRsFilterByAssigneeId(
      assigneeId,
      threshold,
    );
    return this.fetchWrapper.makeGetRequest(uri);
  }

  public getMRApprovalConfig(): Promise<
    | SuccessfulGetResponse
    | NotFoundORNetworkFailureResponse
    | AuthorizationFailureResponse
  > {
    const uri: string = this.uriBuilder.forMRApprovals();
    return this.fetchWrapper.makeGetRequest(uri);
  }

  // this method is used by multiple Bot Actions, so the first successful response is cached
  public async getSingleMRChanges(): Promise<
    | SuccessfulGetResponse
    | NotFoundORNetworkFailureResponse
    | AuthorizationFailureResponse
  > {
    const uri: string = this.uriBuilder.forMRChanges();

    const response =
      this.MRChanges || (await this.fetchWrapper.makeGetRequest(uri));
    if (!this.MRChanges && response instanceof SuccessfulGetResponse) {
      this.MRChanges = response;
    }
    return response;
  }

  // this method is used by multiple Bot Actions, so the first successful response is cached
  public async getSingleMRCommits(): Promise<
    | SuccessfulGetResponse
    | NotFoundORNetworkFailureResponse
    | AuthorizationFailureResponse
  > {
    const uri: string = this.uriBuilder.forSingleMRCommits();

    const response =
      this.MRCommits || (await this.fetchWrapper.makeGetRequest(uri));
    if (!this.MRCommits && response instanceof SuccessfulGetResponse) {
      this.MRCommits = response;
    }
    return response;
  }

  public getSingleMR(): Promise<
    | SuccessfulGetResponse
    | NotFoundORNetworkFailureResponse
    | AuthorizationFailureResponse
  > {
    const uri: string = this.uriBuilder.forSingleMR();
    return this.fetchWrapper.makeGetRequest(uri);
  }

  // REPOSITORY FILES

  public getConfigurationFile(): Promise<
    | SuccessfulGetResponse
    | NotFoundORNetworkFailureResponse
    | AuthorizationFailureResponse
  > {
    const uri: string = this.uriBuilder.forSingleProjectRepoRawConfigFile();
    return this.fetchWrapper.makeGetRequest(uri);
  }
}
