/* eslint-disable @typescript-eslint/no-misused-promises */
import "reflect-metadata";
import { describe, it } from "mocha";
import { expect } from "chai";
import { step } from "mocha-steps";
import { validateOrReject, ValidationError } from "class-validator";

import { ValidationErrorExt } from "../../ValidationError";
import { validatorOptions } from "../../ValidatorOptions";

import { InventoryItem } from "../../../src/poe/shared/item";

import { Characters } from "../../../src/poe/apis/public";
import { PublicPassives } from "../../../src/poe/apis/public/characters/Passives";
import { PublicCharacterBase } from "../../../src/poe/apis/public/characters/CharacterBase";
import { PublicCharacter } from "../../../src/poe/apis/public/characters/Character";

describe("Path of Exile - PublicAPI - Characters", function () {
  this.timeout(20000);

  const accountName = "moepmoep12";
  const charName = "CratoLsArch";

  describe(`getItems()`, () => {
    this.timeout(5000);

    let items: InventoryItem[];

    it(`#getItems(${accountName},${charName}) - should return items`, async () => {
      items = <InventoryItem[]>(
        await expect(Characters.getItems(accountName, charName)).to.be.fulfilled
      );
    });

    step(`validateOrReject(result) - should be fulfilled`, async () => {
      for (const item of items) {
        try {
          await validateOrReject(item, validatorOptions);
        } catch (error: unknown) {
          if (Array.isArray(error) && error[0] instanceof ValidationError)
            throw new ValidationErrorExt(error as ValidationError[]);
          else throw error;
        }
      }
    });
  });

  describe(`getPassives()`, () => {
    this.timeout(5000);

    let passives: PublicPassives;

    it(`#getPassives(${accountName},${charName}) - should return passives`, async () => {
      passives = <PublicPassives>(
        await expect(Characters.getPassives(accountName, charName)).to.be.fulfilled
      );
    });

    step(`validateOrReject(result) - should be fulfilled`, async () => {
      try {
        await validateOrReject(passives, validatorOptions);
      } catch (error: unknown) {
        if (Array.isArray(error) && error[0] instanceof ValidationError)
          throw new ValidationErrorExt(error as ValidationError[]);
        else throw error;
      }
    });
  });

  describe("getAll()", function () {
    this.timeout(5000);

    let charList: PublicCharacterBase[];

    it(`#getAll(${accountName}) - should return list of characters`, async () => {
      charList = <PublicCharacterBase[]>(
        await expect(Characters.getAll(accountName)).to.be.fulfilled
      );
    });

    step("result - should not be empty", () => {
      expect(charList).to.not.be.empty;
    });

    step(`validateOrReject(result) - should be fulfilled`, async () => {
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
  });

  describe("getByName()", function () {
    this.timeout(10000);

    let char: PublicCharacter;

    it(`#getByName(${accountName},${charName}) - should return data for character ${charName}`, async () => {
      char = <PublicCharacter>(
        await expect(Characters.getByName(accountName, charName)).to.be.fulfilled
      );
    });

    step(`validateOrReject(result) - should be fulfilled`, async () => {
      try {
        await validateOrReject(char.equipment[0], validatorOptions);
      } catch (error: unknown) {
        if (Array.isArray(error) && error[0] instanceof ValidationError)
          throw new ValidationErrorExt(error as ValidationError[]);
        else throw error;
      }
    });
  });
});
