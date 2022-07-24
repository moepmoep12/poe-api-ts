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
  @Type(() => OAuthProfile)
  override account!: Account;

  @Type(() => OAuthPvpCharacter)
  override character!: PvpCharacter;
}
