import { plainToInstance } from "class-transformer";

import { buildURL, request, requestTransformed } from "../../../../common/functions";

import { IRealmOptions } from "../../../shared";
import { Item } from "../../../shared/item";
import { Stash, StashTabBase } from "../../../shared/stashes";

import { SessionEndpoints } from "../Endpoints";

import { SessionStash } from "./Stash";

/**
 * @remarks
 * Requires [[Settings.sessionId]] to be set.
 *
 *
 * @endpoint https://www.pathofexile.com/character-window/get-stash-items
 * @param accountName
 * @param league The ID of the league, e.g. 'Standard'
 * @param options
 * @throws [[APIError]]
 */
export const getStash = async (
  accountName: string,
  league: string,
  options?: IRealmOptions
): Promise<Stash<StashTabBase>> => {
  const url = buildURL(SessionEndpoints.Stash, options, undefined, {
    accountName,
    league,
    tabs: "1",
    tabIndex: "1",
  });
  const stash = await requestTransformed(SessionStash, url);
  for (const tab of stash.tabs) {
    tab.league = league;
    tab.account = accountName;
    if (options) tab.options = options;
  }
  return stash;
};

/**
 * @remarks
 * Requires [[Settings.sessionId]] to be set.
 *
 *
 * @endpoint https://www.pathofexile.com/character-window/get-stash-items
 * @param accountName
 * @param league The ID of the league, e.g. 'Standard'
 * @param tabindex The index of the stash tab
 * @param options
 * @throws [[APIError]]
 */
export const getStashTabItems = async (
  accountName: string,
  league: string,
  tabindex: number,
  options?: IRealmOptions
): Promise<Item[]> => {
  const url = buildURL(SessionEndpoints.Stash, options, undefined, {
    accountName,
    league,
    tabIndex: tabindex.toString(),
    tabs: "0",
  });
  const response = await request(url);
  const responseJson = <{ items: string[] }>JSON.parse(response);
  return plainToInstance(Item, responseJson.items);
};
