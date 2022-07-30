import { Type } from "class-transformer";
import { IsArray, IsInt, Min, ValidateNested } from "class-validator";
import { Transformable } from "../../../common/classes/Transformable";
import { PvpLadderTeamEntry } from "./PvpLadderTeamEntry";

export abstract class PvpLadder extends Transformable {
  @Min(0)
  @IsInt()
  total!: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(/* istanbul ignore next */ () => PvpLadderTeamEntry)
  entries!: PvpLadderTeamEntry[];
}
