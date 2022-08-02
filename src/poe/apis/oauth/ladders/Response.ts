import { Type } from "class-transformer";

import { OAuthLadder } from "./Ladder";

/**
 * @hidden
 */
export class Response {
  @Type(/* istanbul ignore next */ () => OAuthLadder)
  ladder!: OAuthLadder;
}
