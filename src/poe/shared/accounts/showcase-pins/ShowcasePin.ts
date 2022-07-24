import { IsInt, IsNotEmpty, IsString, Min, ValidateIf } from "class-validator";

import { Transformable } from "../../../../common/classes/Transformable";

export class ShowcasePin extends Transformable {
  @IsNotEmpty()
  @IsString()
  @ValidateIf((_, val) => val != null)
  character!: string | null;

  @Min(0)
  @IsInt()
  position!: number;

  @IsNotEmpty()
  @IsString()
  type!: string;

  @IsNotEmpty()
  @IsString()
  label!: string;

  @Min(0)
  @IsInt()
  id!: number;

  @IsNotEmpty()
  @IsString()
  icon!: string;
}
