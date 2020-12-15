import * as HttpStatus from "http-status-codes";
import {
  GitLabApi,
  NotFoundORNetworkFailureResponse,
  SuccessfulGetResponse,
  SuccessfulPostORPutResponse,
} from "../../src/gitlab";
import {
  mockNote,
  createNNotes,
  unauthorized_401,
  fetch_network_error,
} from "../helpers";
import { getBotUsername } from "../../src/util";
import { BotComment } from "../../src/merge_request";

// TEST FIXTURES
const sampleMessage = "Hello from your friendly neighborhood GitRDoneBot!";
const GRDB_NOTE_NUMBER = 42;
const botName = getBotUsername(process.env.GITLAB_BOT_ACCOUNT_NAME);

const emptyNote = new SuccessfulGetResponse(HttpStatus.OK, []);

const lessThanOneHundredNotesWithGRDB = new SuccessfulGetResponse(
  HttpStatus.OK,
  [
    mockNote(0, "river_tam"),
    mockNote(GRDB_NOTE_NUMBER, botName),
    mockNote(2, "hoban_washburne"),
  ],
);

const lessThanOneHundredNotesNoGRDB = new SuccessfulGetResponse(HttpStatus.OK, [
  mockNote(0, "river_tam"),
  mockNote(1, "malcolm_reynolds"),
  mockNote(2, "zoe_washburne"),
]);

const oneHundredNotesNoGRDB = new SuccessfulGetResponse(
  HttpStatus.OK,
  createNNotes(100, "shepherd_book"),
);

const singleGRDBNoteGet = new SuccessfulGetResponse(HttpStatus.OK, [
  mockNote(GRDB_NOTE_NUMBER, botName),
]);

const singleGRDBNotePost = new SuccessfulPostORPutResponse(
  HttpStatus.CREATED,
  GRDB_NOTE_NUMBER,
);

const singleGRDBNotePut = new SuccessfulPostORPutResponse(
  HttpStatus.OK,
  GRDB_NOTE_NUMBER,
);

// TESTS
jest.mock("../../src/gitlab/gitlab_api");

describe("Mock API Test: Comment Class", () => {
  const api = new GitLabApi("fake-token", 0, 1, "fake-uri");

  beforeEach((done) => {
    jest.clearAllMocks();
    done();
  });

  describe("BotComment.post(api, state, updateToggle, comment) function", () => {
    describe("In OPEN state", (state = "open", updateToggle = true) => {
      test("NEW note is successfully POSTED and correct api endpoints are called", async () => {
        // @ts-ignore
        api.newMRNote.mockResolvedValueOnce(singleGRDBNotePost);

        const commentResponse = await BotComment.post(
          api,
          state,
          updateToggle,
          sampleMessage,
        );

        expect(commentResponse).toBeInstanceOf(SuccessfulPostORPutResponse);
        expect(api.newMRNote).toHaveBeenCalledTimes(1);
        expect(api.getAllMRNotes).toHaveBeenCalledTimes(0);
        expect(api.editMRNote).toHaveBeenCalledTimes(0);
      });
    });

    describe("In UPDATE state", (state = "update") => {
      describe("When updateToggle === true", (updateToggle = true) => {
        test("NEW note is POSTED when no previous note exists", async () => {
          // @ts-ignore
          api.newMRNote.mockResolvedValueOnce(singleGRDBNotePost);
          // @ts-ignore
          api.getAllMRNotes.mockResolvedValueOnce(emptyNote);
          const commentResponse = await BotComment.post(
            api,
            state,
            updateToggle,
            sampleMessage,
          );

          expect(commentResponse).toBeInstanceOf(SuccessfulPostORPutResponse);
          expect(api.newMRNote).toHaveBeenCalledTimes(1);
          expect(api.getAllMRNotes).toHaveBeenCalledTimes(1);
          expect(api.editMRNote).toHaveBeenCalledTimes(0);
        });

        test("EXISTING note is UPDATED when previous note exists", async () => {
          // @ts-ignore
          api.editMRNote.mockResolvedValueOnce(singleGRDBNotePut);
          // @ts-ignore
          api.getAllMRNotes.mockResolvedValueOnce(
            lessThanOneHundredNotesWithGRDB,
          );
          const commentResponse = await BotComment.post(
            api,
            state,
            updateToggle,
            sampleMessage,
          );
          expect(commentResponse).toBeInstanceOf(SuccessfulPostORPutResponse);
          expect(api.newMRNote).toHaveBeenCalledTimes(0);
          expect(api.getAllMRNotes).toHaveBeenCalledTimes(1);
          expect(api.editMRNote).toHaveBeenCalledTimes(1);
        });
      });

      // NOTE: This function should never be invoked when state === update && updateToggle === false
      describe("When updateToggle === false", (updateToggle = false) => {
        test("Unknown State will be encountered and NotFoundORNetworkFailureResponse will be returned", async () => {
          const commentResponse = await BotComment.post(
            api,
            state,
            updateToggle,
            sampleMessage,
          );

          expect(commentResponse).toBeInstanceOf(
            NotFoundORNetworkFailureResponse,
          );
          expect(api.newMRNote).toHaveBeenCalledTimes(0);
          expect(api.getAllMRNotes).toHaveBeenCalledTimes(0);
          expect(api.editMRNote).toHaveBeenCalledTimes(0);
        });
      });
    });

    describe("In MERGE state", (state = "merge") => {
      describe("When updateToggle === true", (updateToggle = true) => {
        test("NEW note is posted when no previous note exists", async () => {
          // @ts-ignore
          api.newMRNote.mockResolvedValueOnce(singleGRDBNotePost);
          // @ts-ignore
          api.getAllMRNotes.mockResolvedValueOnce(emptyNote);
          const commentResponse = await BotComment.post(
            api,
            state,
            updateToggle,
            sampleMessage,
          );
          expect(commentResponse).toBeInstanceOf(SuccessfulPostORPutResponse);
          expect(api.newMRNote).toHaveBeenCalledTimes(1);
          expect(api.getAllMRNotes).toHaveBeenCalledTimes(1);
          expect(api.editMRNote).toHaveBeenCalledTimes(0);
        });

        test("EXISTING note is UPDATED when previous note exists", async () => {
          // @ts-ignore
          api.editMRNote.mockResolvedValueOnce(singleGRDBNotePut);
          // @ts-ignore
          api.getAllMRNotes.mockResolvedValueOnce(
            lessThanOneHundredNotesWithGRDB,
          );
          const commentResponse = await BotComment.post(
            api,
            state,
            updateToggle,
            sampleMessage,
          );
          expect(commentResponse).toBeInstanceOf(SuccessfulPostORPutResponse);
          expect(api.newMRNote).toHaveBeenCalledTimes(0);
          expect(api.getAllMRNotes).toHaveBeenCalledTimes(1);
          expect(api.editMRNote).toHaveBeenCalledTimes(1);
        });
      });

      describe("When updateToggle === false", (updateToggle = false) => {
        test("NEW note is POSTED when content exists", async () => {
          // @ts-ignore
          api.newMRNote.mockResolvedValueOnce(singleGRDBNotePost);
          const postResponse = await BotComment.post(
            api,
            state,
            updateToggle,
            sampleMessage,
          );
          expect(postResponse).toBeInstanceOf(SuccessfulPostORPutResponse);
          expect(api.newMRNote).toHaveBeenCalledTimes(1);
          expect(api.getAllMRNotes).toHaveBeenCalledTimes(0);
          expect(api.editMRNote).toHaveBeenCalledTimes(0);
        });
      });
    });
  });

  describe("BotComment.getMRNoteId(api) function", () => {
    test("correct value returned when there is a single note", async () => {
      // @ts-ignore
      api.getAllMRNotes.mockResolvedValueOnce(singleGRDBNoteGet);
      const noteIdResponse = await BotComment.getMRNoteId(api);
      expect(noteIdResponse).toBe(GRDB_NOTE_NUMBER);
      expect(api.getAllMRNotes).toHaveBeenCalledTimes(1);
    });

    test("correct value returned when there are x notes, where 1 < x < 100", async () => {
      // @ts-ignore
      api.getAllMRNotes.mockResolvedValueOnce(lessThanOneHundredNotesWithGRDB);
      const noteIdResponse = await BotComment.getMRNoteId(api);
      expect(noteIdResponse).toBe(GRDB_NOTE_NUMBER);
      expect(api.getAllMRNotes).toHaveBeenCalledTimes(1);
    });

    test("correct value returned when there are more than 100 notes and GRDBot authored one", async () => {
      // @ts-ignore
      api.getAllMRNotes.mockResolvedValueOnce(oneHundredNotesNoGRDB);
      // @ts-ignore
      api.getAllMRNotes.mockResolvedValueOnce(lessThanOneHundredNotesWithGRDB);
      const noteIdResponse = await BotComment.getMRNoteId(api);
      expect(noteIdResponse).toBe(GRDB_NOTE_NUMBER);
      expect(api.getAllMRNotes).toHaveBeenCalledTimes(2);
    });

    test("correct value returned when there are more than 100 notes and GRDBot did not author any", async () => {
      // @ts-ignore
      api.getAllMRNotes.mockResolvedValueOnce(oneHundredNotesNoGRDB);
      // @ts-ignore
      api.getAllMRNotes.mockResolvedValueOnce(lessThanOneHundredNotesNoGRDB);
      const noteIdResponse = await BotComment.getMRNoteId(api);
      expect(noteIdResponse).toBe(-1);
      expect(api.getAllMRNotes).toHaveBeenCalledTimes(2);
    });

    test("correct value returned when there are no notes", async () => {
      // @ts-ignore
      api.getAllMRNotes.mockResolvedValueOnce(emptyNote);
      const noteIdResponse = await BotComment.getMRNoteId(api);
      expect(noteIdResponse).toBe(-1);
      expect(api.getAllMRNotes).toHaveBeenCalledTimes(1);
    });

    test("returns -1 when API request fails due to being unauthorized", async () => {
      // @ts-ignore
      api.getAllMRNotes.mockResolvedValueOnce(unauthorized_401);
      const noteIdResponse = await BotComment.getMRNoteId(api);
      expect(noteIdResponse).toBe(-1);
      expect(api.getAllMRNotes).toHaveBeenCalledTimes(1);
    });

    test("returns -1 when API request fails due to network error", async () => {
      // @ts-ignore
      api.getAllMRNotes.mockResolvedValueOnce(fetch_network_error);
      const noteIdResponse = await BotComment.getMRNoteId(api);
      expect(noteIdResponse).toBe(-1);
      expect(api.getAllMRNotes).toHaveBeenCalledTimes(1);
    });
  });
});
