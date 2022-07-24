import { Type } from "class-transformer";
import { IsEmpty, IsNotEmpty, IsString, ValidateNested } from "class-validator";

import { Transformable } from "../../../../../common/classes";

import { ExchangeListing } from "./ExchangeListing";

export class ExchangeResult extends Transformable {
  @IsNotEmpty()
  @IsString()
  id!: string;

  @IsEmpty()
  item!: null;

  @ValidateNested()
  @Type(() => ExchangeListing)
  listing!: ExchangeListing;
}
