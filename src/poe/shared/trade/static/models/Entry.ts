import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export abstract class Entry {
  @IsNotEmpty()
  @IsString()
  id!: string;

  @IsNotEmpty()
  @IsString()
  text!: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  image?: string;
}
