import { buildURL, requestTransformed } from "../../../../common/functions";

import {
  Guild,
  StashHistoryOptions,
  PointTransactions,
  StashHistory,
} from "../../../shared/guilds";

import { SessionEndpoints } from "../Endpoints";
import { SessionGuild } from "./Guild";
import { SessionPointTransactions } from "./PointTransactions";
import { SessionStashHistory } from "./StashHistory";

/**
 * @remarks
 * Requires [[Settings.sessionId]] to be set.
 *
 * @endpoint https://pathofexile.com/api/guild
 * @returns Guild data of the account the session ID belongs to
 * @throws [[APIError]]
 */
export const get = async (): Promise<Guild> => {
  const url = new URL(SessionEndpoints.Guild);
  return await requestTransformed(SessionGuild, url);
};

/**
 * @remarks
 * Requires [[Settings.sessionId]] to be set.
 *
 * @endpoint https://pathofexile.com/api/guild/id/stash/history
 * @param guildId
 * @param options
 * @throws [[APIError]]
 */
export const getStashHistory = async (
  guildId: string,
  options?: StashHistoryOptions
): Promise<StashHistory> => {
  const url = buildURL(`${SessionEndpoints.Guild}/${guildId}/stash/history`, options);
  return await requestTransformed(SessionStashHistory, url);
};

/**
 * @remarks
 * Requires [[Settings.sessionId]] to be set.
 *
 * @endpoint https://pathofexile.com/api/guild/point-transactions
 * @param options
 * @returns Point transactions for the guild the session ID belongs to
 * @throws [[APIError]]
 */
export const getPointTransactions = async (
  options?: StashHistoryOptions
): Promise<PointTransactions> => {
  const url = buildURL(`${SessionEndpoints.Guild}/point-transactions`, options);
  return await requestTransformed(SessionPointTransactions, url);
};

/**
 * @remarks
 * Requires [[Settings.sessionId]] to be set.
 *
 * @endpoint https://pathofexile.com/api/account/guild/point-transactions
 * @param options
 * @returns Point transactions the account the session ID belongs to has made to guilds
 * @throws [[APIError]]
 */
export const getAccountPointTransactions = async (
  options?: StashHistoryOptions
): Promise<PointTransactions> => {
  const url = buildURL(`${SessionEndpoints.Account}/guild/point-transactions`, options);
  return await requestTransformed(SessionPointTransactions, url);
};
