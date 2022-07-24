import { IsInt, Max, Min } from "class-validator";

/**
 * @hidden
 */
export class Colour {
  @Min(0)
  @Max(255)
  @IsInt()
  r!: number;

  @IsInt()
  @Min(0)
  @Max(255)
  g!: number;

  @IsInt()
  @Min(0)
  @Max(255)
  b!: number;
}
