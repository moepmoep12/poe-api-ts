import { Exclude, Type } from "class-transformer";

import { Stash } from "../../../shared/stashes";
import { Item } from "../../../shared/item";

import { SessionStashTab } from "./StashTab";

/**
 * @hidden
 */
export class SessionStash extends Stash<SessionStashTab> {
  @Type(() => SessionStashTab)
  public override tabs!: SessionStashTab[];

  @Exclude()
  private items?: Item[];
}
