import "reflect-metadata";
import { describe, it } from "mocha";
import { validateOrReject, ValidationError } from "class-validator";
import { plainToInstance } from "class-transformer";

import { ValidationErrorExt } from "../../../ValidationError";
import { validatorOptions } from "../../../ValidatorOptions";

import { InventoryItem } from "../../../../src/poe/shared/item";

import { PublicPassives } from "../../../../src/poe/apis/public/characters/Passives";
import { PublicCharacterBase } from "../../../../src/poe/apis/public/characters/CharacterBase";

import charactersJson from "./resources/characters.json";
import itemsJson from "./resources/characterItems.json";
import passivesJson from "./resources/characterPassives.json";

describe("Path of Exile - PublicAPI - JSON - Characters", function () {
  let charList: PublicCharacterBase[];
  let items: InventoryItem[];
  let passives: PublicPassives;

  before(() => {
    charList = plainToInstance(PublicCharacterBase, charactersJson);
    items = plainToInstance(InventoryItem, itemsJson.items);
    passives = plainToInstance(PublicPassives, passivesJson);
  });

  it("validateOrReject(charList) - should be fulfilled", async () => {
    for (const char of charList) {
      try {
        await validateOrReject(char, validatorOptions);
      } catch (error: unknown) {
        throw new ValidationErrorExt(error as ValidationError[]);
      }
    }
  });

  it("validateOrReject(items) - should be fulfilled", async () => {
    for (const item of items) {
      try {
        await validateOrReject(item, validatorOptions);
      } catch (error: unknown) {
        throw new ValidationErrorExt(error as ValidationError[]);
      }
    }
  });

  it("validateOrReject(passives) - should be fulfilled", async () => {
    try {
      await validateOrReject(passives, validatorOptions);
    } catch (error: unknown) {
      throw new ValidationErrorExt(error as ValidationError[]);
    }
  });
});
