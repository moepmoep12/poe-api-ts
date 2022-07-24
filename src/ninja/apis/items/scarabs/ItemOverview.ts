import { Type } from "class-transformer";

import { ItemOverview } from "../../../shared/items";

import { Scarab } from "./Scarab";

export class ScarabOverview extends ItemOverview<Scarab> {
  @Type(() => Scarab)
  entries!: Scarab[];
}
