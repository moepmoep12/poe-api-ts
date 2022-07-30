import { Type } from "class-transformer";
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsString,
  Min,
  ValidateNested,
} from "class-validator";
import { Transformable } from "../../../common/classes/Transformable";

import { Trophy } from "./models/Trophy";

export class PlayerResult extends Transformable {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @Min(0)
  @IsInt()
  points!: number;

  @IsBoolean()
  pvp!: boolean;

  @Min(0)
  @IsInt()
  rank!: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(/* istanbul ignore next */ () => Trophy)
  trophies!: Trophy[];
}
