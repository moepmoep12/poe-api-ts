/* eslint-disable @typescript-eslint/no-misused-promises */
import "reflect-metadata";
import { describe, it } from "mocha";
import { expect } from "chai";
import { step } from "mocha-steps";
import { validateOrReject, ValidationError } from "class-validator";

import { ValidationErrorExt } from "../../ValidationError";
import { validatorOptions } from "../../ValidatorOptions";

import { AccountScopes, Accounts } from "../../../src/poe/apis/oauth";

import { Account } from "../../../src/poe/shared/accounts";

import { APIError } from "../../../src/poe/errors";
import { ErrorMessage } from "../../../src/poe/errors/models/OAuthAPIError";

const scopes = <string>process.env.SCOPES;

describe("Path of Exile - OAuthAPI - Accounts", function () {
  this.timeout(10000);

  let account: Account;

  if (!scopes?.includes(AccountScopes.Profile)) {
    it("#getProfile() - should reject insufficient scope", async () => {
      await expect(Accounts.getProfile()).to.be.rejectedWith(
        APIError,
        ErrorMessage.InsufficientScope
      );
    });
    return;
  }

  it("#getProfile() - should return profile", async () => {
    account = <Account>await expect(Accounts.getProfile()).to.be.fulfilled;
  });

  step("validateOrReject(result) - should be fulfilled", async () => {
    try {
      await validateOrReject(account, validatorOptions);
    } catch (error: unknown) {
      if (Array.isArray(error) && error[0] instanceof ValidationError)
        throw new ValidationErrorExt(error as ValidationError[]);
      else throw error;
    }
  });
});
