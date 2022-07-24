import { Type } from "class-transformer";
import { IsDate, IsString, ValidateNested } from "class-validator";

import { Transformable } from "../../../../../common/classes";
import { ListedAccount } from "./ListedAccount";

export class Listing extends Transformable {
  @IsString()
  whisper!: string;

  @ValidateNested()
  @Type(() => ListedAccount)
  account!: ListedAccount;

  @IsDate()
  @Type(() => Date)
  indexed!: Date;
}