import "reflect-metadata";
import { describe, it } from "mocha";
import { expect } from "chai";
import { plainToInstance } from "class-transformer";
import { validateOrReject, ValidationError } from "class-validator";

import { ValidationErrorExt } from "../../../ValidationError";
import { validatorOptions } from "../../../ValidatorOptions";

import { Response } from "../../../../src/poe/apis/public/streams/Response";

import streamsJson from "./resources/streams.json";

describe("Path of Exile - PublicAPI - JSON - Streams", function () {
  this.timeout(10000);

  let response: Response;

  before(() => {
    response = plainToInstance(Response, streamsJson);
  });

  it("stream.url - should return profile url", () => {
    expect(response.streams[0].url).to.equal("https://twitch.tv/casiepoe");
    expect(response.streams[1].url).to.equal("https://twitch.tv/legi1");
  });

  it("validateOrReject(response) - should be fulfilled", async () => {
    try {
      await validateOrReject(response, validatorOptions);
    } catch (error: unknown) {
      throw new ValidationErrorExt(error as ValidationError[]);
    }
  });
});
