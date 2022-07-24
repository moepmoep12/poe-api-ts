/**
 * @hidden
 */
export interface ExternalAPIError {
  error: {
    code: number;
    message: string;
  };
}

/**
 * @hidden
 */
export function isExternalAPIError(obj: unknown): obj is ExternalAPIError {
  return (
    typeof obj === "object" &&
    obj != null &&
    "error" in obj &&
    typeof (obj as ExternalAPIError).error == "object" &&
    "code" in (obj as ExternalAPIError).error &&
    "message" in (obj as ExternalAPIError).error
  );
}
