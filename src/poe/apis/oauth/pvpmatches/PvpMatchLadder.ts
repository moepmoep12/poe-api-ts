import { Type } from "class-transformer";

import { PvpLadder, PvpMatch, PvpMatchLadder } from "../../../shared/pvp_matches";

import { OAuthPvpLadder } from "./PvpLadder";
import { OAuthPvpMatch } from "./PvpMatch";

/**
 * @hidden
 */
export class OAuthPvpMatchLadder extends PvpMatchLadder {
  @Type(/* istanbul ignore next */ () => OAuthPvpMatch)
  match!: PvpMatch;

  @Type(/* istanbul ignore next */ () => OAuthPvpLadder)
  ladder!: PvpLadder;
}
