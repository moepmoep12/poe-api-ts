import { Type } from "class-transformer";
import { IsArray, ValidateNested } from "class-validator";

import { Character } from "../../../shared/characters";
import { InventoryId, InventoryItem } from "../../../shared/item";
import { Passives } from "../../../shared/passives";

import { GetItemsResponse } from "./models/GetItemsResponse";
import { SessionCharacterBase } from "./CharacterBase";
import { SessionPassives } from "./Passives";
import * as API from "./API";

/**
 * @hidden
 */
export class SessionCharacter extends SessionCharacterBase implements Character {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(/* istanbul ignore next */ () => InventoryItem)
  equipment!: InventoryItem[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(/* istanbul ignore next */ () => InventoryItem)
  inventory!: InventoryItem[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(/* istanbul ignore next */ () => InventoryItem)
  jewels!: InventoryItem[];

  @ValidateNested()
  @Type(/* istanbul ignore next */ () => SessionPassives)
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
    const items = await API.getItems(this.name);
    const equipment: InventoryItem[] = [];
    const inventory: InventoryItem[] = [];

    for (const item of items) {
      if (item.inventoryId == InventoryId.MainInventory) {
        inventory.push(item);
      } else {
        equipment.push(item);
      }
    }

    /* istanbul ignore if */
    if (replace) {
      this.equipment = equipment;
      this.inventory = inventory;
    }
    return [inventory, equipment];
  }
  async updatePassives(
    replace?: boolean | undefined
  ): Promise<[passives: Passives, jewels: InventoryItem[]]> {
    const passives = await API.getPassives(this.name);

    /* istanbul ignore if */
    if (replace) {
      this.passives = passives;
      this.jewels = passives.jewels;
    }
    return [passives, passives.jewels];
  }
}
