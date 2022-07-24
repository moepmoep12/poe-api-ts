import { Character, CharacterBase } from "../../../shared/characters";

import { Characters } from "..";
import { IsBoolean, IsInt, IsOptional, Min } from "class-validator";

/**
 * @hidden
 */
export class SessionCharacterBase extends CharacterBase {
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
    return await Characters.getByName(this.name);
  }
}
