import { Type } from "class-transformer";

import { ItemOverview } from "../../../shared/items";

import { Oil } from "./Oil";

export class OilOverview extends ItemOverview<Oil> {
  @Type(/* istanbul ignore next */ () => Oil)
  entries!: Oil[];
}
