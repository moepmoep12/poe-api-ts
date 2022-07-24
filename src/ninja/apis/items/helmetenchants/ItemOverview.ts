import { Type } from "class-transformer";

import { ItemOverview } from "../../../shared/items";

import { HelmetEnchant } from "./HelmetEnchant";

export class HelmetEnchantOverview extends ItemOverview<HelmetEnchant> {
  @Type(() => HelmetEnchant)
  entries!: HelmetEnchant[];
}
