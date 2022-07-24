import { Type } from "class-transformer";

import { ItemOverview } from "../../../shared/items";

import { Vial } from "./Vial";

export class VialOverview extends ItemOverview<Vial> {
  @Type(() => Vial)
  entries!: Vial[];
}
