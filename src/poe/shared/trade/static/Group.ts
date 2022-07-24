import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsString, ValidateIf, ValidateNested } from "class-validator";

import { Transformable } from "../../../../common/classes/Transformable";
import { Entry } from "./models/Entry";

export class Group extends Transformable {
  @IsNotEmpty()
  @IsString()
  id!: string;

  @IsString()
  @IsNotEmpty()
  @ValidateIf((_, value) => value != null)
  label!: null | string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Entry)
  entries!: Entry[];
}
