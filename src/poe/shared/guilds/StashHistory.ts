import { Type } from "class-transformer";
import { ValidateNested, IsBoolean, IsArray } from "class-validator";

import { Transformable } from "../../../common/classes/Transformable";

import { StashAction } from "./StashAction";

/**
 * History of actions performed on the guild stash.
 */
export class StashHistory extends Transformable {
  @IsBoolean()
  truncated!: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StashAction)
  entries!: StashAction[];
}
