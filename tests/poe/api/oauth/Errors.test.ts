// import "reflect-metadata";
// import { after, describe, it } from "mocha";
// import { expect } from "chai";

// import { Accounts, Characters, Ladders } from "../../../src/poe/apis/oauth";

// import { APIError } from "../../../src/poe/errors";
// import { ErrorMessage } from "../../../src/poe/errors/models/OAuthAPIError";
// import { Settings } from "../../../src/poe";

// describe("Path of Exile - API - Errors", function () {
//   this.timeout(10000);

//   let authToken: string;
//   let serviceToken: string;

//   before(() => {
//     authToken = Settings.authorizationToken;
//     serviceToken = Settings.serviceToken;
//   });

//   it("Accounts.getProfile() - should reject invalid token", async () => {
//     Settings.authorizationToken = "INVALID";
//     await expect(Accounts.getProfile()).to.be.rejectedWith(APIError, ErrorMessage.InvalidToken);
//   });

//   it("Accounts.getProfile() - should reject invalid request", async () => {
//     Settings.authorizationToken = "";
//     await expect(Accounts.getProfile()).to.be.rejectedWith(APIError, ErrorMessage.InvalidRequest);
//   });

//   it("Characters.getAll() - should reject invalid token", async () => {
//     Settings.authorizationToken = "INVALID";
//     await expect(Characters.getAll()).to.be.rejectedWith(APIError, ErrorMessage.InvalidToken);
//   });

//   it("Characters.getAll() - should reject invalid request", async () => {
//     Settings.authorizationToken = "";
//     await expect(Characters.getAll()).to.be.rejectedWith(APIError, ErrorMessage.InvalidRequest);
//   });

//   it("Characters.getById(id) - should reject invalid token", async () => {
//     Settings.authorizationToken = "INVALID";
//     await expect(Characters.getByName("charName")).to.be.rejectedWith(
//       APIError,
//       ErrorMessage.InvalidToken
//     );
//   });

//   it("Characters.getById(id) - should reject invalid request", async () => {
//     Settings.authorizationToken = "";
//     await expect(Characters.getByName("charName")).to.be.rejectedWith(
//       APIError,
//       ErrorMessage.InvalidRequest
//     );
//   });

//   it("Ladders.get(id) - should reject invalid token", async () => {
//     Settings.serviceToken = "INVALID";
//     await expect(Ladders.get("Standard")).to.be.rejectedWith(APIError, ErrorMessage.InvalidToken);
//   });

//   it("Ladders.get(id) - should reject invalid request", async () => {
//     Settings.serviceToken = "";
//     await expect(Ladders.get("Standard")).to.be.rejectedWith(APIError, ErrorMessage.InvalidRequest);
//   });

//   after(() => {
//     Settings.authorizationToken = authToken;
//     Settings.serviceToken = serviceToken;
//   });
// });
