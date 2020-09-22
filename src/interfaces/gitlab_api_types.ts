/** Object interface returned by GitLab API */
export interface Note {
  id: number;
  body: string;
  attachment: string;
  author: User;
  created_at: string;
  updated_at: string;
  system: boolean;
  noteable_id: number;
  noteable_type: string;
  resolvable: boolean;
  noteable_iid: number;
}

/** Object interface returned by GitLab API */
export interface GitLabCommit {
  title: string;
  created_at: string;
}

/** Object interface returned by GitLab API */
export interface User {
  id: number;
  name: string;
  username: string;
  state: string;
  avatar_url: string;
  web_url: string;
}

/** Object interface returned by GitLab API */
export interface ApprovalsResponse {
  id: number;
  approved_by: Array<{ user: User }>;
}

/** Object interface returned by GitLab API */
export interface Change {
  old_path: string;
  new_path: string;
  a_mode: string;
  b_mode: string;
  new_file: boolean;
  renamed_file: boolean;
  deleted_file: boolean;
  diff: string;
}

/** Object interface returned by GitLab API */
export interface MergeRequest {
  merged_by: User;
  author: User;
  assignee: User;
}
