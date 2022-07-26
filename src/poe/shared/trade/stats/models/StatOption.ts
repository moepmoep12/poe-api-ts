import { Type } from "class-transformer";
import { IsArray, ValidateNested } from "class-validator";

import { Option } from "./Option";

export abstract class StatOption {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(/* istanbul ignore next */ () => Option)
  options!: Option[];
}
