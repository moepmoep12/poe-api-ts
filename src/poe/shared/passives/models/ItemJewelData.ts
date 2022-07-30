import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsOptional, IsString, Min, ValidateNested } from "class-validator";

import { Subgraph } from "./Subgraph";

export abstract class ItemJewelData {
  @IsString()
  @IsNotEmpty()
  type!: string;

  @IsOptional()
  @Min(0)
  @IsInt()
  radius?: number;

  @IsOptional()
  @Min(0)
  @IsInt()
  radiusMin?: number;

  @IsOptional()
  @Min(0)
  @IsInt()
  radiusMax?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  radiusVisual?: string;

  @IsOptional()
  @ValidateNested()
  @Type(/* istanbul ignore next */ () => Subgraph)
  // only present on cluster jewels
  subgraph?: Subgraph;
}
