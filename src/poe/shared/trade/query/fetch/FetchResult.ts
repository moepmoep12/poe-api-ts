import { Type } from "class-transformer";
import { IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { Item } from "../../../item";

import { Transformable } from "../../../../../common/classes";

import { FetchListing } from "./FetchListing";

export class FetchResult extends Transformable {
  @IsNotEmpty()
  @IsString()
  id!: string;

  @ValidateNested()
  @Type(/* istanbul ignore next */ () => Item)
  item!: Item;

  @ValidateNested()
  @Type(/* istanbul ignore next */ () => FetchListing)
  listing!: FetchListing;
}
