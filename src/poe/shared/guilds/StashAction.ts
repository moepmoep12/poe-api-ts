import { Transform, Type } from "class-transformer";
import { ValidateNested, IsString, IsDate, IsNotEmpty } from "class-validator";

import { Transformable } from "../../../common/classes/Transformable";

import { LadderAccount } from "../ladders";

export class StashAction extends Transformable {
  @IsNotEmpty()
  @IsString()
  id!: string;

  @IsNotEmpty()
  @IsString()
  league!: string;

  @IsNotEmpty()
  @IsString()
  item!: string;

  @IsNotEmpty()
  @IsString()
  action!: string;

  @IsDate()
  @Transform(/* istanbul ignore next */ ({ value }) => new Date(value * 1000), {
    toClassOnly: true,
  })
  time!: Date;

  @ValidateNested()
  @Type(/* istanbul ignore next */ () => LadderAccount)
  account!: LadderAccount;
}
