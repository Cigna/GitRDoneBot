import * as winston from "winston";
import fetch from "node-fetch";
import * as HttpStatus from "http-status-codes";
import { GitLabGetResponse, URI } from ".";
import { GitLabPostResponse } from "./gitlab_post_response";

/**
 * This class contains the logic to interact with the GitLab API.
 * Its private properties are used to cache GET responses that may be used in more than one Bot Action in order to reduce overall number of requests.
 * Each instance of this class contains the GRDBot service account GitLab API token required to interact with the API, unique project & Merge Request IDs of incoming GitLab event, and an instance of the URI class that dynamically constructs API endpoints based on the unique event values.
 */
export class MergeRequestApi {
  private allMRNotes!: GitLabGetResponse;
  private allEmojis!: GitLabGetResponse;
  private allMRByAssigneeId!: GitLabGetResponse;
  private MRApprovalConfiguration!: GitLabGetResponse;
  private MRChanges!: GitLabGetResponse;
  private MRCommits!: GitLabGetResponse;
  private singleMR!: GitLabGetResponse;
  private rawConfigFile!: GitLabGetResponse;
  // To reuse response, set useCache to true in getGitlabResponseObject params
  readonly reuseResponseIfExists: boolean = true;
  // To not reuse response, set useCache to false in getGitlabResponseObject params
  readonly doNotReuseResponse: boolean = false;
  readonly uriBuilder!: URI;

  constructor(
    readonly token: string,
    readonly projectId: number,
    readonly mergeReqId: number,
    readonly baseURI: string,
    readonly logger: winston.Logger,
  ) {
    this.uriBuilder = new URI(baseURI, projectId, mergeReqId);
  }

  // EMOJIS

  public postEmoji(qs: any): Promise<GitLabPostResponse> {
    const uri: string = this.uriBuilder.forEmojis();
    return this.postGitlabResponseObject(uri, {
      name: qs,
    });
  }

  /** HELPER METHOD FOR TESTS ONLY */
  public deleteEmoji(awardId: number): Promise<GitLabGetResponse> {
    const uri: string = this.uriBuilder.forSingleEmoji(awardId);
    return this.deleteGitlabResponseObject(uri);
  }

  /** HELPER METHOD FOR TESTS ONLY */
  public async getAllEmojis(): Promise<GitLabGetResponse> {
    const uri: string = this.uriBuilder.forEmojis();
    this.allEmojis = await this.getGitlabResponseObject(
      uri,
      this.allEmojis,
      this.doNotReuseResponse,
    );
    return this.allEmojis;
  }

  // NOTES

  /**
   * @remarks
   * If api returns a page with less than 100 notes, that is the last page available.
   * This method should never use cached responses, as it may be called multiple times to get additional pages of results.
   * */
  public async getAllMRNotes(page: number): Promise<GitLabGetResponse> {
    const uri: string = this.uriBuilder.forNotesFilterByPage(page);
    this.allMRNotes = await this.getGitlabResponseObject(
      uri,
      this.allMRNotes,
      this.doNotReuseResponse,
    );
    return this.allMRNotes;
  }

  public editMRNote(noteId: number, qs: any): Promise<GitLabPostResponse> {
    const uri: string = this.uriBuilder.forSingleNote(noteId);
    return this.putGitlabResponseObject(uri, { body: qs });
  }

  public newMRNote(qs: any): Promise<GitLabPostResponse> {
    const uri: string = this.uriBuilder.forNotes();
    return this.postGitlabResponseObject(uri, { body: qs });
  }

  /**
   * HELPER METHOD FOR TESTS ONLY
   * @remarks
   * This will only delete comments directly posted on the MR -
   * it will NOT delete comments that are listed on MR that come from commits or other sources -
   * if it's tried, a 403 Forbidden status will be returned :) */
  public deleteMRNote(noteId: number): Promise<GitLabGetResponse> {
    const uri: string = this.uriBuilder.forSingleNote(noteId);
    return this.deleteGitlabResponseObject(uri);
  }

  // GENERAL MERGE REQUEST

  public async getMergeRequestsByAssigneeId(
    assigneeId: number,
    threshold: number,
  ): Promise<GitLabGetResponse> {
    const uri: string = this.uriBuilder.forMRsFilterByAssigneeId(
      assigneeId,
      threshold,
    );
    this.allMRByAssigneeId = await this.getGitlabResponseObject(
      uri,
      this.allMRByAssigneeId,
      this.doNotReuseResponse,
    );
    return this.allMRByAssigneeId;
  }

  public async getMRApprovalConfig(): Promise<GitLabGetResponse> {
    const uri: string = this.uriBuilder.forMRApprovals();
    this.MRApprovalConfiguration = await this.getGitlabResponseObject(
      uri,
      this.MRApprovalConfiguration,
      this.doNotReuseResponse,
    );
    return this.MRApprovalConfiguration;
  }

  public async getSingleMRChanges(): Promise<GitLabGetResponse> {
    const uri: string = this.uriBuilder.forMRChanges();
    this.MRChanges = await this.getGitlabResponseObject(
      uri,
      this.MRChanges,
      this.reuseResponseIfExists,
    );
    return this.MRChanges;
  }

  public async getSingleMRCommits(): Promise<GitLabGetResponse> {
    const uri: string = this.uriBuilder.forSingleMRCommits();
    this.MRCommits = await this.getGitlabResponseObject(
      uri,
      this.MRCommits,
      this.reuseResponseIfExists,
    );
    return this.MRCommits;
  }

  public async getSingleMR(): Promise<GitLabGetResponse> {
    const uri: string = this.uriBuilder.forSingleMR();
    this.singleMR = await this.getGitlabResponseObject(
      uri,
      this.singleMR,
      this.doNotReuseResponse,
    );
    return this.singleMR;
  }

  // REPOSITORY FILES

  public async getConfigurationFile(): Promise<GitLabGetResponse> {
    const uri: string = this.uriBuilder.forSingleProjectRepoRawConfigFile();

    this.rawConfigFile = await this.getGitlabResponseObject(
      uri,
      this.rawConfigFile,
      this.doNotReuseResponse,
    );
    return this.rawConfigFile;
  }

  // FETCH RESPONSE WRAPPERS

  // Fetch treats 4XX or 5XX errors like regular responses.
  // Fetch differentiates these from a 'network error' which will
  // throw an error in the try/catch block.

  private async getGitlabResponseObject(
    uri: string,
    previousResponse: GitLabGetResponse,
    useCache: boolean,
  ): Promise<GitLabGetResponse> {
    let newResponse: GitLabGetResponse;

    if (previousResponse === undefined || useCache === false) {
      try {
        const result: any = await this.get(uri);
        newResponse = GitLabGetResponse.from(result.status, result.body);
      } catch (err) {
        this.logger.error(`${err}`);

        newResponse = GitLabGetResponse.from(HttpStatus.BAD_GATEWAY, {});
      }
    } else {
      newResponse = previousResponse;
    }
    return newResponse;
  }

  private async postGitlabResponseObject(
    uri: string,
    qs: any,
  ): Promise<GitLabPostResponse> {
    let gitlabResponseObject: GitLabPostResponse;

    try {
      const result: any = await this.post(uri, qs);
      gitlabResponseObject = GitLabPostResponse.from(
        result.status,
        result.body,
      );
    } catch (err) {
      this.logger.error(`${err}`);

      gitlabResponseObject = GitLabPostResponse.from(HttpStatus.BAD_GATEWAY);
    }
    return gitlabResponseObject;
  }

  private async putGitlabResponseObject(
    uri: string,
    qs: any,
  ): Promise<GitLabPostResponse> {
    let gitlabResponseObject: GitLabPostResponse;

    try {
      const result: any = await this.put(uri, qs);
      gitlabResponseObject = GitLabPostResponse.from(
        result.status,
        result.body,
      );
    } catch (err) {
      this.logger.error(`${err}`);

      gitlabResponseObject = GitLabPostResponse.from(HttpStatus.BAD_GATEWAY);
    }
    return gitlabResponseObject;
  }

  /**
   * HELPER METHOD FOR TESTS ONLY
   * @remarks
   * If DELETE is successful, will return a 204 code as result.
   */
  private async deleteGitlabResponseObject(
    uri: string,
  ): Promise<GitLabGetResponse> {
    let gitlabResponseObject: GitLabGetResponse;
    try {
      const result: any = await this.delete(uri);

      gitlabResponseObject = GitLabGetResponse.from(result, {});
    } catch (err) {
      this.logger.error(`${err}`);

      gitlabResponseObject = GitLabGetResponse.from(HttpStatus.BAD_GATEWAY, {});
    }
    return gitlabResponseObject;
  }

  private get(
    uri: string,
  ): Promise<winston.Logger | { body: any; status: number }> {
    const options = this.getFetchOptions();
    return this.handleFetch(uri, options);
  }

  private post(
    uri: string,
    qs: any,
  ): Promise<winston.Logger | { body: any; status: number }> {
    const options = this.postFetchOptions(qs);
    return this.handleFetch(uri, options);
  }

  private put(
    uri: string,
    qs: any,
  ): Promise<winston.Logger | { body: any; status: number }> {
    const options = this.putFetchOptions(qs);
    return this.handleFetch(uri, options);
  }

  /** HELPER METHOD FOR TESTS ONLY */
  private delete(uri: string): Promise<number | winston.Logger> {
    const options = this.deleteFetchOptions();
    return this.handleDeleteFetch(uri, options);
  }

  private getFetchOptions(): {
    headers: { "Private-Token": string };
    method: string;
  } {
    return {
      headers: {
        "Private-Token": this.token,
      },
      method: "GET",
    };
  }

  private postFetchOptions(
    qs: any,
  ): {
    body: string;
    headers: { "Content-Type": string; "Private-Token": string };
    method: string;
  } {
    return {
      body: JSON.stringify(qs),
      headers: {
        "Content-Type": "application/json",
        "Private-Token": this.token,
      },
      method: "POST",
    };
  }

  private putFetchOptions(
    qs: any,
  ): {
    body: string;
    headers: { "Content-Type": string; "Private-Token": string };
    method: string;
  } {
    return {
      body: JSON.stringify(qs),
      headers: {
        "Content-Type": "application/json",
        "Private-Token": this.token,
      },
      method: "PUT",
    };
  }

  /** HELPER METHOD FOR TESTS ONLY */
  private deleteFetchOptions(): {
    headers: { "Private-Token": string };
    method: string;
  } {
    return {
      headers: {
        "Private-Token": this.token,
      },
      method: "DELETE",
    };
  }

  private handleFetch(
    uri: string,
    options: any,
  ): Promise<winston.Logger | { body: any; status: number }> {
    return fetch(uri, options)
      .then((res) => res.json().then((body) => ({ body, status: res.status })))
      .catch((error) => this.logger.error(`Error: ${error}`));
  }

  /**
   * HELPER METHOD FOR TESTS ONLY
   * @remarks
   * GitLab API doesn't send back a response body on delete, it just sends
   * back a 204 status.
   */
  private handleDeleteFetch(
    uri: string,
    options: any,
  ): Promise<number | winston.Logger> {
    return fetch(uri, options)
      .then((res) => res.status)
      .catch((error) => this.logger.error(`Error: ${error}`));
  }
}
