import { Account } from "../../../shared/accounts";
import { Character } from "../../../shared/characters";
import { LadderCharacter } from "../../../shared/ladders";

import { Accounts, Characters } from "..";

/**
 * @hidden
 */
export class OAuthLadderCharacter extends LadderCharacter {
  public async getAccount(): Promise<Account> {
    return await Accounts.getProfile();
  }
  public async getCharacter(): Promise<Character> {
    return await Characters.getByName(this.name);
  }
}
