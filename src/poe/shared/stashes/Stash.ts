import { IsArray, IsInt, Min, ValidateNested } from "class-validator";
import { Transformable } from "../../../common/classes/Transformable";

import { StashTabBase } from "./StashTabBase";

export class Stash<T extends StashTabBase> extends Transformable {
  @Min(0)
  @IsInt()
  numTabs!: number;

  @IsArray()
  @ValidateNested({ each: true })
  tabs!: T[];
}
