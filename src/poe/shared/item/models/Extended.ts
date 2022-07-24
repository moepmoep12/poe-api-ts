import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsOptional, IsString, Min, ValidateNested } from "class-validator";

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
  @Type(() => Mods)
  mods?: Mods;

  @ValidateNested()
  @Type(() => ModHashes)
  hashes!: ModHashes;
}
