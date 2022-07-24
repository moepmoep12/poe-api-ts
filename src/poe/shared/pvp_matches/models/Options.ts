import { IRealmOptions } from "../../models";

export interface IPvpOptions extends IRealmOptions {
  /**
   * @param upcoming retrieves upcoming matches (default)
   * @param season retrieves matches in a particular season. Use season= to set the season to query
   * @param league retrieves matches in a particular league. Use league= to set the league to query
   */
  type?: "upcoming" | "season" | "league";

  /**
   * Only available when type = season
   */
  season?: string;

  /**
   * Only available when type = league
   */
  league?: string;
}

export interface IPvpLadderOptions extends IRealmOptions {
  /**
   * restricts the amount of results returned. Default is 20. Maximum is 200
   */
  limit?: number;

  /**
   * can be used with limit above to scroll through the list
   */
  offset?: number;
}
