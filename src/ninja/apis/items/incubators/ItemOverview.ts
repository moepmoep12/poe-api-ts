import { Type } from "class-transformer";

import { ItemOverview } from "../../../shared/items";

import { Incubator } from "./Incubator";

export class IncubatorOverview extends ItemOverview<Incubator> {
  @Type(/* istanbul ignore next */ () => Incubator)
  entries!: Incubator[];
}
