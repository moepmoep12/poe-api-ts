import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsString } from "class-validator";

import { Transformable } from "../../../common/classes";

export class DataDump extends Transformable {
  @IsString()
  @IsNotEmpty()
  leagueName!: string;

  @IsString()
  @IsNotEmpty()
  zipName!: string;

  @IsDate()
  @Type(/* istanbul ignore next */ () => Date)
  minDate!: Date;

  @IsDate()
  @Type(/* istanbul ignore next */ () => Date)
  maxDate!: Date;
}
