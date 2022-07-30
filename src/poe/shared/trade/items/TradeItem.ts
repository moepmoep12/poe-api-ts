import { Type } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { Transformable } from "../../../../common/classes";
import { Flags } from "./models/Flags";

export abstract class TradeItem extends Transformable {
  @IsString()
  @IsNotEmpty()
  type!: string;

  @IsString()
  @IsNotEmpty()
  text!: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @ValidateNested()
  @Type(/* istanbul ignore next */ () => Flags)
  flags?: Flags;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  disc?: string;
}
