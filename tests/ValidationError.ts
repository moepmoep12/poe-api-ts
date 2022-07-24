import { ValidationError } from "class-validator";
import { validationErrorsAsString } from "class-validator-flat-formatter";

export class ValidationErrorExt extends ValidationError implements Error {
  constructor(public errors: ValidationError[]) {
    super();
  }

  get name(): string {
    return "ValidationError";
  }

  get message(): string {
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
