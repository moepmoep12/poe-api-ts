import { IsNotEmpty, IsString } from "class-validator";

import { Guild } from "../../../shared/guilds";

/**
 * @hidden
 */
export class SessionGuild extends Guild {
  @IsNotEmpty()
  @IsString()
  id!: string;
}
