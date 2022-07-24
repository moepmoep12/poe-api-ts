import { buildURL, requestTransformed } from "../../../../common/functions";

import { IRealmOptions } from "../../../shared";
import { Profile } from "../../../shared/accounts";

import { OAuthEndpoints } from "../utils/Endpoints";
import { addAuthorizationTokenHeader } from "../utils/Headers";

import { OAuthProfile } from "./Profile";

export { getShowcasePins } from "../../public/accounts/API";

/**
 * @remarks
 * Requires [[Settings.accessToken]] to be set and the scope `account:profile`.
 *
 *
 * @endpoint https://api.pathofexile.com/profile
 * @param options
 * @throws [[APIError]]
 */
export const getProfile = async (options?: IRealmOptions): Promise<Profile> => {
  const url = buildURL(OAuthEndpoints.Profile, options);
  return requestTransformed(OAuthProfile, url, "GET", {}, addAuthorizationTokenHeader());
};
