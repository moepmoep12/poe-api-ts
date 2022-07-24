import { Type } from "class-transformer";

import { Account } from "../../../shared/accounts";
import { PointTransaction } from "../../../shared/guilds";

import { SessionProfile } from "../accounts/Profile";

/**
 * @hidden
 */
export class SessionPointTransaction extends PointTransaction {
  @Type(() => SessionProfile)
  override account!: Account;
}
