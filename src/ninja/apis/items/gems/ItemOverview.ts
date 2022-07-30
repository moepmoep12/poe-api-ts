import { Type } from "class-transformer";

import { ItemOverview } from "../../../shared/items";

import { SkillGem } from "./SkillGem";

export class SkillGemOverview extends ItemOverview<SkillGem> {
  @Type(/* istanbul ignore next */ () => SkillGem)
  entries!: SkillGem[];
}
