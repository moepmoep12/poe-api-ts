import { InventoryItem } from "../item/InventoryItem";
import { Passives } from "../passives/Passives";
import { CharacterBase } from "./CharacterBase";

export interface Character extends CharacterBase {
  equipment: InventoryItem[];
  inventory: InventoryItem[];
  jewels: InventoryItem[];
  passives: Passives;

  /**
   * Fetches the current inventory of the character.
   *
   * @param replace If set, current inventory & equipment is replaced
   * @throws [[APIError]]
   */
  updateInventory(
    replace?: boolean
  ): Promise<[inventory: InventoryItem[], equipment: InventoryItem[]]>;

  /**
   * Fetches the current passives & jewels of the character.
   *
   * @param replace If set, current passives are replaced
   * @throws [[APIError]]
   */
  updatePassives(replace?: boolean): Promise<[passives: Passives, jewels: InventoryItem[]]>;
}
