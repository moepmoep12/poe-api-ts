import Color from "color";
import { Exclude, Expose, Type } from "class-transformer";
import { Allow, IsBoolean, IsInstance, IsString } from "class-validator";

import { StashTabBase } from "../../../shared/stashes";
import { Colour } from "./models/Colour";
import { Stashes } from "..";
import { IRealmOptions } from "../../../shared";

/**
 * @hidden
 */
export class SessionStashTab extends StashTabBase {
  @Allow()
  @Type(/* istanbul ignore next */ () => Colour)
  protected colour!: Colour;

  @Allow()
  @Exclude()
  protected _league = "";

  @Allow()
  @Exclude()
  protected _accountName = "";

  @Allow()
  @Exclude()
  protected _options?: IRealmOptions;

  @IsBoolean()
  public selected!: boolean;

  @IsString()
  public srcL!: string;

  @IsString()
  public srcC!: string;

  @IsString()
  public srcR!: string;

  @Expose({ name: "n" })
  /**
   * @overrides `n`
   */
  public override name!: string;

  @Expose({ name: "i" })
  /**
   * @overrides `i`
   */
  public override index!: number;

  @IsInstance(Color)
  public override get Color(): Color {
    return new Color(this.colour);
  }

  @Exclude()
  public set league /* istanbul ignore next */(league: string) {
    this._league = league;
  }

  @Exclude()
  public set account /* istanbul ignore next */(account: string) {
    this._accountName = account;
  }

  @Exclude()
  /* istanbul ignore next */
  public set options(options: IRealmOptions) {
    this._options = options;
  }

  /**
   * Updates the items of this stash tab.
   *
   * @remarks
   * Requires [[Settings.sessionId]] to be set.
   * Uses the same options that were used to get this stash tab.
   *
   * @throws [[APIError]]
   */
  public override async update(): Promise<void> {
    this.items = await Stashes.getStashTabItems(
      this._accountName,
      this._league,
      this.index,
      this._options
    );
  }
}
