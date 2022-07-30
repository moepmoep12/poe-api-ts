import { Type } from "class-transformer";
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";

import { Transformable } from "../../../common/classes/Transformable";

import { Realm } from "../../shared";

import { Ladder } from "../ladders/Ladder";
import { ILadderOptions } from "../ladders/models/Options";

import { LeagueRule } from "./LeagueRule";

/**
 * League entity as defined in https://www.pathofexile.com/developer/docs/reference#type-League
 */
export abstract class League extends Transformable {
  @IsNotEmpty()
  @IsString()
  // the league's name
  id!: string;

  @IsOptional()
  @IsEnum(Realm)
  realm?: Realm;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  // a url link to a Path of Exile forum thread
  url?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(/* istanbul ignore next */ () => LeagueRule)
  rules?: LeagueRule[];

  @IsOptional()
  @IsDate()
  @Type(/* istanbul ignore next */ () => Date)
  registerAt?: Date;

  @IsOptional()
  @IsDate()
  @Type(/* istanbul ignore next */ () => Date)
  startAt?: Date;

  @IsOptional()
  @IsDate()
  @Type(/* istanbul ignore next */ () => Date)
  endAt?: Date;

  @IsOptional()
  @IsBoolean()
  // always true if present
  event?: boolean;

  @IsOptional()
  @IsBoolean()
  // always true if present
  timedEvent?: boolean;

  @IsOptional()
  @IsBoolean()
  // always true if present
  scoreEvent?: boolean;

  @IsOptional()
  @IsBoolean()
  // always true if present
  delveEvent?: boolean;

  @IsOptional()
  @ValidateNested()
  @Type(/* istanbul ignore next */ () => Ladder)
  ladder?: Ladder;

  /**
   * @remarks
   * If `store` is set to true the [[ladder]] property will be overwritten.
   *
   * @param options
   * @param store If set to `true`, the ladder will be saved in the [[ladder]] property
   * @returns The ladder for this league
   * @throws [[APIError]]
   */
  abstract getLadder<T extends ILadderOptions>(store: boolean, options?: T): Promise<Ladder>;
}

// export function isLeague(obj: unknown): obj is League {
//   return (
//     isTransformable(obj) &&
//     //
//     "id" in obj &&
//     typeof (obj as League).id == "string" &&
//     "getLadder" in obj &&
//     typeof (obj as League).getLadder == "function" &&
//     //
//     ("realm" in obj ? Object.values(Realm).includes((obj as League).realm as Realm) : true) &&
//     ("url" in obj ? typeof (obj as League).url == "string" : true) &&
//     ("description" in obj ? typeof (obj as League).description == "string" : true) &&
//     ("registerAt" in obj ? (obj as League).registerAt instanceof Date : true) &&
//     ("startAt" in obj ? (obj as League).startAt instanceof Date : true) &&
//     ("endAt" in obj ? (obj as League).endAt instanceof Date : true) &&
//     ("event" in obj ? typeof (obj as League).event == "boolean" : true) &&
//     ("timedEvent" in obj ? typeof (obj as League).timedEvent == "boolean" : true) &&
//     ("scoreEvent" in obj ? typeof (obj as League).scoreEvent == "boolean" : true) &&
//     ("delveEvent" in obj ? typeof (obj as League).delveEvent == "boolean" : true) &&
//     ("ladder" in obj ? isLadder((obj as League).ladder) : true) &&
//     ("rules" in obj
//       ? Array.isArray((obj as League).rules) &&
//         // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
//         (obj as League).rules!.every((val) => isLeagueRule(val))
//       : true)
//   );
// }
