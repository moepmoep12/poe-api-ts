import { Type } from "class-transformer";
import {
  IsBoolean,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
  ValidateIf,
  ValidateNested,
} from "class-validator";
import { Microtransaction } from "./Microtransaction";

export abstract class Entry {
  @Min(0)
  @IsInt()
  id!: number;

  @IsDate()
  @Type(() => Date)
  startAt!: Date;

  @IsDate()
  @Type(() => Date)
  endAt!: Date;

  @IsNotEmpty()
  @IsString()
  imageUrl!: string;

  @IsNotEmpty()
  @IsString()
  url!: string;

  @IsNotEmpty()
  @IsString()
  description!: string;

  @IsNotEmpty()
  @IsString()
  specialType!: string;

  @Min(0)
  @IsInt()
  cost!: number;

  @Min(0)
  @IsInt()
  priority!: number;

  @IsNotEmpty()
  @IsString()
  @ValidateIf((_, val) => val != null)
  platform!: string | null;

  @ValidateNested()
  @Type(() => Microtransaction)
  microtransaction!: Microtransaction;

  @IsOptional()
  @IsBoolean()
  category!: boolean;

  @IsOptional()
  @IsBoolean()
  countdownSpecial!: boolean;

  @IsOptional()
  @IsString()
  @ValidateIf((_, val) => val != null)
  countdownImage?: string | null;
}
