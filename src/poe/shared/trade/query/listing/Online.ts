import { IsNotEmpty, IsOptional, IsString } from "class-validator";

import { Transformable } from "../../../../../common/classes";

export abstract class Online extends Transformable {
  @IsNotEmpty()
  @IsString()
  league!: string;

  @IsOptional()
  @IsString()
  status?: "afk";
}
