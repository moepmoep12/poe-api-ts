import { Type } from "class-transformer";
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
  ValidateNested,
} from "class-validator";
import { Transformable } from "../../../common/classes";
import { Sparkline } from "../history";
import { Modifier } from "./models";

export class ItemBase extends Transformable {
  @IsInt()
  @Min(0)
  id!: number;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsInt()
  @Min(0)
  itemClass!: number;

  @ValidateNested()
  @Type(() => Sparkline)
  sparkline!: Sparkline;

  @ValidateNested()
  @Type(() => Sparkline)
  lowConfidenceSparkline!: Sparkline;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Modifier)
  implicitModifiers!: Modifier[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Modifier)
  explicitModifiers!: Modifier[];

  @IsNumber()
  @Min(0)
  chaosValue!: number;

  @IsNumber()
  @Min(0)
  exaltedValue!: number;

  @IsInt()
  @Min(0)
  count!: number;

  @IsString()
  @IsNotEmpty()
  detailsId!: string;

  @IsInt()
  @Min(0)
  listingCount!: number;

  @IsString()
  icon = "";

  @IsString()
  flavourText = "";

  @IsInt()
  @Min(1)
  @Max(100)
  levelRequired = 1;

  // @IsOptional()
  // @ValidateNested()
  // @Type(() => TradeInfo)
  // tradeInfo?: TradeInfo;

  // @IsOptional()
  // @IsString()
  // baseType?: string;

  // @IsOptional()
  // @IsString()
  // @IsNotEmpty()
  // icon?: string;

  // @IsOptional()
  // @IsString()
  // variant?: string;

  // @IsOptional()
  // @IsString()
  // prophecyText?: string;

  // @IsOptional()
  // @IsString()
  // artFilename?: string;

  // @IsOptional()
  // @IsString()
  // flavourText?: string;

  // @IsOptional()
  // @IsString()
  // mapRegion?: string;

  // @IsOptional()
  // @IsString()
  // itemType?: string;

  // @IsOptional()
  // @IsInt()
  // @Min(0)
  // mapTier?: number;

  // @IsOptional()
  // @IsInt()
  // @Min(0)
  // levelRequired?: number;

  // @IsOptional()
  // @IsInt()
  // @Min(0)
  // stackSize?: number;

  // @IsOptional()
  // @IsInt()
  // @Min(0)
  // links?: number;

  // @IsOptional()
  // @IsInt()
  // @Min(0)
  // gemLevel?: number;

  // @IsOptional()
  // @IsInt()
  // @Min(0)
  // gemQuality?: number;

  // @IsOptional()
  // @IsBoolean()
  // corrupted?: boolean;
}
