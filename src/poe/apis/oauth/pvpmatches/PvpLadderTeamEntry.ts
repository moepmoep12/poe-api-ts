import { Expose, Type } from "class-transformer";
import { IsDate, IsInt, IsNumber, IsOptional, Min } from "class-validator";

import { PvpLadderTeamEntry, PvpLadderTeamMember } from "../../../shared/pvp_matches";

import { OAuthPvpLadderTeamMember } from "./PvpLadderTeamMember";

/**
 * @hidden
 */
export class OAuthPvpLadderTeamEntry extends PvpLadderTeamEntry {
  @Type(/* istanbul ignore next */ () => OAuthPvpLadderTeamMember)
  members!: PvpLadderTeamMember[];

  @IsOptional()
  @IsInt()
  @Min(0)
  @Expose({ name: "games_played" })
  gamesPlayed?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Expose({ name: "cumulative_opponent_points" })
  cumulativeOpponentPoints?: number;

  @IsOptional()
  @IsDate()
  @Expose({ name: "last_game_time" })
  @Type(/* istanbul ignore next */ () => Date)
  lastGameTime?: Date;
}
