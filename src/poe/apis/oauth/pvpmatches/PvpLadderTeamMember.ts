import { Type } from "class-transformer";

import { PvpCharacter } from "../../../shared/pvp_matches/PvpCharacter";
import { PvpLadderTeamMember } from "../../../shared/pvp_matches/PvpLadderTeamMember";

import { OAuthPvpCharacter } from "./PvpCharacter";

/**
 * @hidden
 */
export class OAuthPvpLadderTeamMember extends PvpLadderTeamMember {
  @Type(/* istanbul ignore next */ () => OAuthPvpCharacter)
  override character!: PvpCharacter;
}
