import { Type } from "class-transformer";
import { IsArray, IsInt, IsOptional, IsString, Min, ValidateNested } from "class-validator";

import { ItemBase, Property } from "../../../item";

export class ListedItem extends ItemBase {
  @IsOptional()
  @Min(0)
  @IsInt()
  x?: number;

  @IsOptional()
  @Min(0)
  @IsInt()
  y?: number;

  @IsOptional()
  @IsString()
  note?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(/* istanbul ignore next */ () => Property)
  properties?: Property[];
}
