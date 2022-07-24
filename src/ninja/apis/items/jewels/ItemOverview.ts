import { Type } from "class-transformer";

import { ItemOverview } from "../../../shared/items";

import { UniqueJewel } from "./UniqueJewel";

export class UniqueJewelOverview extends ItemOverview<UniqueJewel> {
  @Type(() => UniqueJewel)
  entries!: UniqueJewel[];
}
