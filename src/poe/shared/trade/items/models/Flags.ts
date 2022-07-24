import { IsBoolean, IsOptional } from "class-validator";

export abstract class Flags {
  @IsOptional()
  @IsBoolean()
  unique?: boolean;

  @IsOptional()
  @IsBoolean()
  prophecy?: boolean;
}
