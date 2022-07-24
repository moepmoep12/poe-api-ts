import { IsEnum, IsInt, Min } from "class-validator";

import { Item } from "./Item";
import { InventoryId } from "./models";

export class InventoryItem extends Item {
  @IsEnum(InventoryId)
  override inventoryId!: InventoryId;

  @IsInt()
  override x!: number;

  @Min(0)
  @IsInt()
  override y!: number;
}
