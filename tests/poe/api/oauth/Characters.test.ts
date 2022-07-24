/* eslint-disable @typescript-eslint/no-misused-promises */
import "reflect-metadata";
import { describe, it } from "mocha";
import { step } from "mocha-steps";
import { expect } from "chai";
import { validateOrReject, ValidationError } from "class-validator";

import { ValidationErrorExt } from "../../../ValidationError";
import { validatorOptions } from "../../../ValidatorOptions";

import { OAuthCharacterBase } from "../../../../src/poe/apis/oauth/characters/CharacterBase";
import { OAuthCharacter } from "../../../../src/poe/apis/oauth/characters/Character";
import { Characters, AccountScopes } from "../../../../src/poe/apis/oauth";

import { APIError } from "../../../../src/poe/errors";
import { ErrorMessage } from "../../../../src/poe/errors/models/OAuthAPIError";

const scopes = <string>process.env.SCOPES;

describe("Path of Exile - OAuthAPI - Characters", function () {
  this.timeout(20000);

  let charList: OAuthCharacterBase[];

  if (!scopes?.includes(AccountScopes.Characters)) {
    it("#getAll() - should reject insufficient scope", async () => {
      await expect(Characters.getAll()).to.be.rejectedWith(
        APIError,
        ErrorMessage.InsufficientScope
      );
    });

    it(`#getByName('') - should reject insufficient scope`, async () => {
      await expect(Characters.getByName("")).to.be.rejectedWith(
        APIError,
        ErrorMessage.InsufficientScope
      );
    });
    return;
  }

  before((done) => setTimeout(done, 2000));

  describe("#getAll()", function () {
    this.timeout(5000);

    it("#getAll() - should return list of characters", async () => {
      charList = <OAuthCharacterBase[]>await expect(Characters.getAll()).to.be.fulfilled;
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
  });

  describe("#getByName()", function () {
    this.timeout(20000);

    let char: OAuthCharacter;
    let charName = "";

    before(() => {
      charName = charList[0].name;
    });

    it(`#getByName(${charName}) - should return data for a character`, async () => {
      char = <OAuthCharacter>await expect(Characters.getByName(charName)).to.be.fulfilled;
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
  });
});

// describe("Path of Exile - OAuth - JSON - Characters", function () {
//   let characters: CharacterBase[];
//   let character: Character;

//   before(() => {
//     characters = plainToInstance(OAuthCharacterBase, charactersJSON.characters);
//     character = plainToInstance(OAuthCharacter, characterJSON.character);
//   });

//   it("characters - should correctly instantiate list of characters", () => {
//     expect(characters[0].name).to.equal("Crato_LegacySRS");
//   });

//   it("character - should correctly instantiate single character", () => {
//     expect(character.passives.jewel_data["4"].type).to.equal("JewelTimeless");
//   });

//   it("isCharacter(result) - should be true", () => {
//     expect(isCharacter(character)).to.be.true;
//   });
// });
