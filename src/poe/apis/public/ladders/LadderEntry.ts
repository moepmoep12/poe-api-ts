import { Type } from "class-transformer";

import { LadderCharacter, LadderEntry } from "../../../shared/ladders";

import { PublicLadderCharacter } from "./LadderCharacter";

/**
 * @hidden
 */
export class PublicLadderEntry extends LadderEntry {
  @Type(() => PublicLadderCharacter)
  override character!: LadderCharacter;
}
