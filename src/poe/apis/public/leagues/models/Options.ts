import { IRealmOptions } from "../../../../shared";
import { IListOptions } from "../../../../shared/leagues";

export interface PublicListOptions extends IListOptions {
  /**
   * `0`: Displays the full info for leagues retrieved (will only retrieve a maximum of 50 leagues) (the default)
   *
   * `1`: Display compact info for leagues retrieved (will retrieve up to 230 leagues).
   */
  compact?: 0 | 1;
}

export interface LeagueOptions extends IRealmOptions {
  /**
   * Set to `true` to include the ladder in the response. The ladder will be in included in the `ladder` key.
   * Please note that the ladder can be retrieved using the ladder resource, and that retrieving it using the league API is just an optimization that can be used if you are requesting the league anyway.
   *
   * Default: `0`
   */
  ladder?: 0 | 1;

  /**
   * When including the ladder with `ladder=1`, this specifies the number of ladder entries to include.
   *
   * Default: `20`
   *
   * Max: `200`
   */
  ladderLimit?: number;
  /**
   * When including the ladder with `ladder=1`, this specifies the offset to the first ladder entry to include.
   *
   * Default: `0`
   */
  ladderOffset?: number;

  /**
   * When including the ladder with `ladder=1`, this setting adds unique IDs for each character returned. These can be used when name conflicts occur.
   *
   * Default: `0`
   */
  ladderTrack?: 0 | 1;
}
