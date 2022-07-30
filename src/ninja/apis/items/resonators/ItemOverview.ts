import { Type } from "class-transformer";

import { ItemOverview } from "../../../shared/items";

import { Resonator } from "./Resonator";

export class ResonatorOverview extends ItemOverview<Resonator> {
  @Type(/* istanbul ignore next */ () => Resonator)
  entries!: Resonator[];
}
