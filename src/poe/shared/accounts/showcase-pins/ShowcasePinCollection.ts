import { Type } from "class-transformer";
import { IsArray, IsInt, IsNotEmpty, IsString, Min, ValidateNested } from "class-validator";

import { Transformable } from "../../../../common/classes/Transformable";

import { ShowcasePin } from "./ShowcasePin";

export class ShowcasePinCollection extends Transformable {
  @Min(0)
  @IsInt()
  total!: number;

  @IsNotEmpty()
  @IsString()
  account!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ShowcasePin)
  entries!: ShowcasePin[];
}
