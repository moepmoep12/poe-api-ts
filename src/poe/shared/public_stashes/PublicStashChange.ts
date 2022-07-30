import { Type } from "class-transformer";
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";

import { Transformable } from "../../../common/classes/Transformable";

import { PublicStashChangeItem } from "./PublicStashChangeItem";

export class PublicStashChange extends Transformable {
  @IsNotEmpty()
  @IsString()
  //	a unique 64 digit hexadecimal string
  id!: string;

  @IsBoolean()
  // if false then optional properties will be null
  public!: boolean;

  @IsString()
  stashType!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(/* istanbul ignore next */ () => PublicStashChangeItem)
  items!: PublicStashChangeItem[];

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  accountName?: string;

  @IsOptional()
  @IsString()
  lastCharacterName?: string;

  @IsOptional()
  @IsString()
  // the name of the stash
  stash?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  // the league's name
  league?: string;
}
