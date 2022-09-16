import { Type } from "class-transformer";
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateNested,
} from "class-validator";

import { ModHashes } from "./ModHashes";
import { Mods } from "./Mods";

// only present in the Public Stash API
export class Extended {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  category?: string;

  @IsOptional()
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  subcategories?: string[];

  @IsOptional()
  @Min(0)
  @IsInt()
  prefixes?: number;

  @IsOptional()
  @Min(0)
  @IsInt()
  suffixes?: number;

  @IsOptional()
  @IsString()
  text?: string;

  @IsOptional()
  @ValidateNested()
  @Type(/* istanbul ignore next */ () => Mods)
  mods?: Mods;

  @IsOptional()
  @Min(0)
  @Max(1)
  //only present on armours
  base_defence_percentile?: number;

  @IsOptional()
  @IsNumber()
  //only present on armours
  ar?: number;

  @IsOptional()
  @IsBoolean()
  //only present on armours
  ar_aug?: boolean;

  @IsOptional()
  @IsNumber()
  //only present on armours
  ev?: number;

  @IsOptional()
  @IsBoolean()
  //only present on armours
  ev_aug?: boolean;

  @IsOptional()
  @IsNumber()
  //only present on armours
  es?: number;

  @IsOptional()
  @IsBoolean()
  //only present on armours
  es_aug?: boolean;

  @ValidateNested()
  @Type(/* istanbul ignore next */ () => ModHashes)
  hashes!: ModHashes;
}
