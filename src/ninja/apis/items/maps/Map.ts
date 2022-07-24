import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from "class-validator";

import { ItemBase } from "../../../shared/items";
import { Variant } from "./models";

export class Map extends ItemBase {
  @IsString()
  baseType!: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(16)
  mapTier?: number;

  @IsOptional()
  @IsEnum(Variant)
  variant?: Variant;
}
