import { Type } from "class-transformer";
import { IsArray, IsEnum, ValidateNested } from "class-validator";

import { Equippable, TradeInfo } from "../../../shared/items";

import { ClusterBaseType, JewelType, Variant } from "./models";

export class ClusterJewel extends Equippable<ClusterBaseType, Variant, JewelType> {
  @IsEnum(ClusterBaseType)
  override baseType!: ClusterBaseType;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(/* istanbul ignore next */ () => TradeInfo)
  tradeInfo!: TradeInfo[];

  @IsEnum(Variant)
  override variant?: Variant;

  @IsEnum(JewelType)
  itemType?: JewelType;
}
