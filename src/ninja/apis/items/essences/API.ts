import { HistoryPoint, LanguageCode } from "../../../shared";

import { getHistoryGeneric, getOverviewGeneric } from "../API";
import { ItemOption } from "../models/ItemOption";

import { EssenceOverview } from "./ItemOverview";

/**
 * @endpoint https://poe.ninja/api/data/ItemOverview
 * @param league
 * @param language
 */
export const getOverview = async (
  league: string,
  language: LanguageCode = LanguageCode.en
): Promise<EssenceOverview> => {
  return await getOverviewGeneric(league, ItemOption.Essence, language, EssenceOverview);
};

/**
 * @endpoint https://poe.ninja/api/data/ItemHistory
 * @param league
 * @param id
 */
export const getHistory = async (league: string, id: number): Promise<HistoryPoint[]> => {
  return await getHistoryGeneric(league, ItemOption.Essence, id);
};
