import * as winston from "winston";
import { SuccessfulGetResponse, FailedResponse, URI } from ".";
import { GitLabPostResponse } from "./gitlab_post_response";
import { FetchWrapper } from "./fetch_wrapper";

// For the ones that will never be cached, lets not declare them and clean up the function call for cached/not cached

/**
 * This class contains the logic to interact with the GitLab API.
 * Its private properties are used to cache GET responses that may be used in more than one Bot Action in order to reduce overall number of requests.
 * Each instance of this class contains the GRDBot service account GitLab API token required to interact with the API, unique project & Merge Request IDs of incoming GitLab event, and an instance of the URI class that dynamically constructs API endpoints based on the unique event values.
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
    readonly logger: winston.Logger,
  ) {
    this.uriBuilder = new URI(baseURI, projectId, mergeReqId);
    this.fetchWrapper = new FetchWrapper(token, logger);
  }

  // EMOJIS

  public postEmoji(qs: any): Promise<GitLabPostResponse> {
    const uri: string = this.uriBuilder.forEmojis();
    return this.fetchWrapper.postGitlabResponseObject(uri, {
      name: qs,
    });
  }

  /** HELPER METHOD FOR TESTS ONLY */
  public deleteEmoji(
    awardId: number,
  ): Promise<SuccessfulGetResponse | FailedResponse> {
    const uri: string = this.uriBuilder.forSingleEmoji(awardId);
    return this.fetchWrapper.deleteGitlabResponseObject(uri);
  }

  /** HELPER METHOD FOR TESTS ONLY */
  public getAllEmojis(): Promise<SuccessfulGetResponse | FailedResponse> {
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
  ): Promise<FailedResponse | SuccessfulGetResponse> {
    const uri: string = this.uriBuilder.forNotesFilterByPage(page);
    return this.fetchWrapper.makeGetRequest(uri);
  }

  public editMRNote(noteId: number, qs: any): Promise<GitLabPostResponse> {
    const uri: string = this.uriBuilder.forSingleNote(noteId);
    return this.fetchWrapper.putGitlabResponseObject(uri, { body: qs });
  }

  public newMRNote(qs: any): Promise<GitLabPostResponse> {
    const uri: string = this.uriBuilder.forNotes();
    return this.fetchWrapper.postGitlabResponseObject(uri, { body: qs });
  }

  /**
   * HELPER METHOD FOR TESTS ONLY
   * @remarks
   * This will only delete comments directly posted on the MR -
   * it will NOT delete comments that are listed on MR that come from commits or other sources -
   * if it's tried, a 403 Forbidden status will be returned :) */
  public deleteMRNote(
    noteId: number,
  ): Promise<FailedResponse | SuccessfulGetResponse> {
    const uri: string = this.uriBuilder.forSingleNote(noteId);
    return this.fetchWrapper.deleteGitlabResponseObject(uri);
  }

  // GENERAL MERGE REQUEST

  public getMergeRequestsByAssigneeId(
    assigneeId: number,
    threshold: number,
  ): Promise<FailedResponse | SuccessfulGetResponse> {
    const uri: string = this.uriBuilder.forMRsFilterByAssigneeId(
      assigneeId,
      threshold,
    );
    return this.fetchWrapper.makeGetRequest(uri);
  }

  public getMRApprovalConfig(): Promise<
    FailedResponse | SuccessfulGetResponse
  > {
    const uri: string = this.uriBuilder.forMRApprovals();
    return this.fetchWrapper.makeGetRequest(uri);
  }

  public async getSingleMRChanges(): Promise<
    FailedResponse | SuccessfulGetResponse
  > {
    const uri: string = this.uriBuilder.forMRChanges();

    const response: FailedResponse | SuccessfulGetResponse =
      this.MRChanges || (await this.fetchWrapper.makeGetRequest(uri));
    if (response instanceof SuccessfulGetResponse) {
      this.MRChanges = response;
    }
    return response;
  }

  public async getSingleMRCommits(): Promise<
    FailedResponse | SuccessfulGetResponse
  > {
    const uri: string = this.uriBuilder.forSingleMRCommits();

    const response: FailedResponse | SuccessfulGetResponse =
      this.MRCommits || (await this.fetchWrapper.makeGetRequest(uri));
    if (response instanceof SuccessfulGetResponse) {
      this.MRCommits = response;
    }
    return response;
  }

  public getSingleMR(): Promise<FailedResponse | SuccessfulGetResponse> {
    const uri: string = this.uriBuilder.forSingleMR();
    return this.fetchWrapper.makeGetRequest(uri);
  }

  // REPOSITORY FILES

  public getConfigurationFile(): Promise<
    FailedResponse | SuccessfulGetResponse
  > {
    const uri: string = this.uriBuilder.forSingleProjectRepoRawConfigFile();
    return this.fetchWrapper.makeGetRequest(uri);
  }
}
