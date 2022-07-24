import { buildURL, requestTransformed } from "../../../../common/functions";

import { ShowcasePinCollection, ShowcasePinOptions } from "../../../shared/accounts";

import { PublicEndpoints } from "../Endpoints";

/**
 * @remarks
 * This data is available even if the profile of the account is set to private
 *
 * @endpoint https://pathofexile.com/api/account/showcase-pins
 * @param accountName
 * @param options
 * @throws [[APIError]]
 */
export const getShowcasePins = async (
  accountName: string,
  options?: ShowcasePinOptions
): Promise<ShowcasePinCollection> => {
  const url = buildURL(PublicEndpoints.AccountShowcasePins, options, null, {
    account: accountName,
  });

  return await requestTransformed(ShowcasePinCollection, url);
};
