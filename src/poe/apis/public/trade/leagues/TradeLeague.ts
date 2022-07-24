import * as API from "../../leagues/API";

import { League } from "../../../../shared/leagues";
import { TradeLeague } from "../../../../shared/trade/leagues";

export class PublicTradeLeague extends TradeLeague {
  public async getLeague(): Promise<League> {
    return await API.getById(this.id);
  }
}
