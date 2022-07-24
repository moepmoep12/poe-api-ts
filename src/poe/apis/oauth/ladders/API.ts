import { buildURL, requestTransformed } from "../../../../common/functions";

import { Ladder } from "../../../shared/ladders";

import { OAuthEndpoints } from "../utils/Endpoints";
import { addServiceTokenHeader } from "../utils/Headers";

import { OAuthLadder } from "./Ladder";
import { OAuthLadderOptions } from "./models";

/**
 * @remarks
 * Requires [[Settings.serviceToken]] to be set and the scope `service:leagues:ladder`.
 * There is a restriction in place on the last ladder entry you are able to retrieve which is set to `15000`.
 *
 * @example
 * Get the first 200 characters in the SSF Standard ladder.
 *
 * ```typescript
 * const ladder = await PathOfExile.OAuth.Ladders.get("SSF Standard", { limit: 200, track: 1 });
 * ```
 *
 * @endpoint https://api.pathofexile.com/league/:id/ladder
 * @param id League id
 * @param options
 * @throws [[APIError]]
 */
export const get = async (id: string, options?: OAuthLadderOptions): Promise<Ladder> => {
  const url = buildURL(`${OAuthEndpoints.League}/${id}/ladder`, options);
  const ladder = await requestTransformed(OAuthLadder, url, "GET", {}, addServiceTokenHeader());
  ladder.league = id;
  if (options) ladder.options = options;
  return ladder;
};
