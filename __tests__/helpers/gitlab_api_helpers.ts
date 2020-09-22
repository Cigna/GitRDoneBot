import * as request from "supertest";

const API_TOKEN = process.env.GITLAB_BOT_ACCOUNT_API_TOKEN;
const GROUP_NAME = process.env.GITLAB_TESTING_GROUP_NAME;
const BASE_URI = process.env.GITLAB_BASE_URI;
const TEST_PROJECT_TARBALL_PATH =
  "__tests__/live_gitlab_api_tests/grdbot-test_export.tar.gz";
const PROJECT_NAME = process.env.GITLAB_TEST_PROJECT_NAME;

export async function cleanUpEmojis(api) {
  await api.getAllEmojis().then(async (response) => {
    await Promise.all(
      response.result.map(async (emoji) => {
        await api.deleteEmoji(emoji.id);
      }),
    );
  });
  return "All emojis have been deleted.";
}

export async function cleanUpMRNotes(api) {
  await api.getAllMRNotes(1).then(async (response) => {
    await Promise.all(
      response.result.map(async (note) => {
        // note.system property indicates whether a comment is user- or system-generated
        // we only want to try to delete user-generated notes
        if (note.system === false) {
          await api.deleteMRNote(note.id);
        }
      }),
    );
  });
  return "All notes have been deleted.";
}

export async function importTestProjectToGitlab(): Promise<number> {
  let project_valid_config = await request(BASE_URI)
    .post(`/projects/import?namespace=${GROUP_NAME}&path=${PROJECT_NAME}`)
    .set("Content-Type", "Content-Type: multipart/form-data")
    .set("Private-Token", `${API_TOKEN}`)
    .attach("file", TEST_PROJECT_TARBALL_PATH);

  // wait until the test project is finished importing
  let import_status: string = "scheduled";
  while (import_status === "scheduled" || import_status === "started") {
    let import_status_response = await request(BASE_URI)
      .get(`/projects/${project_valid_config.body.id}/import`)
      .set("Private-Token", `${API_TOKEN}`);
    import_status = import_status_response.body.import_status;
  }

  return project_valid_config.body.id;
}
