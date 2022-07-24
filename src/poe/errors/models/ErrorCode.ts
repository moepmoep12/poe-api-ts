/**
 * Error codes as defined in https://www.pathofexile.com/developer/docs/index#errors
 */
export const enum ErrorCode {
  Unknown = -1,
  Accepted = 0,
  ResourceNotFound = 1,
  InvalidQuery = 2,
  RateLimitExceeded = 3,
  InternalError = 4,
  UnexpectedContentType = 5,
  Forbidden = 6,
  TemporarilyUnavailable = 7,
  Unauthorized = 8,
  MethodNotAllowed = 9,
  UnprocessableEntity = 10,
}
