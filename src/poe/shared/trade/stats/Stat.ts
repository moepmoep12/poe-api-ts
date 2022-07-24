import { Type } from "class-transformer";
import { IsEnum, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { Transformable } from "../../../../common/classes/Transformable";

import { StatOption } from "./models/StatOption";
import { StatType } from "./models/StatType";

export class Stat extends Transformable {
  @IsNotEmpty()
  @IsString()
  id!: string;

  @IsNotEmpty()
  @IsString()
  text!: string;

  @IsEnum(StatType)
  type!: StatType;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => StatOption)
  option?: StatOption;
}
