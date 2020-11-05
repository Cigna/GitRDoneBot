import * as winston from "winston";
import fetch from "node-fetch";
import * as HttpStatus from "http-status-codes";
import {
  SuccessfulGetResponse,
  FailedResponse,
  BuildGetResponse,
  SuccessfulPostORPutResponse,
  BuildPostORPutResponse,
} from ".";

interface RawFetchResponse {
  body: [] | {} | undefined | string;
  status: number;
}

export class FetchWrapper {
  private readonly commonHeaders: {};
  private readonly deleteOptions: {};
  private readonly getOptions: {};

  constructor(readonly token: string, readonly logger: winston.Logger) {
    this.commonHeaders = {
      "Content-Type": "application/json",
      "Private-Token": this.token,
    };
    this.deleteOptions = {
      headers: this.commonHeaders,
      method: "DELETE",
    };
    this.getOptions = {
      headers: this.commonHeaders,
      method: "GET",
    };
  }

  // Fetch treats 4XX or 5XX errors like regular responses.
  // Fetch differentiates these from a 'network error' which will
  // throw an error in the try/catch block.
  public async makeGetRequest(
    uri: string,
  ): Promise<SuccessfulGetResponse | FailedResponse> {
    let newResponse: SuccessfulGetResponse | FailedResponse;
    try {
      const result: RawFetchResponse = await this.handleFetch(
        uri,
        this.getOptions,
      );
      newResponse = BuildGetResponse(result.status, result.body);
    } catch (err) {
      this.logger.error(`${err}`);
      newResponse = BuildGetResponse(HttpStatus.BAD_GATEWAY, {});
    }
    return newResponse;
  }

  public async makePutRequest(
    uri: string,
    qs: any,
  ): Promise<SuccessfulPostORPutResponse | FailedResponse> {
    let response: SuccessfulPostORPutResponse | FailedResponse;
    const putOptions = {
      body: JSON.stringify(qs),
      headers: this.commonHeaders,
      method: "PUT",
    };

    try {
      const result: any = await this.handleFetch(uri, putOptions);
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
    const postOptions = {
      body: JSON.stringify(qs),
      headers: this.commonHeaders,
      method: "POST",
    };

    try {
      const result: any = await this.handleFetch(uri, postOptions);
      response = BuildPostORPutResponse(result.status, result.body);
    } catch (err) {
      this.logger.error(`${err}`);
      response = BuildPostORPutResponse(HttpStatus.BAD_GATEWAY);
    }
    return response;
  }

  private handleFetch(uri: string, options: any): Promise<RawFetchResponse> {
    return fetch(uri, options)
      .then((res) => res.json().then((body) => ({ body, status: res.status })))
      .catch((error) => {
        this.logger.error(`Error: ${error}`);
        return { body: {}, status: 500 };
      });
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
      const statusCode: number = await this.handleDeleteFetch(
        uri,
        this.deleteOptions,
      );
      response = BuildGetResponse(statusCode, {});
    } catch (err) {
      this.logger.error(`${err}`);
      response = BuildGetResponse(HttpStatus.BAD_GATEWAY, {});
    }
    return response;
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
}
