import { IsNotEmpty, IsOptional, IsString, ValidateIf } from "class-validator";

import { Account } from "./Account";

export abstract class Profile extends Account {
  @IsNotEmpty()
  @IsString()
  @ValidateIf((_, val) => val != null)
  uuid!: string | null;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ValidateIf((_, val) => val != null)
  locale?: string | null;
}
