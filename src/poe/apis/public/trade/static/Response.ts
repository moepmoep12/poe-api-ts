import { Type } from "class-transformer";
import { IsArray, ValidateNested } from "class-validator";
import { Group } from "../../../../shared/trade/static";

/**
 * @hidden
 */
export class TradeStaticResponse {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Group)
  result!: Group[];
}
