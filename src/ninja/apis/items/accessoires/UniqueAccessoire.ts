import { IsEnum } from "class-validator";

import { Equippable } from "../../../shared/items";

import { AccessoireType } from "./models";

export class UniqueAccessoire extends Equippable<string, string, AccessoireType> {
  @IsEnum(AccessoireType)
  itemType!: AccessoireType;
}
