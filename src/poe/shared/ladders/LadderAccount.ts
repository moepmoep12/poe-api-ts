import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";

import { Account } from "../accounts";

import { CompletedChallenges } from "./models/CompletedChallenges";

export abstract class LadderAccount extends Account {
  @ValidateNested()
  @Type(() => CompletedChallenges)
  challenges?: CompletedChallenges;
}
