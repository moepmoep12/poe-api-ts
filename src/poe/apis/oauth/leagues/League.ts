import { League } from "../../../shared/leagues";
import { Ladder } from "../../../shared/ladders";

import { OAuthLadderOptions } from "../ladders";
import { Ladders } from "..";

/**
 * @hidden
 */
export class OAuthLeague extends League {
  public async getLadder(store: boolean, options?: OAuthLadderOptions): Promise<Ladder> {
    const ladder = await Ladders.get(this.id, options);
    if (store) this.ladder = ladder;
    return ladder;
  }
}
