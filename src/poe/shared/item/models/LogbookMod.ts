import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsString, ValidateNested } from "class-validator";

import { LogbookFaction } from "./LogbookFaction";

export class LogbookMod {
  @IsNotEmpty()
  @IsString()
  // area name
  name!: string;

  @ValidateNested()
  @Type(() => LogbookFaction)
  faction!: LogbookFaction;

  @IsArray()
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  mods!: string[];
}
