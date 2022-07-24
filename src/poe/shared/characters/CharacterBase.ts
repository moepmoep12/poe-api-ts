import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from "class-validator";
import { Transformable } from "../../../common/classes/Transformable";

import { Account } from "../accounts";

import { Character } from "./Character";
import { Experience } from "./models/Experience";

export abstract class CharacterBase extends Transformable {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsString()
  class!: string;

  @IsPositive()
  @IsInt()
  level!: number;

  @Min(0)
  @IsInt()
  experience!: number;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  league?: string;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  id?: string;

  @IsOptional()
  @IsBoolean()
  // always true if present
  expired?: boolean;

  @IsOptional()
  @IsBoolean()
  // always true if present
  deleted?: boolean;

  @IsOptional()
  @IsBoolean()
  // always true if present
  current?: boolean;

  /**
   * Returns the owning account of the character.
   *
   * @remarks For characters belonging to another account, the profile has to be public.
   * @throws [[APIError]]
   */
  public getAccount?(): Promise<Account>;

  /**
   * Returns a character including equipment, inventory, and passives.
   *
   * @throws [[APIError]]
   */
  public abstract getCharacter(): Promise<Character>;

  /**
   * Calculates the current level progression and returns it as a percentage value.
   */
  public get levelProgression(): number {
    for (let i = 1; i <= Experience.length; i++) {
      const nextExp = Experience[i];
      if (nextExp > this.experience) {
        const prevExp = Experience[i - 1];

        const remaining = nextExp - this.experience;
        const max = nextExp - prevExp;
        const value = max - remaining;

        return (value / max) * 100;
      }
    }

    return 0;
  }
}
