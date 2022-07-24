import { IRealmOptions } from "../../models/RealmOptions";

/**
 * Query Parameters as defined in https://www.pathofexile.com/developer/docs/reference#leagues
 */
export interface IListOptions extends IRealmOptions {
  /**
   * This specifies the number of league entries to include. By default this is the maximum, which depends on the setting above.
   */
  limit?: number;

  /**
   * This specifies the offset to the first league entry to include.
   *
   * Default: `0`
   */
  offset?: number;

  /**
   * `main`: Retrieves permanant and challenge leagues
   *
   * `event`: Retrieves event leagues
   *
   * `season`: Retrieves leagues in a particular season.
   *
   * Default: `main`
   */
  type?: "main" | "event" | "season";

  /**
   * A particular season id. Required when `type=season`.
   */
  season?: string;
}
