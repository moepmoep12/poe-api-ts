import { buildURL, requestTransformed, requestTransformedArray } from "../../../common/functions";

import { NinjaEndpoints } from "../../Endpoints";
import { HistoryPoint, LanguageCode } from "../../shared";
import { ItemBase, ItemOverview } from "../../shared/items";

import { ItemOption } from "./models/ItemOption";

/**
 * @endpoint https://poe.ninja/api/data/ItemOverview
 * @param league
 * @param language
 */
export const getOverviewGeneric = async <T extends ItemBase>(
  league: string,
  type: ItemOption,
  /* istanbul ignore next */
  language: LanguageCode = LanguageCode.en,
  cls: new () => ItemOverview<T>
): Promise<ItemOverview<T>> => {
  const url = buildURL(NinjaEndpoints.ItemOverview, null, null, {
    league,
    type,
    language,
  });
  return await requestTransformed(cls, url);
};

/**
 * @endpoint https://poe.ninja/api/data/ItemHistory
 * @param league
 * @param type
 * @param id
 */
export const getHistoryGeneric = async (
  league: string,
  type: ItemOption,
  id: number
): Promise<HistoryPoint[]> => {
  const url = buildURL(NinjaEndpoints.ItemHistory, null, null, {
    league,
    type,
    itemId: id.toString(),
  });

  return await requestTransformedArray(HistoryPoint, url);
};
