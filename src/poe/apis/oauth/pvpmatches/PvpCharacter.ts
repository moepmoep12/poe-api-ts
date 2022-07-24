import { Account } from "../../../shared/accounts";
import { Character } from "../../../shared/characters";
import { PvpCharacter } from "../../../shared/pvp_matches/PvpCharacter";

import { Accounts, Characters } from "..";

/**
 * @hidden
 */
export class OAuthPvpCharacter extends PvpCharacter {
  public async getAccount(): Promise<Account> {
    return await Accounts.getProfile();
  }
  public async getCharacter(): Promise<Character> {
    return await Characters.getByName(this.name);
  }
}
