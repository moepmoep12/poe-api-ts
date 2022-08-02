import { IsDate, IsInt, IsString, IsOptional, IsNotEmpty, Min } from "class-validator";

import { Transformable } from "../../../common/classes/Transformable";

export class Guild extends Transformable {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  id?: string;

  @IsOptional()
  @IsString()
  tag?: string;

  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @IsOptional()
  @Min(0)
  @IsInt()
  points?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  statusMessage?: string;
}
