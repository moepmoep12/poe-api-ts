import { Expose } from "class-transformer";
import { IsInt, IsString, Min } from "class-validator";

import { Transformable } from "../../../common/classes";

export class Statistics extends Transformable {
  @IsInt()
  @Min(0)
  id!: number;

  @IsString()
  @Expose({ name: "next_change_id" })
  /**
   * @overrides `next_change_id`
   */
  nextChangeId!: string;

  @IsInt()
  @Min(0)
  @Expose({ name: "api_bytes_downloaded" })
  /**
   * @overrides `api_bytes_downloaded`
   */
  apiBytesDownloaded!: number;

  @IsInt()
  @Min(0)
  @Expose({ name: "stash_tabs_processed" })
  /**
   * @overrides `stash_tabs_processed`
   */
  stashTabsProcessed!: number;

  @IsInt()
  @Min(0)
  @Expose({ name: "api_calls" })
  /**
   * @overrides `api_calls`
   */
  apiCalls!: number;

  @IsInt()
  @Min(0)
  @Expose({ name: "character_bytes_downloaded" })
  /**
   * @overrides `character_bytes_downloaded`
   */
  characterBytesDownloaded!: number;

  @IsInt()
  @Min(0)
  @Expose({ name: "character_api_calls" })
  /**
   * @overrides `character_api_calls`
   */
  characterApiCalls!: number;

  @IsInt()
  @Min(0)
  @Expose({ name: "ladder_bytes_downloaded" })
  /**
   * @overrides `ladder_bytes_downloaded`
   */
  ladderBytesDownloaded!: number;

  @IsInt()
  @Min(0)
  @Expose({ name: "ladder_api_calls" })
  /**
   * @overrides `ladder_api_calls`
   */
  ladderApiCalls!: number;

  @IsInt()
  @Min(0)
  @Expose({ name: "pob_characters_calculated" })
  /**
   * @overrides `pob_characters_calculated`
   */
  pobCharactersCalculated!: number;

  @IsInt()
  @Min(0)
  oauth_flows!: number;
}
