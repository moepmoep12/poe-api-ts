import { Type } from "class-transformer";
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from "class-validator";

import { BlightOil } from "../../models/BlightOil";

import { ClusterJewel } from "./ClusterJewel";
import { MasteryEffect } from "./MasteryEffect";

export abstract class PassiveNode {
  @IsArray()
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  //	node skill hashes of nodes this one connects to
  out!: string[];

  @IsArray()
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  // node skill hashes of nodes connected to this one
  in!: string[];

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  // node hash
  skill?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  icon?: string;

  @IsOptional()
  @IsBoolean()
  // always true if present
  isKeystone?: boolean;

  @IsOptional()
  @IsBoolean()
  // always true if present
  isNotable?: boolean;

  @IsOptional()
  @IsBoolean()
  isMastery?: boolean;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  // inactive mastery image
  inactiveIcon?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  // active mastery image
  activeIcon?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  // mastery effect checkbox image
  activeEffectImage?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MasteryEffect)
  masteryEffects?: MasteryEffect[];

  @IsOptional()
  @IsBoolean()
  // always true if present
  isBlighted?: boolean;

  @IsOptional()
  @IsBoolean()
  // always true if present
  isProxy?: boolean;

  @IsOptional()
  @IsBoolean()
  // always true if present
  isJewelSocket?: boolean;

  @IsOptional()
  @ValidateNested()
  @Type(() => ClusterJewel)
  // cluster jewel information
  expansionJewel?: ClusterJewel;

  @IsOptional()
  @IsArray()
  @IsEnum(BlightOil, { each: true })
  // components required for Blight crafting this node
  recipe?: BlightOil[];

  @IsOptional()
  @Min(0)
  @IsInt()
  //sum of stats on this node that grant strength
  grantedStrength?: number;

  @IsOptional()
  @Min(0)
  @IsInt()
  //	sum of stats on this node that grant dexterity
  grantedDexterity?: number;

  @IsOptional()
  @Min(0)
  @IsInt()
  //	sum of stats on this node that grant intelligence
  grantedIntelligence?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  ascendancyName?: string;

  @IsOptional()
  @IsBoolean()
  // always true if present
  isAscendancyStart?: boolean;

  @IsOptional()
  @IsBoolean()
  // always true if present
  isMultipleChoice?: boolean;

  @IsOptional()
  @IsBoolean()
  // always true if present
  isMultipleChoiceOption?: boolean;

  @IsOptional()
  @Min(0)
  @IsInt()
  grantedPassivePoints?: number;

  @IsOptional()
  @IsArray()
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  // stat descriptions
  stats?: string[];

  @IsOptional()
  @IsArray()
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  reminderText?: string[];

  @IsOptional()
  @IsArray()
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  flavourText?: string[];

  @IsOptional()
  @Min(0)
  @IsInt()
  classStartIndex?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  //	index into the groups table
  group?: string;

  @IsOptional()
  @Min(0)
  @IsInt()
  //the orbit this node occupies within it's group
  orbit?: number;

  @IsOptional()
  @Min(0)
  @IsInt()
  //	the index of this node in the group's orbit
  orbitIndex?: number;
}
