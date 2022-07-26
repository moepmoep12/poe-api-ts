import "reflect-metadata";
import "mocha";
import { expect } from "chai";

import { mochaGlobalSetup } from "../mochaFixtures";

import { stripOuter } from "../../src/common/functions";

if (process.env.MOCHA_WORKER_ID) mochaGlobalSetup();

describe("Common - Functions", function () {
  describe("#stripOuter()", function () {
    it("should strip first key", () => {
      const data = JSON.stringify({ first: {}, second: {} });
      const stripped = <{ second: string }>JSON.parse(stripOuter(data));
      const containsFirst = "first" in stripped;
      const containsSecond = "second" in stripped;
      expect(containsFirst, "Doesn't contain first!").to.be.false;
      expect(containsSecond, "Doesn't contain second!").to.be.false;
    });
  });
});
