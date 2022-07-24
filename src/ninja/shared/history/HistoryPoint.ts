import { IsInt, IsNumber, Min } from "class-validator";

import { Transformable } from "../../../common/classes";

export class HistoryPoint extends Transformable {
  @IsInt()
  @Min(0)
  count!: number;

  @IsNumber()
  @Min(0)
  value!: number;

  @IsInt()
  @Min(0)
  daysAgo!: number;
}
