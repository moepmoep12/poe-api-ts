import { IsEnum, IsInt, IsOptional, Min } from "class-validator";

import { Equippable } from "../../../shared/items";

import { ArmourType } from "./models";

export class UniqueArmour extends Equippable<string, string, ArmourType> {
  @IsEnum(ArmourType)
  itemType!: ArmourType;

  @IsOptional()
  @IsInt()
  @Min(0)
  links?: number;
}
