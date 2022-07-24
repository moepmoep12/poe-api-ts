import { IsInt, Min } from "class-validator";

import { ItemBase } from "./ItemBase";

export class Consumable extends ItemBase {
  @IsInt()
  @Min(1)
  stackSize = 1;
}
