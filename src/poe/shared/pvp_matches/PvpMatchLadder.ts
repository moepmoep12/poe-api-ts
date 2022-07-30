import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { Transformable } from "../../../common/classes/Transformable";

import { PvpLadder } from "./PvpLadder";
import { PvpMatch } from "./PvpMatch";

export abstract class PvpMatchLadder extends Transformable {
  @ValidateNested()
  @Type(/* istanbul ignore next */ () => PvpMatch)
  match!: PvpMatch;

  @ValidateNested()
  @Type(/* istanbul ignore next */ () => PvpLadder)
  ladder!: PvpLadder;
}
