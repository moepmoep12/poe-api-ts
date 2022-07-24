import { Expose, Type } from "class-transformer";
import { IsArray, ValidateNested } from "class-validator";

import { Transformable } from "../../../common/classes";

import { Language } from "../../shared";

import { Currency } from "./models/Currency";
import { CurrencyDetail } from "./models/CurrencyDetail";

export class CurrencyOverview extends Transformable {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Currency)
  @Expose({ name: "lines" })
  entries!: Currency[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CurrencyDetail)
  currencyDetails!: CurrencyDetail[];

  @ValidateNested()
  @Type(() => Language)
  language!: Language;
}
