import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString, Min } from "class-validator";

export class Property {
  @IsString()
  name!: string;

  @IsArray({ each: true })
  values!: Array<Array<number | string>>;

  @Min(0)
  @IsInt()
  displayMode!: number;

  @IsOptional()
  @Min(0)
  @IsInt()
  type?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  suffix?: string;
}
