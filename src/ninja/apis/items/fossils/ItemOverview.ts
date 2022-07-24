import { Type } from "class-transformer";

import { ItemOverview } from "../../../shared/items";

import { Fossil } from "./Fossil";

export class FossilOverview extends ItemOverview<Fossil> {
  @Type(() => Fossil)
  entries!: Fossil[];
}
