import { Type } from "class-transformer";
import {
  IsArray,
  IsDate,
  IsInt,
  IsOptional,
  IsPositive,
  Min,
  ValidateNested,
} from "class-validator";

import { Transformable } from "../../../common/classes/Transformable";

import { PvpLadderTeamMember } from "./PvpLadderTeamMember";

export abstract class PvpLadderTeamEntry extends Transformable {
  @IsPositive()
  @IsInt()
  rank!: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PvpLadderTeamMember)
  members!: PvpLadderTeamMember[];

  @IsOptional()
  @Min(0)
  @IsInt()
  // only present if the PvP Match uses Glicko ratings
  rating?: number;

  @IsOptional()
  @Min(0)
  @IsInt()
  points?: number;

  @IsOptional()
  @Min(0)
  @IsInt()
  gamesPlayed?: number;

  @IsOptional()
  @Min(0)
  @IsInt()
  cumulativeOpponentPoints?: number;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  lastGameTime?: Date;
}
