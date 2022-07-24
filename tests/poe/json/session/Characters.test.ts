import "reflect-metadata";
import { describe, it } from "mocha";
import { validateOrReject, ValidationError } from "class-validator";
import { plainToInstance } from "class-transformer";

import { ValidationErrorExt } from "../../../ValidationError";
import { validatorOptions } from "../../../ValidatorOptions";

import { InventoryItem } from "../../../../src/poe/shared/item";

import { SessionCharacterBase } from "../../../../src/poe/apis/session/characters/CharacterBase";
import { SessionPassives } from "../../../../src/poe/apis/session/characters/Passives";

import charactersJson from "./resources/characters.json";
import itemsJson from "./resources/characterItems.json";
import passivesJson from "./resources/characterPassives.json";

describe("Path of Exile - SessionAPI - JSON - Characters", function () {
  let charList: SessionCharacterBase[];
  let items: InventoryItem[];
  let passives: SessionPassives;

  before(() => {
    charList = plainToInstance(SessionCharacterBase, charactersJson);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    items = plainToInstance(InventoryItem, itemsJson.items);
    passives = plainToInstance(SessionPassives, passivesJson);
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
