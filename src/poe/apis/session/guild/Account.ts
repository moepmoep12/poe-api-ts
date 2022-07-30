import { Characters } from "..";

import { CharacterBase } from "../../../shared/characters";

import { LadderAccount } from "../../../shared/ladders";

/**
 * @hidden
 */
export class SessionLadderAccount extends LadderAccount {
  /* istanbul ignore next */
  public async getCharacters(): Promise<CharacterBase[]> {
    return await Characters.getAll();
  }
}
