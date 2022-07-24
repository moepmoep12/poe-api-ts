import { Type } from "class-transformer";
import { IsArray, ValidateNested } from "class-validator";

import { Transformable } from "../../../../common/classes";
import { Stream } from "../../../shared/streams";

/**
 * @hidden
 */
export class Response extends Transformable {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Stream)
  streams!: Stream[];
}
