import { IsEnum, IsInt, IsOptional, Min } from "class-validator";

import { Equippable } from "../../../shared/items";

import { WeaponType } from "./models";

export class UniqueWeapon extends Equippable<string, string, WeaponType> {
  @IsEnum(WeaponType)
  itemType!: WeaponType;

  @IsOptional()
  @IsInt()
  @Min(0)
  links?: number;
}
