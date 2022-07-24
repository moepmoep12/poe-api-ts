import { IsNumber, IsOptional, IsString } from "class-validator";

export class TradeInfo {
  @IsString()
  mod!: string;

  @IsNumber()
  min!: number;

  @IsNumber()
  max!: number;

  @IsOptional()
  @IsString()
  option?: string;
}
