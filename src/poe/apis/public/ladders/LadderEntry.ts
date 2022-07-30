import { Type } from "class-transformer";

import { LadderCharacter, LadderEntry } from "../../../shared/ladders";

import { PublicLadderCharacter } from "./LadderCharacter";

/**
 * @hidden
 */
export class PublicLadderEntry extends LadderEntry {
  @Type(/* istanbul ignore next */ () => PublicLadderCharacter)
  override character!: LadderCharacter;
}
