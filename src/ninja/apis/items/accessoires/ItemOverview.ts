import { Type } from "class-transformer";

import { ItemOverview } from "../../../shared/items";

import { UniqueAccessoire } from "./UniqueAccessoire";

export class UniqueAccessoireOverview extends ItemOverview<UniqueAccessoire> {
  @Type(/* istanbul ignore next */ () => UniqueAccessoire)
  entries!: UniqueAccessoire[];
}
