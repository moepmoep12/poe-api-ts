import { Expose, Type } from "class-transformer";
import { IsArray, ValidateNested } from "class-validator";

import { Transformable } from "../../../common/classes";

import { HistoryPoint } from "../../shared";

export class History extends Transformable {
  @IsArray()
  @ValidateNested({ each: true })
  @Expose({ name: "payCurrencyGraphData" })
  @Type(/* istanbul ignore next */ () => HistoryPoint)
  /**
   * @overrides `payCurrencyGraphData`
   */
  sell!: HistoryPoint[];

  @IsArray()
  @ValidateNested({ each: true })
  @Expose({ name: "receiveCurrencyGraphData" })
  @Type(/* istanbul ignore next */ () => HistoryPoint)
  /**
   * @overrides `receiveCurrencyGraphData`
   */
  buy!: HistoryPoint[];
}
