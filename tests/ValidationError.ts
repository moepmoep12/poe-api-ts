import { ValidationError } from "class-validator";
import { validationErrorsAsString } from "class-validator-flat-formatter";

/**
 * Wraps multiple ValidationError such that all errors are reported on testing
 */
export class ValidationErrorExt extends ValidationError implements Error {
  public message: string;

  constructor(public errors: ValidationError[]) {
    super();

    this.message = this.getMessage();
  }

  get name(): string {
    return "ValidationError";
  }

  getMessage(): string {
    const validErrors = validationErrorsAsString(this.errors);
    if (validErrors) return `ValidationError: ${validErrors}`;
    else {
      let msg = "ValidationError: ";
      for (const err of this.errors) {
        msg += err.toString();
      }
      return msg;
    }
  }
}
