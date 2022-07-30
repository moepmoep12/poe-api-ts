import { Type } from "class-transformer";
import { IsBoolean, IsOptional, ValidateNested } from "class-validator";

import { Transformable } from "../../../common/classes/Transformable";

import { Account } from "../accounts/Account";

import { PvpCharacter } from "./PvpCharacter";

export abstract class PvpLadderTeamMember extends Transformable {
  @ValidateNested()
  @Type(/* istanbul ignore next */ () => Account)
  account!: Account;

  @ValidateNested()
  @Type(/* istanbul ignore next */ () => PvpCharacter)
  character!: PvpCharacter;

  @IsOptional()
  @IsBoolean()
  // always true if present
  public?: boolean;
}
