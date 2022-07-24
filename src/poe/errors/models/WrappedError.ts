/**
 * @hidden
 */
export interface WrappedError {
  code: number;
  message: string;
}

/**
 * @hidden
 */
export function isWrappedError(obj: unknown): obj is WrappedError {
  return (
    typeof obj === "object" &&
    obj != null &&
    "message" in obj &&
    typeof (obj as WrappedError).message == "string" &&
    "code" in obj &&
    typeof (obj as WrappedError).code == "number"
  );
}
