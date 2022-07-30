import { Expose, Type } from "class-transformer";

import { InventoryItem } from "../../../shared/item";
import { Passives } from "../../../shared/passives";

/**
 * @hidden
 */
export class SessionPassives extends Passives {
  @Expose({ name: "items" })
  @Type(/* istanbul ignore next */ () => InventoryItem)
  override jewels!: InventoryItem[];
}
