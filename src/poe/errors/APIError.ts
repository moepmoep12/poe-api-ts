export class APIError extends Error {
  constructor(
    message: string,
    public code: number,
    public status: number | string | undefined,
    public errorDescription?: string
  ) {
    super(message);
  }
}
