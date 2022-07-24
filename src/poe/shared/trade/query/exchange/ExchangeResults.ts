import { Expose, Type } from "class-transformer";
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateIf,
  ValidateNested,
} from "class-validator";

import { Transformable } from "../../../../../common/classes";
import { ExchangeResult } from "./ExchangeResult";

export class ExchangeResults extends Transformable {
  @IsString()
  @IsNotEmpty()
  id!: string;

  @IsNumber()
  @ValidateIf((_, val) => val != null)
  complexity!: number | null;

  @Min(0)
  @IsInt()
  total!: number;

  @ValidateNested({ each: true })
  @Expose({ name: "result" })
  @Type(() => ExchangeResult)
  /**
   * @overrides `result`
   */
  results!: Map<string, ExchangeResult>;

  @IsOptional()
  @IsBoolean()
  inexact?: boolean;
}
