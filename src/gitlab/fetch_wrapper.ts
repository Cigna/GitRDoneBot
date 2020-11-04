import * as winston from "winston";
import fetch from "node-fetch";
import * as HttpStatus from "http-status-codes";
import { SuccessfulGetResponse, FailedResponse, BuildGetResponse } from ".";
import {
  BuildPostORPutResponse,
  SuccessfulPostORPutResponse,
} from "./api_responses";

interface RawFetchResponse {
  body: [] | {} | undefined | string;
  status: number;
}

export class FetchWrapper {
  constructor(readonly token: string, readonly logger: winston.Logger) {}

  // Fetch treats 4XX or 5XX errors like regular responses.
  // Fetch differentiates these from a 'network error' which will
  // throw an error in the try/catch block.
  public async makeGetRequest(
    uri: string,
  ): Promise<SuccessfulGetResponse | FailedResponse> {
    let newResponse: SuccessfulGetResponse | FailedResponse;
    try {
      const result: any = await this.get(uri);
      newResponse = BuildGetResponse(result.status, result.body);
    } catch (err) {
      this.logger.error(`${err}`);
      newResponse = BuildGetResponse(HttpStatus.BAD_GATEWAY, {});
    }
    return newResponse;
  }

  /**
   * HELPER METHOD FOR TESTS ONLY
   * @remarks
   * If DELETE is successful, will return a 204 code as result.
   */
  public async makeDeleteRequest(
    uri: string,
  ): Promise<FailedResponse | SuccessfulGetResponse> {
    let response: FailedResponse | SuccessfulGetResponse;
    try {
      const statusCode: number = await this.delete(uri);
      response = BuildGetResponse(statusCode, {});
    } catch (err) {
      this.logger.error(`${err}`);
      response = BuildGetResponse(HttpStatus.BAD_GATEWAY, {});
    }
    return response;
  }

  public async makePutRequest(
    uri: string,
    qs: any,
  ): Promise<SuccessfulPostORPutResponse | FailedResponse> {
    let response: SuccessfulPostORPutResponse | FailedResponse;

    try {
      const result: any = await this.put(uri, qs);
      response = BuildPostORPutResponse(result.status, result.body);
    } catch (err) {
      this.logger.error(`${err}`);
      response = BuildPostORPutResponse(HttpStatus.BAD_GATEWAY);
    }
    return response;
  }

  public async makePostRequest(
    uri: string,
    qs: any,
  ): Promise<SuccessfulPostORPutResponse | FailedResponse> {
    let response: SuccessfulPostORPutResponse | FailedResponse;

    try {
      const result: any = await this.post(uri, qs);
      response = BuildPostORPutResponse(result.status, result.body);
    } catch (err) {
      this.logger.error(`${err}`);
      response = BuildPostORPutResponse(HttpStatus.BAD_GATEWAY);
    }
    return response;
  }

  private get(uri: string): Promise<RawFetchResponse> {
    const options = this.getFetchOptions();
    return this.handleFetch(uri, options);
  }

  private post(uri: string, qs: any): Promise<RawFetchResponse> {
    const options = this.postFetchOptions(qs);
    return this.handleFetch(uri, options);
  }

  private put(uri: string, qs: any): Promise<RawFetchResponse> {
    const options = this.putFetchOptions(qs);
    return this.handleFetch(uri, options);
  }
  /** HELPER METHOD FOR TESTS ONLY */
  private delete(uri: string): Promise<number> {
    const options = this.deleteFetchOptions();
    return this.handleDeleteFetch(uri, options);
  }

  private handleFetch(uri: string, options: any): Promise<RawFetchResponse> {
    return fetch(uri, options)
      .then((res) => res.json().then((body) => ({ body, status: res.status })))
      .catch((error) => {
        this.logger.error(`Error: ${error}`);
        return { body: {}, status: 500 };
      });
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

  /**
   * HELPER METHOD FOR TESTS ONLY
   * @remarks
   * GitLab API doesn't send back a response body on delete, it just sends
   * back a 204 status.
   */
  private handleDeleteFetch(uri: string, options: any): Promise<number> {
    return fetch(uri, options)
      .then((res) => res.status)
      .catch((error) => {
        this.logger.error(`Error: ${error}`);
        return 500;
      });
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
}
