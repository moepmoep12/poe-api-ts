import { Ladder } from "../../../shared/ladders";

import { OAuthLadderEntry } from "./LadderEntry";
import * as API from "./API";

/**
 * @hidden
 */
export class OAuthLadder extends Ladder {
  public async getNextEntries(append: boolean): Promise<OAuthLadderEntry[] | null> {
    if (
      typeof this.ladderOptions.offset != "number" ||
      this.ladderOptions.offset < 0 ||
      typeof this.ladderOptions.limit != "number" ||
      this.ladderOptions.limit < 0
    ) {
      return null;
    }

    const nextOffset = this.ladderOptions.offset + this.ladderOptions.limit;
    if (nextOffset >= this.total) {
      return null;
    }

    // Make sure limit + offset isn't higher than total since that's considered an invalid query
    /* istanbul ignore if */
    if (nextOffset + this.ladderOptions.limit >= this.total) {
      this.options.limit = this.total - nextOffset;
    }

    this.ladderOptions.offset = nextOffset;

    const ladder = await API.get(this.leagueId, this.ladderOptions);

    /* istanbul ignore next */
    if (append) {
      this.entries.push(...ladder.entries);
      this.total += ladder.entries.length;
    }

    return ladder.entries;
  }
}
