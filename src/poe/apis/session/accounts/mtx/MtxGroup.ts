import { Expose, Type } from "class-transformer";
import { IsArray, IsString, ValidateIf, ValidateNested } from "class-validator";

import { Transformable } from "../../../../../common/classes";

import { MtxItem } from "./MtxItem";

export class MtxGroup extends Transformable {
  @IsString()
  group!: string;

  @IsString()
  groupName!: string;

  @IsString({ each: true })
  @IsArray()
  @ValidateIf((_, val) => val != null)
  tags!: null | string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Expose({ name: "MTXItems" })
  @Type(() => MtxItem)
  /**
   * @overrides `MTXItems`
   */
  items!: MtxItem[];
}
