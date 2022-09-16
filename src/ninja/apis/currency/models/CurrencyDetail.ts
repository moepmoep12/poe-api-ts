import { IsNotEmpty, IsOptional, IsString } from "class-validator";

import { Transformable } from "../../../../common/classes";

export class CurrencyDetail extends Transformable {
  @IsString()
  @IsNotEmpty()
  id!: string;

  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  icon?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  tradeId?: string;
}
