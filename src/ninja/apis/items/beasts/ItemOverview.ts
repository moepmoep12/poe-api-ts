import { Type } from "class-transformer";

import { ItemOverview } from "../../../shared/items";

import { Beast } from "./Beast";

export class BeastOverview extends ItemOverview<Beast> {
  @Type(/* istanbul ignore next */ () => Beast)
  entries!: Beast[];
}
