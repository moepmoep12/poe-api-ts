import Color from "color";
import { Exclude, Type } from "class-transformer";
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
  @Type(/* istanbul ignore next */ () => StashTabMetadata)
  public metadata!: StashTabMetadata;

  @IsOptional()
  @IsString()
  // parent ID
  public parent?: string;

  @Type(/* istanbul ignore next */ () => OAuthStashTab)
  public children?: OAuthStashTab[];

  @Exclude()
  public set league /* istanbul ignore next */(league: string) {
    this._league = league;
    if (this.children) {
      for (const child of this.children) {
        child.league = league;
      }
    }
  }

  /* istanbul ignore next */
  public override get Color(): Color {
    return new Color(`#${this.metadata.colour}`);
  }

  /* istanbul ignore next */
  public override async update(): Promise<void> {
    const tab = await Stashes.getStashTab(this._league, this.id);
    Object.assign(this, tab);
  }
}
