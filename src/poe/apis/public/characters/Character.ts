import { Type } from "class-transformer";
import { IsArray, ValidateNested } from "class-validator";

import { Character } from "../../../shared/characters";
import { InventoryId, InventoryItem } from "../../../shared/item";
import { Passives } from "../../../shared/passives";

import { GetItemsResponse } from "./models/GetItemsResponse";
import { PublicCharacterBase } from "./CharacterBase";
import { PublicPassives } from "./Passives";
import * as API from "./API";

/**
 * @hidden
 */
export class PublicCharacter extends PublicCharacterBase implements Character {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InventoryItem)
  equipment!: InventoryItem[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InventoryItem)
  inventory!: InventoryItem[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InventoryItem)
  jewels!: InventoryItem[];

  @ValidateNested()
  @Type(() => PublicPassives)
  passives!: Passives;

  constructor(items: GetItemsResponse, passives: Passives) {
    super();

    this.passives = passives;
    this.jewels = passives.jewels;

    Object.assign(this, items.character);
    this.equipment = [];
    this.inventory = [];

    for (const item of items.items) {
      if (item.inventoryId == InventoryId.MainInventory) {
        this.inventory.push(item);
      } else {
        this.equipment.push(item);
      }
    }
  }

  async updateInventory(
    replace?: boolean | undefined
  ): Promise<[inventory: InventoryItem[], equipment: InventoryItem[]]> {
    const items = await API.getItems(this._accountName, this.name);
    const equipment: InventoryItem[] = [];
    const inventory: InventoryItem[] = [];

    for (const item of items) {
      if (item.inventoryId == InventoryId.MainInventory) {
        inventory.push(item);
      } else {
        equipment.push(item);
      }
    }

    if (replace) {
      this.equipment = equipment;
      this.inventory = inventory;
    }
    return [inventory, equipment];
  }
  async updatePassives(
    replace?: boolean | undefined
  ): Promise<[passives: Passives, jewels: InventoryItem[]]> {
    const passives = await API.getPassives(this._accountName, this.name);
    if (replace) {
      this.passives = passives;
      this.jewels = passives.jewels;
    }
    return [passives, passives.jewels];
  }
}
