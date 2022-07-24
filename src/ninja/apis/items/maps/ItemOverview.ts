import { Type } from "class-transformer";

import { ItemOverview } from "../../../shared/items";

import { Map } from "./Map";

export class MapOverview extends ItemOverview<Map> {
  @Type(() => Map)
  entries!: Map[];
}
