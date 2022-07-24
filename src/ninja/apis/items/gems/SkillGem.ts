import { IsBoolean, IsInt, IsOptional, IsString, Max, Min } from "class-validator";

import { ItemBase } from "../../../shared/items";

export class SkillGem extends ItemBase {
  @IsString()
  variant!: string;

  @IsInt()
  @Min(1)
  @Max(21)
  gemLevel!: number;

  @IsOptional()
  @IsBoolean()
  corrupted?: boolean;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(23)
  gemQuality?: number;
}
