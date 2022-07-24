import { IsEnum, IsObject } from "class-validator";

import { LanguageCode } from "./models";

export class Language {
  @IsEnum(LanguageCode)
  name!: LanguageCode;

  @IsObject()
  translations!: { [key: string]: string };
}
