import { Type } from "class-transformer";

import { ItemOverview } from "../../../shared/items";

import { Invitation } from "./Invitation";

export class InvitationOverview extends ItemOverview<Invitation> {
  @Type(() => Invitation)
  entries!: Invitation[];
}
