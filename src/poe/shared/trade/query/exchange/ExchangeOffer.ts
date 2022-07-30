import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";

import { Transformable } from "../../../../../common/classes";

import { Exchange } from "./Exchange";
import { ExchangeItem } from "./ExchangeItem";

export class ExchangeOffer extends Transformable {
  @ValidateNested()
  @Type(/* istanbul ignore next */ () => Exchange)
  exchange!: Exchange;

  @ValidateNested()
  @Type(/* istanbul ignore next */ () => ExchangeItem)
  item!: ExchangeItem;
}
