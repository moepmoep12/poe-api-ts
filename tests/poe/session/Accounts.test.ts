/* eslint-disable @typescript-eslint/no-misused-promises */
import "reflect-metadata";
import { describe, it } from "mocha";
import { expect } from "chai";
import { step } from "mocha-steps";
import { validateOrReject, ValidationError } from "class-validator";

import { ValidationErrorExt } from "../../ValidationError";
import { validatorOptions } from "../../ValidatorOptions";
import { mochaGlobalSetup } from "../../mochaFixtures";

import { APIError, ErrorMessage } from "..//../../src/poe/errors";

import { Accounts } from "..//../../src/poe/apis/session";
import { AvatarCollection, MtxGroup } from "../../../src/poe/apis/session/accounts";
import { SessionProfile } from "../../../src/poe/apis/session/accounts/Profile";

if (process.env.MOCHA_WORKER_ID) mochaGlobalSetup();

describe("Path of Exile - SessionAPI - Accounts", function () {
  this.timeout(10000);

  if (!process.env.POESESSID) {
    it("#getProfile() - should reject Unauthorized", async () => {
      await expect(Accounts.getProfile()).to.be.rejectedWith(APIError, ErrorMessage.Unauthorized);
    });

    it("#getAvatars() - should reject Unauthorized", async () => {
      await expect(Accounts.getAvatars()).to.be.rejectedWith(APIError, ErrorMessage.Unauthorized);
    });

    it("#getMicrotransactions() - should reject Unauthorized", async () => {
      await expect(Accounts.getMicrotransactions()).to.be.rejectedWith(
        APIError,
        ErrorMessage.Unauthorized
      );
    });
    return;
  }

  describe(`getProfile()`, () => {
    this.timeout(3000);

    let profile: SessionProfile;

    it("#getProfile() - should return profile", async () => {
      profile = <SessionProfile>await expect(Accounts.getProfile()).to.be.fulfilled;
    });

    step("validateOrReject(result) - should be fulfilled", async () => {
      try {
        await validateOrReject(profile, validatorOptions);
      } catch (error: unknown) {
        if (Array.isArray(error) && error[0] instanceof ValidationError)
          throw new ValidationErrorExt(error as ValidationError[]);
        else throw error;
      }
    });
  });

  describe(`getAvatars`, () => {
    this.timeout(3000);

    let avatarCollection: AvatarCollection;

    it("#getAvatars() - should return avatars", async () => {
      avatarCollection = <AvatarCollection>await expect(Accounts.getAvatars()).to.be.fulfilled;
    });

    step("validateOrReject(result) - should be fulfilled", async () => {
      try {
        await validateOrReject(avatarCollection, validatorOptions);
      } catch (error: unknown) {
        if (Array.isArray(error) && error[0] instanceof ValidationError)
          throw new ValidationErrorExt(error as ValidationError[]);
        else throw error;
      }
    });
  });

  describe(`getMicrotransactions()`, () => {
    this.timeout(3000);

    let mtxGroups: MtxGroup[];

    it("#getMicrotransactions() - should return mtx", async () => {
      mtxGroups = <MtxGroup[]>await expect(Accounts.getMicrotransactions()).to.be.fulfilled;
    });

    step("validateOrReject(result) - should be fulfilled", async () => {
      for (const mtx of mtxGroups) {
        try {
          await validateOrReject(mtx, validatorOptions);
        } catch (error: unknown) {
          if (Array.isArray(error) && error[0] instanceof ValidationError)
            throw new ValidationErrorExt(error as ValidationError[]);
          else throw error;
        }
      }
    });
  });
});
