import { Type } from "class-transformer";

import { ItemOverview } from "../../../shared/items";

import { UniqueFlask } from "./UniqueFlask";

export class UniqueFlaskOverview extends ItemOverview<UniqueFlask> {
  @Type(/* istanbul ignore next */ () => UniqueFlask)
  entries!: UniqueFlask[];
}
