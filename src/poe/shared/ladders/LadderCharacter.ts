import { Type } from "class-transformer";
import {
  IsInt,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsPositive,
  IsString,
  Min,
  ValidateNested,
} from "class-validator";

import { CharacterBase } from "../characters/CharacterBase";
import { DelveDepth } from "./models/DelveDepth";

export abstract class LadderCharacter extends CharacterBase {
  @IsNotEmpty()
  @IsString()
  override id!: string;

  @IsOptional()
  @IsPositive()
  @IsInt()
  // time taken to complete the league objective in seconds
  time?: number;

  @IsOptional()
  @Min(0)
  @IsInt()
  // count of league objective completions
  score?: number;

  @IsOptional()
  @IsObject()
  progress?: object;

  @IsOptional()
  @ValidateNested()
  @Type(() => DelveDepth)
  // deepest Delve depth completed
  depth?: DelveDepth;
}
