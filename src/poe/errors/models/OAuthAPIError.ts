import { ErrorCode } from "./ErrorCode";

/**
 * Contrary to the documentation https://www.pathofexile.com/developer/docs/index#errors,
 * the error message might look like this when dealing with OAuth.
 * @hidden
 */
export interface OAuthAPIError {
  error: ErrorMessage;
  error_description: string;
}

/**
 * @hidden
 */
export function isOAuthAPIError(obj: unknown): obj is OAuthAPIError {
  return (
    typeof obj === "object" &&
    obj != null &&
    "error" in obj &&
    typeof (obj as OAuthAPIError).error == "string" &&
    "error_description" in obj &&
    typeof (obj as OAuthAPIError).error_description == "string"
  );
}

/**
 * @hidden
 */
export function getCode(message: ErrorMessage): ErrorCode {
  switch (message) {
    case ErrorMessage.InvalidToken:
      return ErrorCode.Unauthorized;
    case ErrorMessage.InsufficientScope:
      return ErrorCode.Unauthorized;
    default:
      return ErrorCode.Unknown;
  }
}

/**
 * @hidden
 */
export enum ErrorMessage {
  InvalidToken = "invalid_token",
  InsufficientScope = "insufficient_scope",
  InvalidRequest = "invalid_request",
}
