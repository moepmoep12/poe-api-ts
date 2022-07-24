import { Characters } from "..";
import { Profile } from "../../../shared/accounts";
import { CharacterBase } from "../../../shared/characters";

/**
 * @hidden
 */
export class SessionProfile extends Profile {
  public async getCharacters(): Promise<CharacterBase[]> {
    return await Characters.getAll();
  }
}
