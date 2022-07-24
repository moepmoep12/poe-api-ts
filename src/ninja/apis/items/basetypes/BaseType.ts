import { IsEnum } from "class-validator";

import { Equippable } from "../../../shared/items";

import { ItemType, Variant } from "./models";

export class BaseType extends Equippable<string, Variant, ItemType> {
  @IsEnum(ItemType)
  itemType!: ItemType;

  @IsEnum(Variant)
  override variant?: Variant;
}
