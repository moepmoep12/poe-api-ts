import { Type } from "class-transformer";
import { IsArray, IsInt, IsString, Min, ValidateNested } from "class-validator";

import { Transformable } from "../../../../common/classes";

import { Magnitude } from "./Magnitude";

export class Mod extends Transformable {
  @IsString()
  name!: string;

  @IsString()
  tier!: string;

  @IsInt()
  @Min(0)
  level!: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(/* istanbul ignore next */ () => Magnitude)
  magnitudes!: Magnitude[];
}
