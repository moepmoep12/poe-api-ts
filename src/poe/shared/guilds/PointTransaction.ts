import { Type } from "class-transformer";
import {
  IsDate,
  IsInt,
  IsString,
  ValidateNested,
  IsArray,
  IsBoolean,
  IsPositive,
  IsNotEmpty,
  Min,
} from "class-validator";

import { Transformable } from "../../../common/classes/Transformable";

import { Account } from "../accounts";

import { Guild } from "./Guild";

/**
 * Transaction of points for mictrotransactions.
 */
export class PointTransaction extends Transformable {
  @IsPositive()
  @IsInt()
  id!: number;

  @Min(0)
  @IsInt()
  points!: number;

  @IsNotEmpty()
  @IsString()
  status!: string;

  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  @IsArray()
  notes!: string[];

  @IsBoolean()
  manual!: boolean;

  @ValidateNested()
  @Type(/* istanbul ignore next */ () => Guild)
  guild!: Guild;

  @ValidateNested()
  @Type(/* istanbul ignore next */ () => Account)
  account!: Account;

  @IsDate()
  @Type(/* istanbul ignore next */ () => Date)
  createdAt!: Date;
}
