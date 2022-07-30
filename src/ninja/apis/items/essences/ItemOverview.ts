import { Type } from "class-transformer";

import { ItemOverview } from "../../../shared/items";

import { Essence } from "./Essence";

export class EssenceOverview extends ItemOverview<Essence> {
  @Type(/* istanbul ignore next */ () => Essence)
  entries!: Essence[];
}
