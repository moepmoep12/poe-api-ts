import { IsInt, IsNotEmpty, IsOptional, IsString, Max, Min } from "class-validator";

import { Consumable } from "../../../shared/items";

export class Essence extends Consumable {
  @IsString()
  @IsNotEmpty()
  baseType!: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(16)
  mapTier?: number;
}
