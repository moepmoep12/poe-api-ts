import { Type } from "class-transformer";

import { ItemOverview } from "../../../shared/items";

import { ClusterJewel } from "./ClusterJewel";

export class ClusterJewelOverview extends ItemOverview<ClusterJewel> {
  @Type(/* istanbul ignore next */ () => ClusterJewel)
  entries!: ClusterJewel[];
}
