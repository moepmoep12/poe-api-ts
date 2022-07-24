import { plainToInstance } from "class-transformer";

import {
  buildURL,
  requestTransformed,
  requestTransformedArray,
} from "../../../../common/functions";
import { stripOuter } from "../../../../common/functions";

import { Stash, StashTabBase } from "../../../shared/stashes";

import { OAuthEndpoints } from "../utils/Endpoints";
import { addAuthorizationTokenHeader } from "../utils/Headers";

import { OAuthStashTab } from "./StashTab";
import { OAuthStash } from "./Stash";

/**
 * @remarks
 * Requires [[Settings.accessToken]] to be set and the scope `account:stashes`.
 * The stash tabs do not include the items.
 *
 *
 * @endpoint https://api.pathofexile.com/stash/:league
 * @param leagueId The ID of the league, e.g. 'Standard'
 * @throws [[APIError]]
 */
export const getStash = async (leagueId: string): Promise<Stash<StashTabBase>> => {
  const url = buildURL(`${OAuthEndpoints.Stashes}/${leagueId}`);
  const tabs = await requestTransformedArray(
    OAuthStashTab,
    url,
    "GET",
    {},
    addAuthorizationTokenHeader(),
    stripOuter
  );
  for (const tab of tabs) {
    tab.league = leagueId;
  }
  const stash: Partial<OAuthStash> = {
    numTabs: tabs.length,
    tabs: tabs,
  };
  return plainToInstance(OAuthStash, stash);
};

/**
 * @remarks
 * Requires [[Settings.accessToken]] to be set and the scope `account:stashes`.
 *
 *
 * @endpoint https://api.pathofexile.com/stash/:league/:stashID/[:subStashID]
 * @param leagueId The ID of the league, e.g. 'Standard'
 * @param stashID The ID of the stash tab
 * @param subStashId Optional.
 * @throws [[APIError]]
 */
export const getStashTab = async (
  leagueId: string,
  stashID: string,
  subStashId?: string
): Promise<StashTabBase> => {
  const subStashSuffix = subStashId ? `/${subStashId}` : "";
  const url = buildURL(`${OAuthEndpoints.Stashes}/${leagueId}/${stashID}${subStashSuffix}`);
  const tab = await requestTransformed(
    OAuthStashTab,
    url,
    "GET",
    {},
    addAuthorizationTokenHeader(),
    stripOuter
  );
  tab.league = leagueId;
  return tab;
};
