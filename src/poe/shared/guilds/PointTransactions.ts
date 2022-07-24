import { Type } from "class-transformer";
import { IsInt, ValidateNested, IsArray, Min } from "class-validator";

import { Transformable } from "../../../common/classes/Transformable";

import { PointTransaction } from "./PointTransaction";

/**
 * Collection of transactions of microtransaction-points.
 */
export class PointTransactions extends Transformable {
  @Min(0)
  @IsInt()
  total!: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PointTransaction)
  entries!: PointTransaction[];
}
