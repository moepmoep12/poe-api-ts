import { Exclude } from "class-transformer";
import { Allow } from "class-validator";

import { FetchResult } from "../../../../shared/trade/query/fetch";
import { SearchResult } from "../../../../shared/trade/query/search";

import * as API from "../API";

/**
 * @hidden
 */
export class TradeSearchResult extends SearchResult {
  @Allow()
  @Exclude()
  private _offset = 0;

  public async getNextItems(count: number): Promise<FetchResult[] | null> {
    if (this._offset >= this.hashes.length) {
      return null;
    }

    const hashes = this.hashes.slice(this._offset, this._offset + count);
    this._offset += count;

    return await API.fetch(hashes);
  }
}
