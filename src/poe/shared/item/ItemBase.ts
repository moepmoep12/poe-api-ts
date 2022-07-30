import { Transformable } from "../../../common/classes/Transformable";
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Min,
  ValidateNested,
} from "class-validator";

import { LogbookMod } from "./models/LogbookMod";
import { Property } from "./models/Property";
import { AdditionalProperty } from "./models/AdditionalProperty";
import { UltimatumMod } from "./models/UltimatumMod";
import { Hybrid } from "./models/Hybrid";
import { Extended } from "./models/Extended";
import { Scourged } from "./models/Scourged";
import { Type } from "class-transformer";

/***
 * @hidden
 */
export abstract class ItemBase extends Transformable {
  @IsBoolean()
  verified!: boolean;

  @Min(0)
  @IsInt()
  w!: number;

  @Min(0)
  @IsInt()
  h!: number;

  @IsNotEmpty()
  @IsString()
  icon!: string;

  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsString()
  typeLine!: string;

  @IsNotEmpty()
  @IsString()
  baseType!: string;

  @IsBoolean()
  identified!: boolean;

  @Min(0)
  @IsInt()
  // should be present on all items though it is marked optional in the API reference
  ilvl!: number;

  @Min(0)
  @IsInt()
  // should be present on all items though it is marked optional in the API reference
  frameType!: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  league?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  id?: string;

  @IsOptional()
  @IsPositive()
  @IsInt()
  stackSize?: number;

  @IsOptional()
  @IsPositive()
  @IsInt()
  maxStackSize?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  // a unique 64 digit hexadecimal string
  forum_note?: string;

  @IsOptional()
  @IsBoolean()
  // always true if present
  searing?: boolean;

  @IsOptional()
  @IsBoolean()
  // always true if present
  tangled?: boolean;

  @IsOptional()
  @IsBoolean()
  // always true if present
  abyssJewel?: boolean;

  @IsOptional()
  @IsBoolean()
  // always true if present
  fractured?: boolean;

  @IsOptional()
  @IsBoolean()
  // always true if present
  synthesised?: boolean;

  @IsOptional()
  @IsBoolean()
  // always true if present
  lockedToCharacter?: boolean;

  @IsOptional()
  @IsBoolean()
  // always true if present
  lockedToAccount?: boolean;

  @IsOptional()
  @IsBoolean()
  // always true if present
  split?: boolean;

  @IsOptional()
  @IsBoolean()
  // always true if present
  corrupted?: boolean;

  @IsOptional()
  @IsBoolean()
  // always true if present
  unmodifiable?: boolean;

  @IsOptional()
  @IsBoolean()
  // always true if present
  cisRaseReward?: boolean;

  @IsOptional()
  @IsBoolean()
  // always true if present
  seaRaceReward?: boolean;

  @IsOptional()
  @IsBoolean()
  // always true if present
  thRaceReward?: boolean;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(/* istanbul ignore next */ () => Property)
  notableProperties?: Property[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(/* istanbul ignore next */ () => Property)
  requirements?: Property[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(/* istanbul ignore next */ () => AdditionalProperty)
  additionalProperties?: AdditionalProperty[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(/* istanbul ignore next */ () => Property)
  nextLevelRequirements?: Property[];

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  descrText?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  secDescrText?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(/* istanbul ignore next */ () => LogbookMod)
  logbookMods?: LogbookMod[];

  @IsOptional()
  @IsArray()
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  implicitMods?: string[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(/* istanbul ignore next */ () => UltimatumMod)
  ultimatumMods?: UltimatumMod[];

  @IsOptional()
  @IsArray()
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  explicitMods?: string[];

  @IsOptional()
  @IsArray()
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  fracturedMods?: string[];

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  flavourTextParsed?: string;

  @IsOptional()
  @ValidateNested()
  @Type(/* istanbul ignore next */ () => Hybrid)
  hybrid?: Hybrid;

  @IsOptional()
  @ValidateNested()
  @Type(/* istanbul ignore next */ () => Extended)
  extended?: Extended;

  @IsOptional()
  @ValidateNested()
  @Type(/* istanbul ignore next */ () => Scourged)
  scourged?: Scourged;

  @IsOptional()
  @IsArray()
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  scourgeMods?: string[];
}
