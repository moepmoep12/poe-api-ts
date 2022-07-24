import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { Transformable } from "../../../../common/classes";
import { TradeItem } from "./TradeItem";

export class TradeItemGroup extends Transformable {
  @IsNotEmpty()
  @IsString()
  id!: string;

  @IsString()
  label!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TradeItem)
  entries!: TradeItem[];
}
