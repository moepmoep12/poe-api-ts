import { IsBoolean, IsOptional } from "class-validator";

export class Influences {
  @IsOptional()
  @IsBoolean()
  elder?: boolean;

  @IsOptional()
  @IsBoolean()
  shaper?: boolean;

  @IsOptional()
  @IsBoolean()
  hunter?: boolean;

  @IsOptional()
  @IsBoolean()
  redeemer?: boolean;

  @IsOptional()
  @IsBoolean()
  warlord?: boolean;

  @IsOptional()
  @IsBoolean()
  crusader?: boolean;
}
