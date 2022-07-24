import { IsInt, IsNotEmpty, IsString, Min } from "class-validator";

export class IncubatedItem {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @Min(0)
  @IsInt()
  // monster level required to progress
  level!: number;

  @Min(0)
  @IsInt()
  progress!: number;

  @Min(0)
  @IsInt()
  total!: number;
}
