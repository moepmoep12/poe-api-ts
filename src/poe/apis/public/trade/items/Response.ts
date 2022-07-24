import { Type } from "class-transformer";
import { IsArray, ValidateNested } from "class-validator";

import { TradeItemGroup } from "../../../../shared/trade/items";

/**
 * @hidden
 */
export class TradeItemsResponse {
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => TradeItemGroup)
  result!: TradeItemGroup[];
}
