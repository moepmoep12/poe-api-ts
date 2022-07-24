import { Exclude } from "class-transformer";
import { Allow } from "class-validator";

import { Character } from "../../../shared/characters";
import { LadderCharacter } from "../../../shared/ladders";

import * as Characters from "../characters/API";

/**
 * @hidden
 */
export class PublicLadderCharacter extends LadderCharacter {
  @Allow()
  @Exclude()
  private _accountName!: string;

  public set accountName(name: string) {
    this._accountName = name;
  }

  public async getCharacter(): Promise<Character> {
    return await Characters.getByName(this._accountName, this.name);
  }
}
