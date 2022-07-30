import { Type } from "class-transformer";
import { IsArray, ValidateNested } from "class-validator";

import { Listing } from "../listing";
import { ExchangeOffer } from "./ExchangeOffer";

export class ExchangeListing extends Listing {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(/* istanbul ignore next */ () => ExchangeOffer)
  offers!: Array<ExchangeOffer>;
}
