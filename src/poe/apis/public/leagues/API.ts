import {
  buildURL,
  requestTransformedArray,
  requestTransformed,
} from "../../../../common/functions";

import { League, LeagueRule } from "../../../shared/leagues";

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

/**
 * @endpoint http://api.pathofexile.com/league-rules
 * @throws [[APIError]]
 */
export const getRules = async (): Promise<LeagueRule[]> => {
  const url = buildURL(PublicEndpoints.LeagueRules);
  return await requestTransformedArray(LeagueRule, url);
};

/**
 * @endpoint http://api.pathofexile.com/league-rules/id
 * @param id
 * @throws [[APIError]]
 */
export const getRuleById = async (id: string): Promise<LeagueRule> => {
  const url = buildURL(`${PublicEndpoints.LeagueRules}/${id}`);
  return await requestTransformed(LeagueRule, url);
};
