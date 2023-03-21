import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

import { Transformable } from "../../../common/classes/Transformable";

export class Season extends Transformable {
  @IsNotEmpty()
  @IsString()
  id!: string;

  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsBoolean()
  pvp!: boolean;
}
