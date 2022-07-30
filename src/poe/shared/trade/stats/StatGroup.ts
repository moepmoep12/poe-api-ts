import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsString, ValidateNested } from "class-validator";

import { Transformable } from "../../../../common/classes/Transformable";

import { Stat } from "./Stat";

export class StatGroup extends Transformable {
  @IsNotEmpty()
  @IsString()
  label!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(/* istanbul ignore next */ () => Stat)
  entries!: Stat[];
}
