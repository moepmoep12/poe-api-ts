import { Type } from "class-transformer";

import { ItemOverview } from "../../../shared/items";

import { Sentinel } from "./Sentinel";

export class SentinelOverview extends ItemOverview<Sentinel> {
  @Type(() => Sentinel)
  entries!: Sentinel[];
}
