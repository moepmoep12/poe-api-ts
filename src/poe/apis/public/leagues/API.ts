import {
  buildURL,
  requestTransformedArray,
  requestTransformed,
} from "../../../../common/functions";

import { League } from "../../../shared/leagues";

import { PublicEndpoints } from "../Endpoints";

import { PublicListOptions, LeagueOptions } from "./models";
import { PublicLeague } from "./League";

/**
 * @example
 * Get the list of the leagues that are currently active on the PlayStation realm.
 *
 * ```typescript
 * const data = await PathOfExile.Public.Leagues.get({ type: "main", realm: "sony" });
 * ```
 *
 * @endpoint https://api.pathofexile.com/leagues
 * @param options
 * @throws [[APIError]]
 */
export const getAll = async (options?: PublicListOptions): Promise<League[]> => {
  const url = buildURL(PublicEndpoints.Leagues, options);
  return await requestTransformedArray(PublicLeague, url);
};

/**
 * @example
 * Get the data from the Metamorph league, including the first 100 entries of the ladder.
 *
 * ```typescript
 * const data = await PathOfExile.Public.Leagues.getById("Metamorph", { ladder: 1, limit: 100 });
 * ```
 *
 * @endpoint https://api.pathofexile.com/leagues/:id
 * @param id
 * @param options
 * @throws [[APIError]]
 */
export const getById = async (id: string, options?: LeagueOptions): Promise<League> => {
  const url = buildURL(`${PublicEndpoints.Leagues}/${id}`, options);
  return await requestTransformed(PublicLeague, url);
};
