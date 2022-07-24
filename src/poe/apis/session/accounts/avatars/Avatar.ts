import { Expose } from "class-transformer";
import { IsBoolean, IsInt, IsOptional, IsString, Min, ValidateIf } from "class-validator";

import { Transformable } from "../../../../../common/classes";

export class Avatar extends Transformable {
  @Min(0)
  @IsInt()
  @Expose({ name: "avatar_id" })
  /**
   * @overrides `avatar_id`
   */
  id!: number;

  @IsBoolean()
  custom!: boolean;

  @IsString()
  image!: string;

  @IsBoolean()
  current!: boolean;

  @IsOptional()
  @ValidateIf((val) => val != null)
  @IsString()
  name?: string | null;
}
