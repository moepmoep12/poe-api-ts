import { Type } from "class-transformer";

import { Stash } from "../../../shared/stashes";
import { SessionStashTab } from "./StashTab";

/**
 * @hidden
 */
export class SessionStash extends Stash<SessionStashTab> {
  @Type(() => SessionStashTab)
  public override tabs!: SessionStashTab[];
}
