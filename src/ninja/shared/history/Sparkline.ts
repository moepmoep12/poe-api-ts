import { IsArray, IsNumber } from "class-validator";

export class Sparkline {
  @IsArray()
  data!: Array<number | null>;

  @IsNumber()
  totalChange!: number;
}
