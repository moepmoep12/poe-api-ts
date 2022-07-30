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

  @Exclude()
  public set accountName /* istanbul ignore next */(name: string) {
    this._accountName = name;
  }

  /* istanbul ignore next */
  public async getCharacter(): Promise<Character> {
    return await Characters.getByName(this._accountName, this.name);
  }
}
