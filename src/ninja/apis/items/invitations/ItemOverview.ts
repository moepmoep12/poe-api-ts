import { Type } from "class-transformer";

import { ItemOverview } from "../../../shared/items";

import { Invitation } from "./Invitation";

export class InvitationOverview extends ItemOverview<Invitation> {
  @Type(/* istanbul ignore next */ () => Invitation)
  entries!: Invitation[];
}
