import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString, Min } from "class-validator";

export abstract class MasteryEffect {
  @Min(0)
  @IsInt()
  // effect hash
  effect!: number;

  @IsArray()
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  // stat descriptions
  stats!: string[];

  @IsOptional()
  @IsArray()
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  reminderText?: string[];
}
