import { Type } from "class-transformer";
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
  ValidateNested,
} from "class-validator";

import { Transformable } from "../../../../../common/classes";
import { Realm } from "../../../models";

import { Online } from "./Online";

export abstract class ListedAccount extends Transformable {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsString()
  lastCharacterName!: string;

  @ValidateNested()
  @ValidateIf((_, val) => val != null)
  @Type(/* istanbul ignore next */ () => Online)
  online!: Online | null;

  @IsNotEmpty()
  @IsString()
  language!: string;

  @IsOptional()
  @IsBoolean()
  current?: boolean;

  @IsOptional()
  @IsEnum(Realm)
  realm?: Realm;
}
