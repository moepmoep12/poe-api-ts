import { IRealmOptions } from "../../models/RealmOptions";

export enum SortClassOption {
  Scion = "0",
  Marauder = "1",
  Ranger = "2",
  Witch = "3",
  Duelist = "4",
  Templar = "5",
  Shadow = "6",
}

export interface ILadderOptions extends IRealmOptions {
  /**
   * Specifies the number of ladder entries to include.
   *
   * Default: `20`
   *
   * Max: `200`
   */
  limit?: number;

  /**
   * Specifies the offset to the first ladder entry to include.
   *
   * Default: `0`
   */
  offset?: number;

  /**
   * Filters the ladder by class.
   */
  class?: SortClassOption;
}
