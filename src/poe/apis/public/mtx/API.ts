import { buildURL, requestTransformed } from "../../../../common/functions";

import { PublicEndpoints } from "../Endpoints";

import { MTXCollection } from "./MTXCollection";

/**
 * @endpoint https://pathofexile.com/api/shop/microtransactions/specials
 * @param limit
 * @throws [[APIError]]
 */
export const getSpecials = async (limit?: number): Promise<MTXCollection> => {
  const options = limit ? { limit } : undefined;
  const url = buildURL(PublicEndpoints.MTXSpecials, options);

  return await requestTransformed(MTXCollection, url);
};
