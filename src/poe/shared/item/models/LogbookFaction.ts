import { IsEnum, IsNotEmpty, IsString } from "class-validator";

export enum LogbookFactionId {
  Faction1 = "Faction1",
  Faction2 = "Faction2",
  Faction3 = "Faction3",
  Faction4 = "Faction4",
}

export abstract class LogbookFaction {
  @IsEnum(LogbookFactionId)
  id!: LogbookFactionId;

  @IsNotEmpty()
  @IsString()
  name!: string;
}
