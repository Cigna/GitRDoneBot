/**
 * This class is used to construct GitLab API endpoints using unique incoming event values.
 * Each instance of this class will belong to a unique instance.
 */
export class URI {
  readonly projectId: string;
  readonly mergeReqId: string;

  /**
   * Constructor transforms number params to string type and returns an instance of URI
   * that will construct API endpoints using unique values of incoming webhook events.
   *
   * @param baseUri base URI string for GitLab API retrieved from environment variable
   * @param projectIdAsNumber project ID number extracted from incoming GitLab webhook event
   * @param mergeReqIdAsNumber merge request ID number extracted from incoming GitLab webhook event
   *
   * @returns instance of the URI class containing project & Merge Request IDs unique to the incoming GitLab event
   */
  constructor(
    readonly baseUri: string,
    readonly projectIdAsNumber: number,
    readonly mergeReqIdAsNumber: number,
  ) {
    this.projectId = projectIdAsNumber.toString();
    this.mergeReqId = mergeReqIdAsNumber.toString();
  }

  /** EMOJIS */

  /**
   * @returns api endpoint string used to POST new Emoji or GET all Emojis on a MR
   * @remarks
   * 1. POST: https://docs.gitlab.com/ee/api/award_emoji.html#award-a-new-emoji
   * 1. GET: https://docs.gitlab.com/ee/api/award_emoji.html#list-an-awardables-award-emoji
   */
  forEmojis(): string {
    return `${this.baseUri}/projects/${this.projectId}/merge_requests/${this.mergeReqId}/award_emoji`;
  }

  /**
   * @param awardId id of Emoji to be deleted
   * @returns api endpoint string used to DELETE Emoji on a MR
   * @remarks
   * DELETE: https://docs.gitlab.com/ee/api/award_emoji.html#delete-an-award-emoji
   * */
  forSingleEmoji(awardId: number): string {
    return `${this.baseUri}/projects/${this.projectId}/merge_requests/${
      this.mergeReqId
    }/award_emoji/${awardId.toString()}`;
  }

  /** NOTES */

  /**
   * @returns api endpoint string used to POST new Note on a MR
   * @remarks
   * 1. POST: https://docs.gitlab.com/ee/api/notes.html#create-new-merge-request-note
   * 1. CAUTION: Only use this for POST, as default GET behavior only retrieves the
   * first 20 Notes. If you need to GET all Notes, use parameterized forNotesFilterByPage method
   */
  forNotes(): string {
    return `${this.baseUri}/projects/${this.projectId}/merge_requests/${this.mergeReqId}/notes`;
  }

  /**
   * @param page number of page to return paginated results from
   * @returns api endpoint string to return a page of 100 Notes in ascending order, oldest to newest.
   * @remarks
   * GET: https://docs.gitlab.com/ee/api/notes.html#list-all-merge-request-notes
   * */
  forNotesFilterByPage(page: number): string {
    return `${this.baseUri}/projects/${this.projectId}/merge_requests/${
      this.mergeReqId
    }/notes?page=${page.toString()}&per_page=100&sort=asc`;
  }

  /**
   * @param noteId id of Note to update or delete
   * @returns api endpoint string to UPDATE or DELETE an existing Note on a MR
   * 0. PUT: https://docs.gitlab.com/ee/api/notes.html#modify-existing-merge-request-note
   * 1. DELETE: https://docs.gitlab.com/ee/api/notes.html#delete-a-merge-request-note
   * */
  forSingleNote(noteId: number): string {
    return `${this.baseUri}/projects/${this.projectId}/merge_requests/${
      this.mergeReqId
    }/notes/${noteId.toString()}`;
  }

  /** GENERAL MERGE REQUEST */

  /**
   * 0. GET: https://docs.gitlab.com/ee/api/merge_requests.html#list-merge-requests
   * */
  forMRsFilterByAssigneeId(assigneeId: number, threshold: number): string {
    return `${
      this.baseUri
    }/merge_requests?state=opened&scope=all&page=0&per_page=${threshold.toString()}&assignee_id=${assigneeId.toString()}`;
  }

  /**
   * 0. GET: https://docs.gitlab.com/ee/api/merge_request_approvals.html#get-configuration-1
   * */
  forMRApprovals(): string {
    return `${this.baseUri}/projects/${this.projectId}/merge_requests/${this.mergeReqId}/approvals`;
  }

  /**
   * 0. GET: https://docs.gitlab.com/ee/api/merge_requests.html#get-single-mr-changes
   * */
  forMRChanges(): string {
    return `${this.baseUri}/projects/${this.projectId}/merge_requests/${this.mergeReqId}/changes`;
  }

  /**
   * 0. GET: https://docs.gitlab.com/ee/api/merge_requests.html#get-single-mr
   * */
  forSingleMR(): string {
    return `${this.baseUri}/projects/${this.projectId}/merge_requests/${this.mergeReqId}`;
  }

  /**
   * 0. GET: https://docs.gitlab.com/ee/api/merge_requests.html#get-single-mr-commits
   * @remarks
   * If GRDBot user is not a member of target project, this call will return:
   * { "message": "404 Project Not Found" }.
   * If GRDBot user is a member of project, but doesn't have Reporter+ permission, this call returns:
   * { "message": "403 Forbidden" }.
   */
  forSingleMRCommits(): string {
    return `${this.baseUri}/projects/${this.projectId}/merge_requests/${this.mergeReqId}/commits`;
  }

  // REPOSITORY FILES

  /**
   * 0. GET: https://docs.gitlab.com/ee/api/repository_files.html#get-raw-file-from-repository
   * */
  forSingleProjectRepoRawConfigFile(): string {
    return `${this.baseUri}/projects/${this.projectId}/repository/files/.grdb.json/raw?ref=master`;
  }
}
