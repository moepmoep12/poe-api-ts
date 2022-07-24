import { Characters } from "..";

import { CharacterBase } from "../../../shared/characters";

import { LadderAccount } from "../../../shared/ladders";

export class SessionLadderAccount extends LadderAccount {
  public async getCharacters(): Promise<CharacterBase[]> {
    return await Characters.getAll();
  }
}
