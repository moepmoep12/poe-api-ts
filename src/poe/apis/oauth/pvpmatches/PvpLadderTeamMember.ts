import { Type } from "class-transformer";

import { Account } from "../../../shared/accounts";
import { PvpCharacter } from "../../../shared/pvp_matches/PvpCharacter";
import { PvpLadderTeamMember } from "../../../shared/pvp_matches/PvpLadderTeamMember";

import { OAuthProfile } from "../accounts/Profile";

import { OAuthPvpCharacter } from "./PvpCharacter";

/**
 * @hidden
 */
export class OAuthPvpLadderTeamMember extends PvpLadderTeamMember {
  @Type(/* istanbul ignore next */ () => OAuthProfile)
  override account!: Account;

  @Type(/* istanbul ignore next */ () => OAuthPvpCharacter)
  override character!: PvpCharacter;
}
