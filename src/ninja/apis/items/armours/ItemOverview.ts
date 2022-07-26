import { Type } from "class-transformer";

import { ItemOverview } from "../../../shared/items";

import { UniqueArmour } from "./UniqueArmour";

export class UniqueArmourOverview extends ItemOverview<UniqueArmour> {
  @Type(/* istanbul ignore next */ () => UniqueArmour)
  entries!: UniqueArmour[];
}
