import { Type } from "class-transformer";
import { IsArray, IsInt, Min, ValidateNested } from "class-validator";

import { Transformable } from "../../../common/classes/Transformable";

import { PlayerResult } from "./PlayerResult";

export class PlayerHistory extends Transformable {
  @Min(0)
  @IsInt()
  total!: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(/* istanbul ignore next */ () => PlayerResult)
  entries!: PlayerResult[];
}
