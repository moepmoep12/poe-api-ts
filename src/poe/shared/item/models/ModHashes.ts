import { IsArray } from "class-validator";

import { Transformable } from "../../../../common/classes";

export class ModHashes extends Transformable {
  @IsArray({ each: true })
  explicit!: Array<[string, Array<number>]>;

  @IsArray({ each: true })
  implicit!: Array<[string, Array<number>]>;
}
