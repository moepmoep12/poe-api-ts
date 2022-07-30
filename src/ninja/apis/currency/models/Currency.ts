import { Expose, Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, Min, ValidateNested } from "class-validator";

import { Transformable } from "../../../../common/classes";

import { Sparkline } from "../../../shared";

import { Exchange } from "./Exchange";

export class Currency extends Transformable {
  @IsNumber()
  @Min(0)
  chaosEquivalent!: number;

  @IsString()
  @IsNotEmpty()
  detailsId!: string;

  /**
   * @overrides `currencyTypeName`
   */
  @IsString()
  @IsNotEmpty()
  @Expose({ name: "currencyTypeName" })
  name!: string;

  /**
   * @overrides `paySparkLine`
   */
  @ValidateNested()
  @Type(/* istanbul ignore next */ () => Sparkline)
  @Expose({ name: "paySparkLine" })
  sellSparkline!: Sparkline;

  /**
   * @overrides `receiveSparkLine`
   */
  @ValidateNested()
  @Type(/* istanbul ignore next */ () => Sparkline)
  @Expose({ name: "receiveSparkLine" })
  buySparkline!: Sparkline;

  /**
   * @overrides `lowConfidencePaySparkLine`
   */
  @ValidateNested()
  @Type(/* istanbul ignore next */ () => Sparkline)
  @Expose({ name: "lowConfidencePaySparkLine" })
  lowConfidenceSellSparkline!: Sparkline;

  /**
   * @overrides `lowConfidenceReceiveSparkLine`
   */
  @ValidateNested()
  @Type(/* istanbul ignore next */ () => Sparkline)
  @Expose({ name: "lowConfidenceReceiveSparkLine" })
  lowConfidenceBuySparkline!: Sparkline;

  /**
   * @overrides `pay`
   */
  @ValidateNested()
  @Expose({ name: "pay" })
  @Type(/* istanbul ignore next */ () => Exchange)
  sell?: Exchange;

  /**
   * @overrides `receive`
   */
  @ValidateNested()
  @Expose({ name: "receive" })
  @Type(/* istanbul ignore next */ () => Exchange)
  buy?: Exchange;
}
