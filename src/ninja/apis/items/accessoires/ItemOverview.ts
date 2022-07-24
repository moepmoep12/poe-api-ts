import { Type } from "class-transformer";

import { ItemOverview } from "../../../shared/items";

import { UniqueAccessoire } from "./UniqueAccessoire";

export class UniqueAccessoireOverview extends ItemOverview<UniqueAccessoire> {
  @Type(() => UniqueAccessoire)
  entries!: UniqueAccessoire[];
}
