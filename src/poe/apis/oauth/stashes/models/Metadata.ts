import { IsBoolean, IsInt, IsOptional, IsString, Min, ValidateNested } from "class-validator";

export class MapMetaData {
  @IsInt()
  @Min(0)
  series!: number;
}

export class StashTabMetadata {
  @IsString()
  // 6 digit hex colour
  colour!: string;

  @IsOptional()
  @IsBoolean()
  // always true if present
  public?: boolean;

  @IsOptional()
  @IsBoolean()
  // always true if present
  folder?: boolean;

  @IsOptional()
  @ValidateNested()
  map?: MapMetaData;
}
