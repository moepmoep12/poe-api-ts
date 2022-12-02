import "reflect-metadata";
import { describe, it } from "mocha";
import { expect } from "chai";

import { mochaGlobalSetup } from "../../mochaFixtures";

import { Items } from "../../../src/ninja/apis/";

if (process.env.MOCHA_WORKER_ID) mochaGlobalSetup();

describe(`PoE.Ninja - Items - All`, function () {
  this.timeout(50000);

  const league = "Standard";

  it(`#getOverviewAll(${league}) - should return ItemOverview`, async () => {
    await expect(Items.getOverviewAll(league)).to.be.fulfilled;
  });
});
