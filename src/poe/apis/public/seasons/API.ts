import {
  buildURL,
  requestTransformed,
  requestTransformedArray,
} from "../../../../common/functions";

import {
  PlayerHistory,
  PlayerHistoryOptions,
  Season,
  SeasonOptions,
} from "../../../shared/seasons";

import { PublicEndpoints } from "../Endpoints";

/**
 * @endpoint https://pathofexile.com/api/seasons
 * @param options
 * @returns A list of all seasons
 * @throws [[APIError]]
 */
export const get = async (options?: SeasonOptions): Promise<Season[]> => {
  const url = buildURL(PublicEndpoints.Seasons, options);
  return await requestTransformedArray(Season, url);
};

/**
 * @remarks
 * This data is available even if the profile of the account is set to private
 *
 * @endpoint https://pathofexile.com/api/season-player-history
 * @param seasonId
 * @param accountName
 * @param options
 * @throws [[APIError]]
 */
export const getPlayerHistory = async (
  seasonId: string,
  accountName: string,
  options?: PlayerHistoryOptions
): Promise<PlayerHistory> => {
  const url = buildURL(PublicEndpoints.SeasonPlayerHistory, options, null, {
    seasonId,
    id: accountName,
  });
  return await requestTransformed(PlayerHistory, url);
};
