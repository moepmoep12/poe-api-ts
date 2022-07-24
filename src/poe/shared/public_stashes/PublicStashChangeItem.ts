import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

import { Item } from "../item";

export class PublicStashChangeItem extends Item {
  @IsNotEmpty()
  @IsString()
  inventoryId!: string;

  @IsOptional()
  @IsBoolean()
  support?: boolean;
}
