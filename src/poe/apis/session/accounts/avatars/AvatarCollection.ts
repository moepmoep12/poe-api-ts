import { Exclude, Type } from "class-transformer";

import { Transformable } from "../../../../../common/classes";

import { AvatarsOptions } from "../models";
import * as API from "../API";

import { Avatar } from "./Avatar";
import { Allow, IsArray, IsInt, Min, ValidateNested } from "class-validator";

export class AvatarCollection extends Transformable {
  @Allow()
  @Exclude()
  protected avatarOptions: AvatarsOptions = {
    page: 1,
    perPage: 16,
    custom: false,
  };

  @IsArray()
  @ValidateNested({ each: true })
  @Type(/* istanbul ignore next */ () => Avatar)
  public collection!: Avatar[];

  @Min(0)
  @IsInt()
  public total!: number;

  @Exclude()
  public set options /* istanbul ignore next */(options: AvatarsOptions) {
    this.avatarOptions = { ...this.avatarOptions, ...options };
  }

  /**
   * @remarks
   * Uses the same [[AvatarsOptions]] that have been used getting this avatar collection.
   *
   * @param append If set to `true`, the avatars will be appended to the [[collection]] property
   * @returns The next set of avatars, `null` when there are no more entries
   * @throws [[APIError]]
   */
  public async getNextPage(append = true): Promise<Avatar[] | null> {
    if (typeof this.avatarOptions.page != "number" || this.avatarOptions.page < 1) {
      return null;
    }

    this.avatarOptions.page += 1;

    const collection = await API.getAvatars(this.avatarOptions);

    if (append) {
      this.collection.push(...collection.collection);
      this.total += collection.collection.length;
    }

    return collection.collection;
  }
}
