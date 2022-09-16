import { Type } from "class-transformer";
import {
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  Min,
  ValidateIf,
  ValidateNested,
} from "class-validator";

import { ItemBase, Property } from "../../../../shared/item";

export class MtxItem extends ItemBase {
  @IsString()
  @ValidateIf((_, val) => val != null)
  slot!: string | null;

  @IsInt()
  @Min(0)
  count!: number;

  @IsString({ each: true })
  @IsArray()
  @ValidateIf((_, val) => val != null)
  tags!: null | string[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(/* istanbul ignore next */ () => Property)
  properties?: Property[];
}
