/**
 * Environment variables should be retrieved with one of these helper functions so an appropriate error is thrown if the variable is missing from the environment.
 * */

export const getToken = (token?: string): string => {
  if (token) {
    return token;
  } else {
    throw new Error("GITLAB_BOT_ACCOUNT_API_TOKEN missing from environment");
  }
};

export const getBaseURI = (baseURI?: string): string => {
  if (baseURI) {
    return baseURI;
  } else {
    throw new Error("GITLAB_BASE_URI missing from environment");
  }
};

export const getBotUsername = (botName?: string): string => {
  if (botName) {
    return botName;
  } else {
    throw new Error("GITLAB_BOT_ACCOUNT_NAME missing from environment");
  }
};
