import { IsBoolean, IsString } from "class-validator";

import { Transformable } from "../../../../common/classes";

export class Modifier extends Transformable {
  @IsString()
  text!: string;

  @IsBoolean()
  optional!: boolean;
}
