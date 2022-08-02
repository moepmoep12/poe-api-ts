import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, Min } from "class-validator";

import { CharacterBase } from "../characters/CharacterBase";

export abstract class PvpCharacter extends CharacterBase {
  @IsOptional()
  @IsBoolean()
  public?: boolean;

  @IsNotEmpty()
  @IsString()
  override id!: string;

  override experience = 0;

  @IsOptional()
  @Min(0)
  @IsInt()
  // count of league objective completions
  score?: number;
}
