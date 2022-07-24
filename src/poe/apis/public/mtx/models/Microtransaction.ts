import { IsBoolean, IsInt, IsNotEmpty, IsString } from "class-validator";

export abstract class Microtransaction {
  @IsNotEmpty()
  @IsString()
  id!: string;

  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsString()
  description!: string;

  @IsInt()
  cost!: number;

  @IsBoolean()
  guild!: boolean;
}
