import { IsNotEmpty, IsString } from "class-validator";

export abstract class IgnoredAccount {
  @IsNotEmpty()
  @IsString()
  name!: string;
}
