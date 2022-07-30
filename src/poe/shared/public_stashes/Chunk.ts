import { Expose, Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsString, ValidateNested } from "class-validator";

import { Transformable } from "../../../common/classes/Transformable";

import { PublicStashChange } from "./PublicStashChange";

export abstract class Chunk extends Transformable {
  @IsString()
  @IsNotEmpty()
  @Type(/* istanbul ignore next */ () => String)
  @Expose({ name: "next_change_id" })
  /**
   * pagination code
   * @overrides `next_change_id`
   */
  public nextChangeId!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(/* istanbul ignore next */ () => PublicStashChange)
  // a maximum of 255 results may be returned
  public stashes!: PublicStashChange[];

  /**
   * Fetches the next public stash changes.
   *
   * @remarks There is currently a 5-minute delay on results using this API
   *
   * @remarks If the stashes array is empty then you have reached the end of the stream.
   * It will then return new results once they become available.
   *
   * @throws [[APIError]]
   */
  public abstract getNext(): Promise<Chunk>;
}
