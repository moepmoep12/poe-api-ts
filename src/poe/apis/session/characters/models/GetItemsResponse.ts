import { Type } from "class-transformer";
import { IsArray, ValidateNested } from "class-validator";
import { Characters, Item } from "../../../../shared";

/**
 * @hidden
 * Response type of the endpoint `https://www.pathofexile.com/character-window/get-items`
 */
export class GetItemsResponse {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(/* istanbul ignore next */ () => Item.InventoryItem)
  items!: Item.InventoryItem[];

  @ValidateNested()
  @Type(/* istanbul ignore next */ () => Characters.CharacterBase)
  character!: Characters.CharacterBase;
}
