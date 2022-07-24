import { IsInt, Min } from "class-validator";

export class CompletedChallenges {
  @IsInt()
  @Min(0)
  total!: number;
}
