import { Type } from "class-transformer";
import { IsArray, IsInt, Min, ValidateNested } from "class-validator";
import { Transformable } from "../../../../common/classes";

import { Entry } from "./models";

export class MTXCollection extends Transformable {
  @IsInt()
  @Min(0)
  total!: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Entry)
  entries!: Entry[];
}
