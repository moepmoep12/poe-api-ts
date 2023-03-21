import { Type } from "class-transformer";
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";

import { Transformable } from "../../../common/classes/Transformable";
import { LeagueRule } from "../leagues";

import { Realm } from "../models";

import { PvpStyle } from "./models";

/**
 * Definition as in https://www.pathofexile.com/developer/docs/reference#type-PvPMatch
 */
export abstract class PvpMatch extends Transformable {
  @IsNotEmpty()
  @IsString()
  //	the match's name
  public id!: string;

  @IsNotEmpty()
  @IsString()
  public description!: string;

  @IsBoolean()
  public glickoRatings!: boolean;

  @IsBoolean()
  // always true
  public pvp!: boolean;

  @IsEnum(PvpStyle)
  public style!: PvpStyle;

  @IsArray()
  @Type(/* istanbul ignore next */ () => LeagueRule)
  public rules!: LeagueRule[];

  @IsOptional()
  @IsEnum(Realm)
  //	pc, xbox, or sony
  public realm?: Realm;

  @IsOptional()
  @IsDate()
  @Type(/* istanbul ignore next */ () => Date)
  public startAt?: Date;

  @IsOptional()
  @IsDate()
  @Type(/* istanbul ignore next */ () => Date)
  public endAt?: Date;

  @IsOptional()
  @IsDate()
  @Type(/* istanbul ignore next */ () => Date)
  public registerAt?: Date;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  //	a url link to a Path of Exile forum thread
  public url?: string;

  @IsOptional()
  @IsBoolean()
  // always true if present
  public upcoming?: boolean;

  @IsOptional()
  @IsBoolean()
  // always true if present
  public inProgress?: boolean;
}
