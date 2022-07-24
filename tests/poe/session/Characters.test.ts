/* eslint-disable @typescript-eslint/no-misused-promises */
import "reflect-metadata";
import { describe, it } from "mocha";
import { expect } from "chai";
import { step } from "mocha-steps";
import { validateOrReject, ValidationError } from "class-validator";

import { ValidationErrorExt } from "../../ValidationError";
import { validatorOptions } from "../../ValidatorOptions";

import { Characters } from "..//../../src/poe/apis/session";

import { APIError, ErrorMessage } from "..//../../src/poe/errors";
import { SessionCharacterBase } from "../../../src/poe/apis/session/characters/CharacterBase";
import { SessionCharacter } from "../../../src/poe/apis/session/characters/Character";

describe("Path of Exile - SessionAPI - Characters", function () {
  this.timeout(20000);

  let charList: SessionCharacterBase[];

  if (!process.env.POESESSID) {
    it("#getAll() - should reject Unauthorized", async () => {
      await expect(Characters.getAll()).to.be.rejectedWith(APIError, ErrorMessage.Unauthorized);
    });

    it("#getbyName() - should reject forbidden", async () => {
      await expect(Characters.getByName("CratoLsArch")).to.be.rejectedWith(
        APIError,
        ErrorMessage.Forbidden
      );
    });
    return;
  }

  describe("getAll()", function () {
    this.timeout(5000);

    it("#getAll() - should return list of characters", async () => {
      charList = <SessionCharacterBase[]>await expect(Characters.getAll()).to.be.fulfilled;
    });

    step("validateOrReject(result) - should be fulfilled", async () => {
      for (const char of charList) {
        try {
          await validateOrReject(char, validatorOptions);
        } catch (error: unknown) {
          if (Array.isArray(error) && error[0] instanceof ValidationError)
            throw new ValidationErrorExt(error as ValidationError[]);
          else throw error;
        }
      }
    });

    step("result - should not be empty", () => {
      expect(charList).to.not.be.empty;
    });

    step("result[0].getCharacter() - should return character", async () => {
      await expect(charList[0].getCharacter()).to.be.fulfilled;
    });
  });

  describe("getByName()", function () {
    this.timeout(20000);

    let char: SessionCharacter;
    let charName = "";

    before(() => {
      charName = charList[0].name;
    });

    it(`#getByName(${charName}) - should return data for a character`, async () => {
      char = <SessionCharacter>await expect(Characters.getByName(charName)).to.be.fulfilled;
    });

    step("validateOrReject(result) - should be fulfilled", async () => {
      try {
        await validateOrReject(char, validatorOptions);
      } catch (error: unknown) {
        if (Array.isArray(error) && error[0] instanceof ValidationError)
          throw new ValidationErrorExt(error as ValidationError[]);
        else throw error;
      }
    });

    step(`result.updateInventory() - should be fulfilled`, async () => {
      await expect(char.updateInventory()).to.be.fulfilled;
    });
  });
});
