import "reflect-metadata";
import { config } from "dotenv";
config();

import chai from "chai";
import chaiAsPromised from "chai-as-promised";

import { Settings } from "../src/poe";

export function mochaGlobalSetup(): void {
  chai.use(chaiAsPromised);
  Settings.userAgent = `exalted/${process.env.npm_package_version as string} ${
    process.env.npm_author_email as string
  }`;
  Settings.sessionId = process.env["POESESSID"] as string;
  Settings.authorizationToken = process.env["ACCESS_TOKEN"] as string;
  Settings.serviceToken = process.env["SERVICE_TOKEN"] as string;

  console.log(`Running tests with scopes: ${process.env.SCOPES as string}`);
}
