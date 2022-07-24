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
  @Type(() => Item.InventoryItem)
  items!: Item.InventoryItem[];

  @ValidateNested()
  @Type(() => Characters.CharacterBase)
  character!: Characters.CharacterBase;
}
