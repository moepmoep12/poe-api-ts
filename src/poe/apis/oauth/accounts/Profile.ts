import { Profile } from "../../../shared/accounts";
import { CharacterBase } from "../../../shared/characters";

import { Characters } from "..";

/**
 * @hidden
 */
export class OAuthProfile extends Profile {
  public async getCharacters(): Promise<CharacterBase[]> {
    return await Characters.getAll();
  }
}
