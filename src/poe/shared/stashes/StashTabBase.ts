import { Type } from "class-transformer";
import { IsArray, IsEnum, IsInt, IsNotEmpty, IsString, Min, ValidateNested } from "class-validator";
import Color from "color";

import { Transformable } from "../../../common/classes/Transformable";

import { Item } from "../item/Item";

import { StashType } from "./models";

export abstract class StashTabBase extends Transformable {
  @IsNotEmpty()
  @IsString()
  public name!: string;

  @Min(0)
  @IsInt()
  public index!: number;

  @IsNotEmpty()
  @IsString()
  public id!: string;

  @IsEnum(StashType)
  public type!: StashType;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Item)
  public items?: Item[] = [];

  public abstract get Color(): Color;

  /**
   * Updates the values of this stash tab, including the items.
   * @throws [[APIError]]
   */
  public abstract update(): Promise<void>;
}
