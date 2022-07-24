import { Expose } from "class-transformer";
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateIf,
} from "class-validator";

import { Transformable } from "../../../../../common/classes";

import { FetchResult } from "../fetch";

export abstract class SearchResult extends Transformable {
  @IsString()
  @IsNotEmpty()
  id!: string;

  @IsNumber()
  @ValidateIf((_, val) => val != null)
  complexity!: number | null;

  @Min(0)
  @IsInt()
  total!: number;

  @IsArray()
  @IsString({ each: true })
  @Expose({ name: "result" })
  /**
   * @overrides `result`
   */
  hashes!: string[];

  @IsOptional()
  @IsBoolean()
  inexact?: boolean;

  /**
   * @returns A list of next item listings, null if there are none
   * @throws [[APIError]]
   */
  public abstract getNextItems(count: number): Promise<FetchResult[] | null>;
}
