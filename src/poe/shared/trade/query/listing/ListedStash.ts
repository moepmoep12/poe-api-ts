import { IsInt, IsString, Min } from "class-validator";
import { Transformable } from "../../../../../common/classes";

export abstract class ListedStash extends Transformable {
  @IsString()
  name!: string;

  @Min(0)
  @IsInt()
  x!: number;

  @Min(0)
  @IsInt()
  y!: number;
}
