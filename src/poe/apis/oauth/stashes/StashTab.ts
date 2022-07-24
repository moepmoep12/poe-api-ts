import Color from "color";
import { Exclude, Type } from "class-transformer";
import { Allow, IsArray, IsOptional, IsString, ValidateNested } from "class-validator";

import { StashTabBase } from "../../../shared/stashes";

import { Stashes } from "..";

import { StashTabMetadata } from "./models";

/**
 * @hidden
 */
export class OAuthStashTab extends StashTabBase {
  @Allow()
  @Exclude()
  protected _league = "";

  @ValidateNested()
  @Type(() => StashTabMetadata)
  public metadata!: StashTabMetadata;

  @IsOptional()
  @IsString()
  // parent ID
  public parent?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OAuthStashTab)
  public children?: OAuthStashTab[];

  public set league(league: string) {
    this._league = league;
  }

  public override get Color(): Color {
    return new Color(`#${this.metadata.colour}`);
  }

  public override async update(): Promise<void> {
    let tab: StashTabBase;
    if (this.parent) {
      tab = await Stashes.getStashTab(this._league, this.parent, this.id);
    } else {
      tab = await Stashes.getStashTab(this._league, this.id);
    }
    Object.assign(this, tab);
  }
}
