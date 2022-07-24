/* eslint-disable @typescript-eslint/no-misused-promises */
import "reflect-metadata";
import { describe, it } from "mocha";
import { expect } from "chai";
import { step } from "mocha-steps";
import { validateOrReject, ValidationError } from "class-validator";

import { ValidationErrorExt } from "../ValidationError";
import { validatorOptions } from "../ValidatorOptions";

import { Items } from "../../src/ninja/apis/";
import { HistoryPoint } from "../../src/ninja/shared";
import { ItemOption } from "../../src/ninja/apis/items/models/ItemOption";

const league = "Standard";

describe("PoE.Ninja - Items", function () {
  this.timeout(30000);

  describe(`getHistoryGeneric()`, () => {
    this.timeout(5000);

    const id = 636;
    const type = ItemOption.DivinationCard;
    let result: HistoryPoint[];

    it(`#getHistory(${league}, ${type}, ${id}) - should return history`, async () => {
      result = <HistoryPoint[]>(
        await expect(Items.getHistoryGeneric(league, type, id)).to.be.fulfilled
      );
    });

    step("validateOrReject(result) - should be fulfilled", async () => {
      for (const historyPoint of result) {
        try {
          await validateOrReject(historyPoint, validatorOptions);
        } catch (error: unknown) {
          if (Array.isArray(error) && error[0] instanceof ValidationError)
            throw new ValidationErrorExt(error as ValidationError[]);
          else throw error;
        }
      }
    });
  });
});
