import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";

import { Transformable } from "../../../../../common/classes";

import { Exchange } from "./Exchange";
import { ExchangeItem } from "./ExchangeItem";

export class ExchangeOffer extends Transformable {
  @ValidateNested()
  @Type(() => Exchange)
  exchange!: Exchange;

  @ValidateNested()
  @Type(() => ExchangeItem)
  item!: ExchangeItem;
}
