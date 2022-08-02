import { Ladder } from "../../../shared/ladders";
import { League } from "../../../shared/leagues";

import { PublicLadderOptions } from "../ladders";
import { Ladders } from "../";

/**
 * @hidden
 */
export class PublicLeague extends League {
  public async getLadder(store: boolean, options?: PublicLadderOptions): Promise<Ladder> {
    const ladder = await Ladders.get(this.id, options);
    /* istanbul ignore else */
    if (store) this.ladder = ladder;
    return ladder;
  }
}
