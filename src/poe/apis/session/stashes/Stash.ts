import { Exclude, Type } from "class-transformer";

import { Stash } from "../../../shared/stashes";
import { Item } from "../../../shared/item";

import { SessionStashTab } from "./StashTab";
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from "class-validator";

/**
 * @hidden
 */
export class LayoutSection {
  @IsNumber()
  x!: number;

  @IsNumber()
  y!: number;

  @IsInt()
  w!: number;

  @IsInt()
  h!: number;

  @IsOptional()
  @IsString()
  section?: string;

  @IsOptional()
  @IsBoolean()
  hidden?: boolean;
}

/**
 * @hidden
 */
export class CurrencyLayout {
  @IsArray()
  sections!: string[];

  @IsObject()
  @Type(/* istanbul ignore next */ () => LayoutSection)
  layout!: Record<string, LayoutSection>;
}

/**
 * @hidden
 */
export class SessionStash extends Stash<SessionStashTab> {
  @Type(/* istanbul ignore next */ () => SessionStashTab)
  public override tabs!: SessionStashTab[];

  @IsOptional()
  @Type(/* istanbul ignore next */ () => CurrencyLayout)
  public currencyLayout?: CurrencyLayout;

  @Exclude()
  private items?: Item[];
}
