import { Type } from "class-transformer";
import { IsArray, ValidateNested } from "class-validator";
import { StatGroup } from "../../../../shared/trade/stats";

/**
 * @hidden
 */
export class TradeStatsResponse {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(/* istanbul ignore next */ () => StatGroup)
  result!: StatGroup[];
}
