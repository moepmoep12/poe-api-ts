import { Type } from "class-transformer";
import { IsArray, ValidateNested } from "class-validator";

import { PvpLadderTeamEntry, PvpLadder } from "../../../shared/pvp_matches";

import { OAuthPvpLadderTeamEntry } from "./PvpLadderTeamEntry";
/**
 * @hidden
 */
export class OAuthPvpLadder extends PvpLadder {
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => OAuthPvpLadderTeamEntry)
  entries!: PvpLadderTeamEntry[];
}
