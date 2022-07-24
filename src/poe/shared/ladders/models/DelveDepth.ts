import { IsInt, Min } from "class-validator";

export class DelveDepth {
  @Min(0)
  @IsInt()
  default!: number;

  @Min(0)
  @IsInt()
  solo!: number;
}
