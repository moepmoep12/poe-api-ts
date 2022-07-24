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
  @Type(() => Guild)
  guild!: Guild;

  @ValidateNested()
  @Type(() => Account)
  account!: Account;

  @IsDate()
  @Type(() => Date)
  createdAt!: Date;
}
