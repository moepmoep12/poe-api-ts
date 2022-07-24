import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from "class-validator";

import { CharacterBase } from "../characters/CharacterBase";

export abstract class PvpCharacter extends CharacterBase {
  @IsNotEmpty()
  @IsString()
  override id!: string;

  @IsOptional()
  @Min(0)
  @IsInt()
  // count of league objective completions
  score?: number;
}
