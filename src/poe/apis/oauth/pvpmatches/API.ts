import {
  buildURL,
  requestTransformed,
  requestTransformedArray,
} from "../../../../common/functions";
import { OAuthEndpoints } from "../utils/Endpoints";
import { stripOuter } from "../../../../common/functions";

import {
  IPvpLadderOptions,
  IPvpOptions,
  PvpMatch,
  PvpMatchLadder,
} from "../../../shared/pvp_matches";
import { IRealmOptions } from "../../../shared";

import { addServiceTokenHeader } from "../utils/Headers";

import { OAuthPvpMatch } from "./PvpMatch";
import { OAuthPvpMatchLadder } from "./PvpMatchLadder";

/**
 * @remarks
 * Requires [[Settings.serviceToken]] to be set and the scope `service:pvp_matches`.
 *
 * @param options
 * @endpoint https://api.pathofexile.com/pvp-match
 * @throws [[APIError]]
 */
export const getMatches = async (options?: IPvpOptions): Promise<PvpMatch[]> => {
  const url = buildURL(OAuthEndpoints.PVPMatches, options);
  const matches = await requestTransformedArray(
    OAuthPvpMatch,
    url,
    "GET",
    {},
    addServiceTokenHeader(),
    stripOuter
  );
  return matches;
};

/**
 * @remarks
 * Requires [[Settings.serviceToken]] to be set and the scope `service:pvp_matches`.
 *
 * @param options
 * @endpoint https://api.pathofexile.com/pvp-match/:match
 * @throws [[APIError]]
 */
export const getMatch = async (match: string, options?: IRealmOptions): Promise<PvpMatch> => {
  const url = buildURL(`${OAuthEndpoints.PVPMatches}/${match}`, options);
  return await requestTransformed(
    OAuthPvpMatch,
    url,
    "GET",
    {},
    addServiceTokenHeader(),
    stripOuter
  );
};

/**
 * @remarks
 * Requires [[Settings.serviceToken]] to be set and the scope `service:pvp_matches`.
 *
 * @param options
 * @endpoint https://api.pathofexile.com/pvp-match/:match/ladder
 * @throws [[APIError]]
 */
export const getLadder = async (
  match: string,
  options?: IPvpLadderOptions
): Promise<PvpMatchLadder> => {
  const url = buildURL(`${OAuthEndpoints.PVPMatches}/${match}/ladder`, options);
  return await requestTransformed(OAuthPvpMatchLadder, url, "GET", {}, addServiceTokenHeader());
};
