import { Ladder } from "../../../shared/ladders";

import { OAuthLadderEntry } from "./LadderEntry";
import * as API from "./API";

/**
 * @hidden
 */
export class OAuthLadder extends Ladder {
  public async getNextEntries(append: boolean): Promise<OAuthLadderEntry[] | null> {
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
