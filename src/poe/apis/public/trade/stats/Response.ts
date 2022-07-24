import { Type } from "class-transformer";
import { IsArray, ValidateNested } from "class-validator";
import { StatGroup } from "../../../../shared/trade/stats";

/**
 * @hidden
 */
export class TradeStatsResponse {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StatGroup)
  result!: StatGroup[];
}
