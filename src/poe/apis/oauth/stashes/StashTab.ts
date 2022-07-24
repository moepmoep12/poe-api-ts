import Color from "color";
import { Type } from "class-transformer";
import { Allow, IsOptional, IsString, ValidateNested } from "class-validator";

import { StashTabBase } from "../../../shared/stashes";

import { Stashes } from "..";

import { StashTabMetadata } from "./models";

/**
 * @hidden
 */
export class OAuthStashTab extends StashTabBase {
  @Allow()
  protected _league = "";

  @ValidateNested()
  @Type(() => StashTabMetadata)
  public metadata!: StashTabMetadata;

  @IsOptional()
  @IsString()
  // parent ID
  public parent?: string;

  @Type(() => OAuthStashTab)
  public children?: OAuthStashTab[];

  public set league(league: string) {
    this._league = league;
    if (this.children) {
      for (const child of this.children) {
        child.league = league;
      }
    }
  }

  public override get Color(): Color {
    return new Color(`#${this.metadata.colour}`);
  }

  public override async update(): Promise<void> {
    const tab = await Stashes.getStashTab(this._league, this.id);
    Object.assign(this, tab);
  }
}
