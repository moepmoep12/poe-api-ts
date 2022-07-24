import { IsEnum } from "class-validator";

import { Equippable } from "../../../shared/items";

import { JewelBaseType, JewelType } from "./models";

export class UniqueJewel extends Equippable<JewelBaseType, string, JewelType> {
  @IsEnum(JewelBaseType)
  override baseType!: JewelBaseType;

  @IsEnum(JewelType)
  itemType?: JewelType;
}
