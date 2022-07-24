import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { Transformable } from "../../../common/classes/Transformable";

import { PvpLadder } from "./PvpLadder";
import { PvpMatch } from "./PvpMatch";

export abstract class PvpMatchLadder extends Transformable {
  @ValidateNested()
  @Type(() => PvpMatch)
  match!: PvpMatch;

  @ValidateNested()
  @Type(() => PvpLadder)
  ladder!: PvpLadder;
}
