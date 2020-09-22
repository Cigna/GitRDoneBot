export interface MergeRequestEvent {
  // event.object_attributes.assignee_id
  assigneeId: number;

  // event.object_attributes.last_commit.author.email
  // this is actually the email of the last person to commit on the MR
  authorEmail: string;

  // event.object_attributes.author_id
  authorGitId: number;

  // event.user.name
  authorName: string;

  // event.user.username
  // the default is LAN ID, but users may change
  authorUsername: string;

  // event.object_attributes.action
  eventState: string;

  // event.object_attributes.created_at
  mrCreatedDate: string;

  // event.object_attributes.iid
  mrId: number;

  // event.project.id
  projectId: number;

  // event.project.name
  projectName: string;

  // event.project.namespace
  projectNamespace: string;

  // event.object_attributes.source.web_url
  projectUrl: string;
}
