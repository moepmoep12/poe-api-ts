import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";

import { LadderCharacter, LadderEntry } from "../../../shared/ladders";

import { OAuthLadderCharacter } from "./LadderCharacter";

/**
 * @hidden
 */
export class OAuthLadderEntry extends LadderEntry {
  @ValidateNested()
  @Type(/* istanbul ignore next */ () => OAuthLadderCharacter)
  override character!: LadderCharacter;
}
