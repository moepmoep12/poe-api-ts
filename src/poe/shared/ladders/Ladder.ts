import { Exclude, Expose, Type } from "class-transformer";
import { Allow, IsArray, IsDate, IsInt, Min, ValidateNested } from "class-validator";

import { Transformable } from "../../../common/classes/Transformable";

import { LadderCharacter } from "./LadderCharacter";
import { LadderEntry } from "./LadderEntry";
import { ILadderOptions } from "./models/Options";

/**
 * Each ladder only contains the top 15000 entries.
 * Attempting to fetch entries beyond this will return an empty result.
 */
export abstract class Ladder extends Transformable {
  @Allow()
  @Exclude()
  protected ladderOptions: ILadderOptions = { limit: 20, offset: 0 };

  @Allow()
  @Exclude()
  protected leagueId = "Standard";

  @Min(0)
  @IsInt()
  public total!: number;

  @IsDate()
  @Type(/* istanbul ignore next */ () => Date)
  @Expose({ name: "cached_since" })
  /**
   * @overrides `cached_since`
   */
  public cachedSince!: Date;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(/* istanbul ignore next */ () => LadderEntry)
  public entries!: LadderEntry[];

  @Exclude()
  public set options /* istanbul ignore next */(options: ILadderOptions) {
    this.ladderOptions = { ...this.ladderOptions, ...options };
  }

  @Exclude()
  public set league /* istanbul ignore next */(league: string) {
    this.leagueId = league;
  }

  /**
   * @remarks
   * Uses the same [[ILadderOptions]] that have been used getting this ladder.
   * If you want to fetch an entire ladder, it is highly recommended to set the `limit` option to `200`.
   *
   * @param append Set to `true` if the next entries should be appended to this ladders entries
   * @returns The next set of ladder entries, `null` when there are no more entries
   */
  public abstract getNextEntries(append: boolean): Promise<LadderEntry[] | null>;

  /**
   * @example
   * Get all characters which have the Assassin ascendancy.
   *
   * ```typescript
   * const assassins = ladder.filterByCharacter("class", "Assassin");
   * console.log(`${assassins.length} of the first 200 characters are Assassins.`);
   * ```
   *
   * @param property Name of a character property
   * @param value Value of the property that should be filtered
   * @returns A new list of characters matching the filter
   */
  public filterByCharacter<K extends keyof LadderCharacter>(
    property: K,
    value: LadderCharacter[K]
  ): LadderEntry[] {
    return this.entries.filter((entry) => entry.character[property] === value);
  }

  /**
   * @example
   * Display online characters from the ladder.
   *
   * ```typescript
   * const online = ladder.filterBy("online", true);
   * console.log(`${online.length} of the first 200 characters are currently online.`);
   * ```
   *
   * @param property Name of a ladder entry property
   * @param value Value of the property that should be filtered
   * @returns A new list of characters matching the filter
   */
  public filterBy<K extends keyof LadderEntry>(property: K, value: LadderEntry[K]): LadderEntry[] {
    return this.entries.filter((entry) => entry[property] === value);
  }
}
