import { Type } from "class-transformer";
import { IsArray, ValidateNested } from "class-validator";

import { FetchResult } from "../../../../shared/trade/query/fetch";

/**
 * @hidden
 */
export class TradeFetchResponse {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(/* istanbul ignore next */ () => FetchResult)
  result!: FetchResult[];
}
