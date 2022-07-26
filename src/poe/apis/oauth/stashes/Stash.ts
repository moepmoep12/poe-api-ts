import { Type } from "class-transformer";

import { Stash } from "../../../shared/stashes";
import { OAuthStashTab } from "./StashTab";

/**
 * @hidden
 */
export class OAuthStash extends Stash<OAuthStashTab> {
  @Type(/* istanbul ignore next */ () => OAuthStashTab)
  public override tabs!: OAuthStashTab[];
}
