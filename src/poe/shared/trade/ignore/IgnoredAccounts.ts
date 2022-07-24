import { Expose, Type } from "class-transformer";
import { IsArray, ValidateNested } from "class-validator";

import { Transformable } from "../../../../common/classes/Transformable";

import { IgnoredAccount } from "./models/IgnoredAccount";
import { Pagination } from "./models/Pagination";

export class IgnoredAccounts extends Transformable {
  @ValidateNested()
  @Type(() => Pagination)
  pagination!: Pagination;

  @IsArray()
  @ValidateNested({ each: true })
  @Expose({ name: "result" })
  @Type(() => IgnoredAccount)
  /**
   * @overrides `result`
   */
  accounts!: IgnoredAccount[];
}
