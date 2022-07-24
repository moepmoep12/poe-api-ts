import { Type } from "class-transformer";
import { IsEnum, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";

import { Transformable } from "../../../common/classes/Transformable";

import { CharacterBase } from "../characters";
import { Guild } from "../guilds";
import { IRealmOptions } from "../models";
import { Realm } from "../models/Realm";
import { Stream } from "../streams/Stream";

export abstract class Account extends Transformable {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsEnum(Realm)
  realm!: Realm;

  @IsOptional()
  @ValidateNested()
  @Type(() => Stream)
  twitch?: Stream;

  @IsOptional()
  @ValidateNested()
  @Type(() => Guild)
  guild?: Guild;

  /**
   * @remarks
   * Trying to get characters when the profile or character tab is private will result in an error.
   *
   * @param options
   * @returns A list of characters from this account
   * @throws [[APIError]]
   */
  public abstract getCharacters?<T extends IRealmOptions>(options?: T): Promise<CharacterBase[]>;
}
