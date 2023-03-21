import {
  buildURL,
  requestTransformedArray,
  requestTransformed,
} from "../../../../common/functions";
import { stripOuter } from "../../../../common/functions";

import { IRealmOptions } from "../../../shared";
import { League, IListOptions } from "../../../shared/leagues";

import { OAuthEndpoints } from "../utils/Endpoints";
import { addServiceTokenHeader } from "../utils/Headers";

import { OAuthLeague } from "./League";

/**
 * @remarks
 * Requires [[Settings.serviceToken]] to be set and the scope `service:leagues`.
 *
 * @example
 * Get the list of the leagues that are currently active on the PlayStation realm.
 *
 * ```typescript
 * const data = await PathOfExile.OAuthAPI.Leagues.get({ type: "main", realm: "sony" });
 * ```
 *
 * @endpoint https://api.pathofexile.com/league
 * @param options
 * @throws [[APIError]]
 */
export const getAll = async (options?: IListOptions): Promise<League[]> => {
  const url = buildURL(OAuthEndpoints.League, options);
  return await requestTransformedArray(
    OAuthLeague,
    url,
    "GET",
    {},
    addServiceTokenHeader(),
    stripOuter
  );
};

/**
 * @remarks
 * Requires [[Settings.serviceToken]] to be set and the scope `service:leagues`.
 *
 * @example
 * Get the data from the Metamorph league.
 *
 * ```typescript
 * const data = await PathOfExile.OAuth.Leagues.getById("Metamorph");
 * ```
 *
 * @endpoint https://api.pathofexile.com/league/:id
 * @param id
 * @param options
 * @throws [[APIError]]
 */
export const getById = async (id: string, options?: IRealmOptions): Promise<League> => {
  const url = buildURL(`${OAuthEndpoints.League}/${id}`, options);
  return await requestTransformed(OAuthLeague, url, "GET", {}, addServiceTokenHeader(), stripOuter);
};
