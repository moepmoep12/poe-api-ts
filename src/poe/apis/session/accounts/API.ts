import {
  buildURL,
  requestTransformed,
  requestTransformedArray,
  stripOuter,
} from "../../../../common/functions";

import { IRealmOptions } from "../../../shared";
import { Profile } from "../../../shared/accounts";

import { SessionEndpoints } from "../Endpoints";

import { AvatarCollection } from "./avatars";
import { AvatarsOptions } from "./models";
import { MtxGroup } from "./mtx";
import { SessionProfile } from "./Profile";

export { getShowcasePins } from "../../public/accounts/API";

/**
 * @remarks
 * Requires [[Settings.sessionId]] to be set.
 *
 *
 * @endpoint https://pathofexile.com/api/profile
 * @param options
 * @throws [[APIError]]
 */
export const getProfile = async (options?: IRealmOptions): Promise<Profile> => {
  const url = buildURL(SessionEndpoints.Profile, options);
  return requestTransformed(SessionProfile, url);
};

/**
 * @remarks
 * Requires [[Settings.sessionId]] to be set.
 *
 * @endpoint https://pathofexile.com/api/account-avatar
 * @param options
 * @throws [[APIError]]
 */
export const getAvatars = async (options?: AvatarsOptions): Promise<AvatarCollection> => {
  const url = buildURL(SessionEndpoints.AccountAvatar, options, {
    page: 1,
    perPage: 16,
    custom: false,
  });

  const collection = await requestTransformed(AvatarCollection, url);

  /* istanbul ignore if */
  if (options) {
    collection.options = options;
  }

  return collection;
};

/**
 * @remarks
 * Requires [[Settings.sessionId]] to be set.
 *
 * @endpoint https://pathofexile.com/character-window/get-mtx-stash-items
 * @throws [[APIError]]
 */
export const getMicrotransactions = async (): Promise<MtxGroup[]> => {
  const url = buildURL(SessionEndpoints.Mtx);

  return await requestTransformedArray(MtxGroup, url, "get", {}, {}, stripOuter);
};
