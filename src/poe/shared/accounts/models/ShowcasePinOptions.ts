import { IRealmOptions } from "../../models/RealmOptions";

export interface ShowcasePinOptions extends IRealmOptions {
  /**
   * Specifies the number of showcase pins to include.
   *
   * Default: `100`
   */
  limit?: number;

  /**
   * Specifies the offset to the showcase pin to include.
   *
   * Default: `0`
   */
  offset?: number;
}
