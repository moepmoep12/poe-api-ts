import { IsNotEmpty, IsString } from "class-validator";

import { Consumable } from "../../../shared/items";

export class DeliriumOrb extends Consumable {
  @IsString()
  @IsNotEmpty()
  baseType!: string;
}
