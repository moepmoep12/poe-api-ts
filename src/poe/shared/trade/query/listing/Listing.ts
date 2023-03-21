import { Type } from "class-transformer";
import { IsDate, IsOptional, IsString, ValidateNested } from "class-validator";

import { Transformable } from "../../../../../common/classes";
import { ListedAccount } from "./ListedAccount";

export class Listing extends Transformable {
  @IsOptional()
  @IsString()
  whisper?: string;

  @IsOptional()
  @IsString()
  // only present when POESESSID is provided
  whisper_token?: string;

  @ValidateNested()
  @Type(/* istanbul ignore next */ () => ListedAccount)
  account!: ListedAccount;

  @IsDate()
  @Type(/* istanbul ignore next */ () => Date)
  indexed!: Date;
}
