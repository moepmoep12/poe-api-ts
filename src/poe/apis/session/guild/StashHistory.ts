import { Type } from "class-transformer";

import { StashAction, StashHistory } from "../../../shared/guilds";
import { SessionStashAction } from "./StashAction";

/**
 * @hidden
 */
export class SessionStashHistory extends StashHistory {
  @Type(/* istanbul ignore next */ () => SessionStashAction)
  override entries!: StashAction[];
}
