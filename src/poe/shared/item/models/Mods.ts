import { Type } from "class-transformer";
import { IsArray, ValidateNested } from "class-validator";

import { Transformable } from "../../../../common/classes";

import { Mod } from "./Mod";

export class Mods extends Transformable {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(/* istanbul ignore next */ () => Mod)
  explicit!: Mod[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(/* istanbul ignore next */ () => Mod)
  implicit!: Mod[];
}
