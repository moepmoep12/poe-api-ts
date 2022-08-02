import { Type } from "class-transformer";
import { IsBoolean, IsOptional, ValidateNested } from "class-validator";

import { Transformable } from "../../../common/classes/Transformable";

import { LadderAccount } from "../ladders";

import { PvpCharacter } from "./PvpCharacter";

export abstract class PvpLadderTeamMember extends Transformable {
  @ValidateNested()
  @Type(/* istanbul ignore next */ () => LadderAccount)
  account!: LadderAccount;

  @ValidateNested()
  @Type(/* istanbul ignore next */ () => PvpCharacter)
  character!: PvpCharacter;

  @IsOptional()
  @IsBoolean()
  // always true if present
  public?: boolean;
}
