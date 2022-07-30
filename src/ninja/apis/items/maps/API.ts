import { HistoryPoint, LanguageCode } from "../../../shared";

import { getHistoryGeneric, getOverviewGeneric } from "../API";
import { ItemOption } from "../models/ItemOption";

import { MapOverview } from "./ItemOverview";

/**
 * @endpoint https://poe.ninja/api/data/ItemOverview
 * @param league
 * @param language
 */
export const getOverview = async (
  league: string,
  type:
    | ItemOption.Map
    | ItemOption.UniqueMap
    | ItemOption.BlightedMap
    | ItemOption.BlightRavageddMap,
  language: LanguageCode = LanguageCode.en
): Promise<MapOverview> => {
  return await getOverviewGeneric(league, type, language, MapOverview);
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
  return getHistoryGeneric(league, ItemOption.Map, id);
};
