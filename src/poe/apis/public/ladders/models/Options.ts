import { ILadderOptions } from "../../../../shared/ladders/models/Options";

export interface PublicLadderOptions extends ILadderOptions {
  /**
   * Specifies the type of ladder.
   *
   * Default: `league`
   */
  type?: "league" | "pvp" | "labyrinth";

  /**
   * Adds unique IDs for each character returned. These can be used when name conflicts occur.
   *
   * Default: `0`
   */
  track?: 0 | 1;

  /**
   * Filters by account name within the first 15000 results, only available when `type=league`.
   */
  accountName?: string;

  /**
   * Difficulty of the labyrinth, only available when `type=labyrinth`.
   */
  difficulty?: "Normal" | "Cruel" | "Merciless" | "Eternal" | 1 | 2 | 3 | 4;

  /**
   * Only available when `type=labyrinth`.
   */
  start?: string;
}
