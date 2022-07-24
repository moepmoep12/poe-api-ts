import { ValidatorOptions } from "class-validator";

/**
 * The options are set such that errors are thrown
 * when an object has additional properties
 */
export const validatorOptions: ValidatorOptions = {
  whitelist: true,
  forbidNonWhitelisted: true,
  forbidUnknownValues: true,
};
