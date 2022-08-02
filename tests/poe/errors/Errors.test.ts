/* eslint-disable @typescript-eslint/no-misused-promises */
import "reflect-metadata";
import { describe, it } from "mocha";
import { expect } from "chai";

import {
  ExternalAPIError,
  isExternalAPIError,
} from "../../../src/poe/errors/models/ExternalAPIError";

import {
  OAuthAPIError,
  isOAuthAPIError,
  ErrorMessage,
} from "../../../src/poe/errors/models/OAuthAPIError";

import { UnwrappedError, isUnwrappedError } from "../../../src/poe/errors/models/UnwrappedError";

import { WrappedError, isWrappedError } from "../../../src/poe/errors/models/WrappedError";
describe(`Path of Exile - Errors`, function () {
  describe(`ExternalAPIError`, () => {
    it(`#isExternalAPIError - should return true`, () => {
      const error: ExternalAPIError = {
        error: {
          code: 1,
          message: "msg",
        },
      };
      expect(isExternalAPIError(error)).to.be.true;
    });

    it(`#isExternalAPIError - should return false`, () => {
      const error = {
        error: {
          code: 1,
        },
      };
      expect(isExternalAPIError(error)).to.be.false;
    });
  });

  describe(`OAuthAPIError`, () => {
    it(`#isOAuthAPIError - should return true`, () => {
      const error: OAuthAPIError = {
        error: ErrorMessage.InsufficientScope,
        error_description: "desc",
      };
      expect(isOAuthAPIError(error)).to.be.true;
    });

    it(`#isOAuthAPIError - should return false`, () => {
      const error = {
        error: {
          code: 1,
        },
      };
      expect(isOAuthAPIError(error)).to.be.false;
    });
  });

  describe(`UnwrappedError`, () => {
    it(`#isUnwrappedError - should return true`, () => {
      const error: UnwrappedError = ErrorMessage.InsufficientScope;
      expect(isUnwrappedError(error)).to.be.true;
    });

    it(`#isUnwrappedError - should return false`, () => {
      const error = {
        error: {
          code: 1,
        },
      };
      expect(isUnwrappedError(error)).to.be.false;
    });
  });

  describe(`WrappedError`, () => {
    it(`#isWrappedError - should return true`, () => {
      const error: WrappedError = {
        code: 1,
        message: "msg",
      };
      expect(isWrappedError(error)).to.be.true;
    });

    it(`#isWrappedError - should return false`, () => {
      const error = {
        error: {
          code: 1,
        },
      };
      expect(isWrappedError(error)).to.be.false;
    });
  });
});
