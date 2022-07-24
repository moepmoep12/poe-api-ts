import { IsInt, IsNotEmpty, IsString, Min } from "class-validator";

export class UltimatumMod {
  @IsNotEmpty()
  @IsString()
  // text used to display ultimatum icons
  type!: string;

  @Min(0)
  @IsInt()
  tier!: number;
}
