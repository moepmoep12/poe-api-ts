import { IsString } from "class-validator";

import { Consumable } from "../../../shared/items";

export class DivinationCard extends Consumable {
  @IsString()
  artFilename!: string;
}
