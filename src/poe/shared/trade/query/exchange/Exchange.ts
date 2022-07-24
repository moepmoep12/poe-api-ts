import { IsInt, IsNotEmpty, IsString, Min } from "class-validator";

import { Transformable } from "../../../../../common/classes";

export class Exchange extends Transformable {
  @IsString()
  @IsNotEmpty()
  currency!: string;

  @IsInt()
  @Min(0)
  amount!: number;

  @IsString()
  @IsNotEmpty()
  whisper!: string;
}
