import "reflect-metadata";
import { describe, it } from "mocha";
import { plainToInstance } from "class-transformer";
import { validateOrReject, ValidationError } from "class-validator";

import { ValidationErrorExt } from "../../../ValidationError";
import { validatorOptions } from "../../../ValidatorOptions";

import { SessionProfile } from "../../../../src/poe/apis/session/accounts/Profile";
import { AvatarCollection, MtxGroup } from "../../../../src/poe/apis/session/accounts";

import profileJson from "./resources/profile.json";
import avatarsJson from "./resources/avatars.json";
import mtxJson from "./resources/mtx.json";

describe("Path of Exile - SessionAPI - JSON - Accounts", function () {
  let profile: SessionProfile;
  let avatarCollection: AvatarCollection;
  let mtxGroups: MtxGroup[];

  before(() => {
    profile = plainToInstance(SessionProfile, profileJson);
    avatarCollection = plainToInstance(AvatarCollection, avatarsJson);
    mtxGroups = plainToInstance(MtxGroup, mtxJson.groups);
  });

  it("validateOrReject(profile) - should be fulfilled", async () => {
    try {
      await validateOrReject(profile, validatorOptions);
    } catch (error: unknown) {
      throw new ValidationErrorExt(error as ValidationError[]);
    }
  });

  it("validateOrReject(avatarCollection) - should be fulfilled", async () => {
    try {
      await validateOrReject(avatarCollection, validatorOptions);
    } catch (error: unknown) {
      throw new ValidationErrorExt(error as ValidationError[]);
    }
  });

  it("validateOrReject(mtxGroups) - should be fulfilled", async () => {
    for (const mtxGroup of mtxGroups) {
      try {
        await validateOrReject(mtxGroup, validatorOptions);
      } catch (error: unknown) {
        throw new ValidationErrorExt(error as ValidationError[]);
      }
    }
  });
});
