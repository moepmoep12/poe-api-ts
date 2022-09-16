import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Realm } from "../../../models";

export abstract class IgnoredAccount {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsEnum(Realm)
  realm!: Realm;
}
