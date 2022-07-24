import { Type } from "class-transformer";

import { ItemOverview } from "../../../shared/items";

import { BaseType } from "./BaseType";

export class BaseTypeOverview extends ItemOverview<BaseType> {
  @Type(() => BaseType)
  entries!: BaseType[];
}
