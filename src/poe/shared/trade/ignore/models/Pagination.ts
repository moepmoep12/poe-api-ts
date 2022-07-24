import { IsInt, IsPositive, Min } from "class-validator";

export abstract class Pagination {
  @Min(0)
  @IsInt()
  page!: number;

  @IsPositive()
  @IsInt()
  per_page!: number;

  @Min(0)
  @IsInt()
  total!: number;
}
