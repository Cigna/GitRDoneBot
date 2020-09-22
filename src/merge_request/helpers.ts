/**
 * Helper functions to get data from a GitLab event.
 * */

import { MergeRequestEvent } from "../interfaces";

export const getMrId = (event: any): number => {
  return event.object_attributes.iid;
};

export const getProjectId = (event: any): number => {
  return event.project.id;
};

export const getObjectKind = (event: any): string => {
  return event.object_kind;
};
export const getState = (event: any): string => {
  return event.object_attributes.action;
};

export const getMergeRequestEventData = (event: any): MergeRequestEvent => {
  return {
    assigneeId: event.object_attributes.assignee_id,
    authorEmail: event.object_attributes.last_commit.author.email,
    authorGitId: event.object_attributes.author_id,
    authorName: event.user.name,
    authorUsername: event.user.username,
    eventState: event.object_attributes.action,
    mrCreatedDate: event.object_attributes.created_at,
    mrId: event.object_attributes.iid,
    projectId: event.project.id,
    projectName: event.project.name,
    projectNamespace: event.project.namespace,
    projectUrl: event.object_attributes.source.web_url,
  };
};
