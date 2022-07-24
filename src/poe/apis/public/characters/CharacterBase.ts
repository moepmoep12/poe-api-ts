import { Allow, IsBoolean, IsInt, IsOptional, Min } from "class-validator";

import { Character, CharacterBase } from "../../../shared/characters";

import { Characters } from "..";
import { Exclude } from "class-transformer";

/**
 * @hidden
 */
export class PublicCharacterBase extends CharacterBase {
  @Allow()
  @Exclude()
  private _accountName!: string;

  public set accountName(name: string) {
    this._accountName = name;
  }

  @IsInt()
  @Min(0)
  public classId!: number;

  @IsInt()
  @Min(0)
  public ascendancyClass!: number;

  @IsOptional()
  @IsBoolean()
  public pinnable?: boolean;

  public async getCharacter(): Promise<Character> {
    return await Characters.getByName(this._accountName, this.name);
  }
}
