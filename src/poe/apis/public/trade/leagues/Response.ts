import { Type } from "class-transformer";
import { IsArray, ValidateNested } from "class-validator";

import { TradeLeague } from "../../../../shared/trade/leagues";

import { PublicTradeLeague } from "./TradeLeague";

/**
 * @hidden
 */
export class TradeLeagueResponse {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(/* istanbul ignore next */ () => PublicTradeLeague)
  result!: TradeLeague[];
}
