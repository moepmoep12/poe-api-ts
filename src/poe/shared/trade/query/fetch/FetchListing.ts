import { Type } from "class-transformer";
import { IsString, ValidateNested } from "class-validator";

import { ListedPrice, ListedStash } from "../listing";
import { Listing } from "../listing/Listing";

export class FetchListing extends Listing {
  @ValidateNested()
  @Type(() => ListedStash)
  stash!: ListedStash;

  @ValidateNested()
  @Type(() => ListedPrice)
  price!: ListedPrice;

  @IsString()
  method!: string;
}
