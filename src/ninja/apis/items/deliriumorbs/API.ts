import { HistoryPoint, LanguageCode } from "../../../shared";

import { getHistoryGeneric, getOverviewGeneric } from "../API";
import { ItemOption } from "../models/ItemOption";

import { DeliriumOrbOverview } from "./ItemOverview";

/**
 * @endpoint https://poe.ninja/api/data/ItemOverview
 * @param league
 * @param language
 */
export const getOverview = async (
  league: string,
  language: LanguageCode = LanguageCode.en
): Promise<DeliriumOrbOverview> => {
  return await getOverviewGeneric(league, ItemOption.DeliriumOrb, language, DeliriumOrbOverview);
};

/**
 * @endpoint https://poe.ninja/api/data/ItemHistory
 * @param league
 * @param id
 */
export const getHistory = /* istanbul ignore next */ (
  league: string,
  id: number
): Promise<HistoryPoint[]> => {
  /* istanbul ignore next */
  return getHistoryGeneric(league, ItemOption.DeliriumOrb, id);
};
