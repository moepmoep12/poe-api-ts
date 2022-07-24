import { InventoryItem } from "../../../shared/item";
import { Passives } from "../../../shared/passives";
import { Character } from "../../../shared/characters";

import { OAuthCharacterBase } from "./CharacterBase";
import * as API from "./API";
import { Type } from "class-transformer";
import { IsArray, ValidateNested } from "class-validator";

/**
 * @hidden
 */
export class OAuthCharacter extends OAuthCharacterBase implements Character {
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
  @Type(() => Passives)
  passives!: Passives;

  public async updateInventory(
    replace?: boolean | undefined
  ): Promise<[inventory: InventoryItem[], equipment: InventoryItem[]]> {
    const char = await API.getByName(this.name);
    if (replace) {
      this.equipment = char.equipment;
      this.inventory = char.inventory;
    }
    return [char.inventory, char.equipment];
  }

  public async updatePassives(
    replace?: boolean
  ): Promise<[passives: Passives, jewels: InventoryItem[]]> {
    const char = await API.getByName(this.name);
    if (replace) {
      this.passives = char.passives;
      this.jewels = char.jewels;
    }

    return [char.passives, char.jewels];
  }
}
