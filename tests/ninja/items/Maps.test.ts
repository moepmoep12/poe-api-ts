import "reflect-metadata";
import { describe, it } from "mocha";
import { expect } from "chai";
import { step } from "mocha-steps";
import { validateOrReject, ValidationError } from "class-validator";

import { ValidationErrorExt } from "../../ValidationError";
import { validatorOptions } from "../../ValidatorOptions";
import { mochaGlobalSetup } from "../../mochaFixtures";

import { Items } from "../../../src/ninja/apis/";
import { MapOverview } from "../../../src/ninja/apis/items/maps";
import { ItemOption } from "../../../src/ninja/apis/items/models/ItemOption";

if (process.env.MOCHA_WORKER_ID) mochaGlobalSetup();

describe(`PoE.Ninja - Items - Maps`, function () {
  this.timeout(5000);

  const league = "Standard";
  let result: MapOverview;
  const types = [
    ItemOption.Map,
    ItemOption.UniqueMap,
    ItemOption.BlightedMap,
    ItemOption.BlightRavageddMap,
  ];

  for (const type of types) {
    it(`#getOverview(${league}, ${type}) - should return ItemOverview`, async () => {
      // @ts-expect-error expected
      result = <MapOverview>await expect(Items.Maps.getOverview(league, type)).to.be.fulfilled;
    });

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    step("validateOrReject(result) - should be fulfilled", async () => {
      try {
        await validateOrReject(result, validatorOptions);
      } catch (error: unknown) {
        if (Array.isArray(error) && error[0] instanceof ValidationError)
          throw new ValidationErrorExt(error as ValidationError[]);
        else throw error;
      }
    });
  }
});
