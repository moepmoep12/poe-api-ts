import { Type } from "class-transformer";

import { PointTransaction, PointTransactions } from "../../../shared/guilds";

import { SessionPointTransaction } from "./PointTransaction";

/**
 * @hidden
 */
export class SessionPointTransactions extends PointTransactions {
  @Type(() => SessionPointTransaction)
  override entries!: PointTransaction[];
}
