import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from "class-validator";

export abstract class PassiveClusterGroup {
  @Min(0)
  @IsNumber()
  x!: number;

  @Min(0)
  @IsNumber()
  y!: number;

  @IsArray()
  @Min(0, { each: true })
  @IsInt({ each: true })
  orbits!: number[];

  @IsArray()
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  // the node skill hashes associated with this group
  nodes!: string[];

  @IsOptional()
  @IsBoolean()
  // always true if present
  isProxy?: boolean;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  // skill hash of the placeholder node
  proxy?: string;
}
