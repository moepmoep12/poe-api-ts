import { Expose, Type } from "class-transformer";
import { IsArray, ValidateNested } from "class-validator";

import { Transformable } from "../../../common/classes";

import { HistoryPoint } from "../../shared";

export class History extends Transformable {
  @IsArray()
  @ValidateNested({ each: true })
  @Expose({ name: "payCurrencyGraphData" })
  @Type(() => HistoryPoint)
  /**
   * @overrides `payCurrencyGraphData`
   */
  sell!: HistoryPoint[];

  @IsArray()
  @ValidateNested({ each: true })
  @Expose({ name: "receiveCurrencyGraphData" })
  @Type(() => HistoryPoint)
  /**
   * @overrides `receiveCurrencyGraphData`
   */
  buy!: HistoryPoint[];
}
