import { IsInt, IsNotEmpty, IsString, Min } from "class-validator";

export abstract class Trophy {
  @IsNotEmpty()
  @IsString()
  description!: string;

  @Min(0)
  @IsInt()
  points!: number;
}
