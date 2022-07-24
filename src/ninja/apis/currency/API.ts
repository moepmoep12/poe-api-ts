import { buildURL, requestTransformed } from "../../../common/functions";
import { NinjaEndpoints } from "../../Endpoints";

import { LanguageCode } from "../../shared/models";

import { CurrencyOverview } from "./CurrencyOverview";
import { History } from "./History";
import { CurrencyOption } from "./models";

/**
 * @endpoint https://poe.ninja/api/data/CurrencyOverview
 * @param league
 * @param type
 * @param language
 */
export const getOverview = async (
  league: string,
  type: CurrencyOption,
  language: LanguageCode = LanguageCode.en
): Promise<CurrencyOverview> => {
  const url = buildURL(NinjaEndpoints.CurrencyOverview, null, null, {
    league,
    type,
    language,
  });
  return await requestTransformed(CurrencyOverview, url);
};

/**
 * @endpoint https://poe.ninja/api/data/CurrencyHistory
 * @param league
 * @param type
 * @param id
 */
export const getHistory = async (
  league: string,
  type: CurrencyOption,
  id: number
): Promise<History> => {
  const url = buildURL(NinjaEndpoints.CurrencyHistory, null, null, {
    league,
    type,
    currencyId: id.toString(),
  });

  return await requestTransformed(History, url);
};
