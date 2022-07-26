import { Type } from "class-transformer";

import { ItemOverview } from "../../../shared/items";

import { DeliriumOrb } from "./DeliriumOrb";

export class DeliriumOrbOverview extends ItemOverview<DeliriumOrb> {
  @Type(/* istanbul ignore next */ () => DeliriumOrb)
  entries!: DeliriumOrb[];
}
