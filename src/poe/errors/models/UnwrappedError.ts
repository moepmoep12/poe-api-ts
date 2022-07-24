import { ErrorMessage } from "./OAuthAPIError";

/**
 * @hidden
 */
export type UnwrappedError = ErrorMessage;

/**
 * @hidden
 */
export function isUnwrappedError(obj: unknown): obj is UnwrappedError {
  return typeof obj === "string" && Object.values(ErrorMessage).includes(obj as ErrorMessage);
}
