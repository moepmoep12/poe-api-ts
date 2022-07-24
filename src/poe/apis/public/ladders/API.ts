import { buildURL, requestTransformed } from "../../../../common/functions";

import { Ladder } from "../../../shared/ladders";

import { PublicEndpoints } from "../Endpoints";

import { PublicLadder } from "./Ladder";
import { PublicLadderCharacter } from "./LadderCharacter";
import { PublicLadderOptions } from "./models";

/**
 * @remarks
 * There is a restriction in place on the last ladder entry you are able to retrieve which is set to `15000`.
 *
 * @example
 * Get the first 200 characters in the SSF Standard ladder. We also set `track: 1` to add a unique identifier to each character.
 *
 * ```typescript
 * const ladder = await PathOfExile.Public.Ladders.get("SSF Standard", { limit: 200, track: 1 });
 * ```
 *
 * @endpoint https://api.pathofexile.com/ladders/id
 * @param id
 * @param options
 * @throws [[APIError]]
 */
export const get = async (id: string, options?: PublicLadderOptions): Promise<Ladder> => {
  const url = buildURL(`${PublicEndpoints.Ladders}/${id}`, options);
  const ladder = await requestTransformed(PublicLadder, url);
  ladder.league = id;
  if (options) ladder.options = options;
  for (const entry of ladder.entries) {
    (entry.character as PublicLadderCharacter).accountName = entry.account.name;
  }
  return ladder;
};
