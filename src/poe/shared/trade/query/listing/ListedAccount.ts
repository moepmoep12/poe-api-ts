import { Type } from "class-transformer";
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
  ValidateNested,
} from "class-validator";

import { Transformable } from "../../../../../common/classes";

import { Online } from "./Online";

export abstract class ListedAccount extends Transformable {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsString()
  lastCharacterName!: string;

  @ValidateNested()
  @ValidateIf((_, val) => val != null)
  @Type(() => Online)
  online!: Online | null;

  @IsNotEmpty()
  @IsString()
  language!: string;

  @IsOptional()
  @IsBoolean()
  current?: boolean;
}
