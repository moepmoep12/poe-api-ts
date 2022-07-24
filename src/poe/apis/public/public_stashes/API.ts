import { buildURL, requestTransformed } from "../../../../common/functions";

import { Chunk } from "../../../shared/public_stashes";

import { PublicEndpoints } from "../Endpoints";
import { PublicChunk } from "./Chunk";

/**
 * A stream containing all public stashes in all leagues.
 * Providing the next_change_id as the id query parameter serves as a way to paginate through current and newly listed stashes.
 * You can track stashes as they re-appear in the stream by comparing their PublicStashChange's id property.
 *
 * @remarks
 * If a stash has been unlisted all details aside from the `id` and `public` parameters will be omitted.
 *
 * @remarks
 * If the `stashes` array is empty then you have reached the end of the stream.
 * Polling this endpoint with the same next_change_id will then return new results once they become available
 *
 * @remarks
 * There is currently a 5-minute delay on results using this API
 *
 * @endpoint https://api.pathofexile.com/public-stash-tabs
 * @param nextChangeId pagination code
 * @throws [[APIError]]
 */
export const getChunk = async (nextChangeId?: string): Promise<Chunk> => {
  const url = buildURL(
    PublicEndpoints.PublicStashChanges,
    nextChangeId ? { next_change_id: nextChangeId } : {}
  );
  return requestTransformed(PublicChunk, url);
};
