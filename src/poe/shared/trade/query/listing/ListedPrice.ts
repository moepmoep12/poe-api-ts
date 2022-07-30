import { Type } from "class-transformer";
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
  ValidateNested,
} from "class-validator";

import { Transformable } from "../../../../../common/classes";

export abstract class Exchange extends Transformable {
  @IsString()
  @IsNotEmpty()
  currency!: string;

  @IsNumber()
  @Min(0)
  amount!: number;
}

export abstract class PricedItem {
  @IsString()
  id!: string;

  @IsString()
  currency!: string;

  @IsInt()
  @IsPositive()
  amount!: number;

  @IsInt()
  @IsPositive()
  stock!: number;
}

export abstract class ListedPrice extends Transformable {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  type?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  amount?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  currency?: string;

  @IsOptional()
  @IsString()
  tag?: string;

  @IsOptional()
  @ValidateNested()
  @Type(/* istanbul ignore next */ () => Exchange)
  exchange?: Exchange;

  @IsOptional()
  @ValidateNested()
  @Type(/* istanbul ignore next */ () => PricedItem)
  item?: PricedItem;
}
