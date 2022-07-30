import { Type } from "class-transformer";
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";

import { Property } from "./Property";

export class Hybrid {
  @IsNotEmpty()
  @IsString()
  baseTypeName!: string;

  @IsOptional()
  @IsBoolean()
  isVaalGem?: boolean;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(/* istanbul ignore next */ () => Property)
  properties?: Property[];

  @IsOptional()
  @IsArray()
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  explicitMods?: string[];

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  secDescrText?: string;
}
