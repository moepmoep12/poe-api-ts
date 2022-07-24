import { Account } from "../../../shared/accounts";
import { Character, CharacterBase } from "../../../shared/characters";

import { Accounts } from "..";

import * as API from "./API";

/**
 * @hidden
 */
export class OAuthCharacterBase extends CharacterBase {
  public override async getAccount(): Promise<Account> {
    return await Accounts.getProfile();
  }
  public override async getCharacter(): Promise<Character> {
    return await API.getByName(this.name);
  }
}
