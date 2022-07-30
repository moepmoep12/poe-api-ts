import { Type } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";

import { ItemBase, TradeInfo } from "../../../shared/items";

export class HelmetEnchant extends ItemBase {
  @IsString()
  @IsNotEmpty()
  variant!: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(/* istanbul ignore next */ () => TradeInfo)
  tradeInfo?: TradeInfo[];
}
