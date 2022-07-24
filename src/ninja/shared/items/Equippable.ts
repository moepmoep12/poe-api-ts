import { IsNotEmpty, IsOptional, IsString } from "class-validator";

import { ItemBase } from "./ItemBase";

export class Equippable<T extends string, V extends string, U extends string> extends ItemBase {
  @IsString()
  @IsNotEmpty()
  baseType!: T;

  @IsOptional()
  @IsString()
  variant?: V;

  @IsOptional()
  itemType?: U;
}
