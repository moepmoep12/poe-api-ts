import { Type } from "class-transformer";
import { IsBoolean, IsInt, IsOptional, IsPositive, ValidateNested } from "class-validator";

import { Transformable } from "../../../common/classes/Transformable";

import { LadderAccount } from "./LadderAccount";

import { LadderCharacter } from "./LadderCharacter";

export class LadderEntry extends Transformable {
  @IsPositive()
  @IsInt()
  rank!: number;

  @ValidateNested()
  @Type(/* istanbul ignore next */ () => LadderCharacter)
  character!: LadderCharacter;

  @ValidateNested()
  @Type(/* istanbul ignore next */ () => LadderAccount)
  account!: LadderAccount;

  @IsOptional()
  @IsBoolean()
  dead?: boolean;

  @IsOptional()
  @IsBoolean()
  retired?: boolean;

  @IsOptional()
  @IsBoolean()
  public?: boolean;

  @IsOptional()
  @IsBoolean()
  online?: boolean;
}
