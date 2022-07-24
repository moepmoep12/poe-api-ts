import { IsEnum } from "class-validator";

import { Consumable } from "../../../shared/items";
import { BlightOil } from "./models";

export class Oil extends Consumable {
  @IsEnum(BlightOil)
  baseType!: BlightOil;
}
