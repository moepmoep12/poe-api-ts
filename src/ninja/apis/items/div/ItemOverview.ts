import { Type } from "class-transformer";

import { ItemOverview } from "../../../shared/items";

import { DivinationCard } from "./DivinationCard";

export class DivinitationCardOverview extends ItemOverview<DivinationCard> {
  @Type(() => DivinationCard)
  entries!: DivinationCard[];
}
