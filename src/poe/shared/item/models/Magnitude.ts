import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Transformable } from "../../../../common/classes";

export class Magnitude extends Transformable {
  @IsString()
  @IsNotEmpty()
  hash!: string;

  @IsNumber()
  min!: number;
  @IsNumber()
  max!: number;
}
