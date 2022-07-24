import { Type } from "class-transformer";

import { ItemOverview } from "../../../shared/items";

import { UniqueWeapon } from "./UniqueWeapon";

export class UniqueWeaponOverview extends ItemOverview<UniqueWeapon> {
  @Type(() => UniqueWeapon)
  entries!: UniqueWeapon[];
}
