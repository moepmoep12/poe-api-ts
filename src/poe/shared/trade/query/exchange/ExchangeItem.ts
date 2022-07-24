import { IsInt, IsNotEmpty, IsString, Min } from "class-validator";

import { Exchange } from "./Exchange";

export class ExchangeItem extends Exchange {
  @IsInt()
  @Min(0)
  stock!: number;

  @IsString()
  @IsNotEmpty()
  id!: string;
}
