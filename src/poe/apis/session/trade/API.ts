import { buildURL, requestTransformed } from "../../../../common/functions";

import { IgnoredAccounts } from "../../../shared/trade/ignore";

import { PublicEndpoints } from "../../public/Endpoints";

/**
 * @remarks
 * Requires [[Settings.sessionId]] to be set.
 *
 * @endpoint https://pathofexile.com/api/trade/ignore
 * @param page Between `1` and `10`, will default to `1` if out of range
 * @returns A list of up to 50 ignored accounts
 * @throws [[APIError]]
 */
export const getIgnoredAccounts = async (page = 1): Promise<IgnoredAccounts> => {
  const url = buildURL(PublicEndpoints.TradeIgnore, null, null, {
    page: page.toString(),
  });
  return await requestTransformed(IgnoredAccounts, url);
};
