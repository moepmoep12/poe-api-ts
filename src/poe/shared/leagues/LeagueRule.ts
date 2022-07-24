import { IsNotEmpty, IsOptional, IsString } from "class-validator";

import { Transformable } from "../../../common/classes/Transformable";

/**
 * Rule of a league as defined in https://www.pathofexile.com/developer/docs/reference#type-LeagueRule
 */
export class LeagueRule extends Transformable {
  @IsNotEmpty()
  @IsString()
  // examples: Hardcore, NoParties (SSF)
  id!: string;

  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  description?: string;
}
