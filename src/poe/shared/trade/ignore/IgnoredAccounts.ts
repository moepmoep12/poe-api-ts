import { Expose, Type } from "class-transformer";
import { IsArray, ValidateNested } from "class-validator";

import { Transformable } from "../../../../common/classes/Transformable";

import { IgnoredAccount } from "./models/IgnoredAccount";
import { Pagination } from "./models/Pagination";

export class IgnoredAccounts extends Transformable {
  @ValidateNested()
  @Type(/* istanbul ignore next */ () => Pagination)
  pagination!: Pagination;

  @IsArray()
  @ValidateNested({ each: true })
  @Expose({ name: "result" })
  @Type(/* istanbul ignore next */ () => IgnoredAccount)
  /**
   * @overrides `result`
   */
  accounts!: IgnoredAccount[];
}
