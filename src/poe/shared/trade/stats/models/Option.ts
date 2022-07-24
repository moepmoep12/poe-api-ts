import { IsInt, IsNotEmpty, IsString, Min } from "class-validator";

export abstract class Option {
  @IsNotEmpty()
  @Min(0)
  @IsInt()
  id!: number;

  @IsNotEmpty()
  @IsString()
  text!: string;
}
