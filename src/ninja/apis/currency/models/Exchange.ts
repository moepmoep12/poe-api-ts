import { Expose, Type } from "class-transformer";
import { IsBoolean, IsDate, IsNumber, Min } from "class-validator";

import { Transformable } from "../../../../common/classes";

export class Exchange extends Transformable {
  @IsNumber()
  @Min(0)
  id!: number;

  @IsNumber()
  @Min(0)
  count!: number;

  @IsNumber()
  @Min(0)
  value!: number;

  /**
   * @overrides `league_id`
   */
  @IsNumber()
  @Min(0)
  @Expose({ name: "league_id" })
  leagueId!: number;

  /**
   * @overrides `pay_currency_id`
   */
  @IsNumber()
  @Min(0)
  @Expose({ name: "pay_currency_id" })
  payCurrencyId!: number;

  /**
   * @overrides `get_currency_id`
   */
  @IsNumber()
  @Min(0)
  @Expose({ name: "get_currency_id" })
  getCurrencyId!: number;

  /**
   * @overrides `sample_time_utc`
   */
  @IsDate()
  @Expose({ name: "sample_time_utc" })
  @Type(() => Date)
  sampleTime!: Date;

  /**
   * @overrides `data_point_count`
   */
  @IsNumber()
  @Min(0)
  @Expose({ name: "data_point_count" })
  dataPointCount!: number;

  /**
   * @overrides `includes_secondary`
   */
  @IsBoolean()
  @Expose({ name: "includes_secondary" })
  includesSecondary!: boolean;

  /**
   * @overrides `listing_count`
   */
  @IsNumber()
  @Min(0)
  @Expose({ name: "listing_count" })
  listingCount!: number;
}
