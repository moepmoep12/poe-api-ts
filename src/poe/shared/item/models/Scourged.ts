import { IsIn, IsInt, IsNumber, IsOptional, Min } from "class-validator";

const SCOURGE_ITEM_TIERS = [1, 2, 3] as const;
const SCOURGE_MAP_TIERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;

export type ScourgeTierItem = typeof SCOURGE_ITEM_TIERS[number];
export type ScourgeTierMap = typeof SCOURGE_MAP_TIERS[number];

export class Scourged {
  @IsIn(SCOURGE_MAP_TIERS)
  // 1-3 for items, 1-10 for maps
  tier!: ScourgeTierItem | ScourgeTierMap;

  @IsOptional()
  @Min(0)
  @IsInt()
  // monster level required to progress
  level?: number;

  @IsOptional()
  @Min(0)
  @IsNumber()
  progress?: number;

  @IsOptional()
  @Min(0)
  @IsInt()
  total?: number;
}
