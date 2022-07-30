import { Type } from "class-transformer";
import { Account } from "../../../shared/accounts";

import { StashAction } from "../../../shared/guilds";

import { SessionLadderAccount } from "./Account";

/**
 * @hidden
 */
export class SessionStashAction extends StashAction {
  @Type(/* istanbul ignore next */ () => SessionLadderAccount)
  override account!: Account;
}
