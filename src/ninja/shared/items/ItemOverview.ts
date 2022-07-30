import { Expose, Type } from "class-transformer";
import { IsArray, ValidateNested } from "class-validator";

import { Language } from "../../shared";

import { ItemBase } from "./ItemBase";

export class ItemOverview<T extends ItemBase> {
  @IsArray()
  @ValidateNested({ each: true })
  @Expose({ name: "lines" })
  entries!: T[];

  @ValidateNested()
  @Type(/* istanbul ignore next */ () => Language)
  language!: Language;
}
