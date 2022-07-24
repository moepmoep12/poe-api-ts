import { Type } from "class-transformer";

import { Ladder, LadderEntry } from "../../../shared/ladders";

import * as API from "./API";
import { PublicLadderEntry } from "./LadderEntry";

/**
 * @hidden
 */
export class PublicLadder extends Ladder {
  @Type(() => PublicLadderEntry)
  public entries!: LadderEntry[];

  public async getNextEntries(append: boolean): Promise<LadderEntry[] | null> {
    if (this.ladderOptions.offset == null || this.ladderOptions.limit == null) {
      return null;
    }

    const nextOffset = this.ladderOptions.offset + this.ladderOptions.limit;
    if (nextOffset >= this.total) {
      return null;
    }

    // Make sure limit + offset isn't higher than total since that's considered an invalid query
    if (nextOffset + this.ladderOptions.limit >= this.total) {
      this.options.limit = this.total - nextOffset;
    }

    this.ladderOptions.offset = nextOffset;

    const ladder = await API.get(this.leagueId, this.ladderOptions);

    if (append) {
      this.entries.push(...ladder.entries);
    }

    return ladder.entries;
  }
}
