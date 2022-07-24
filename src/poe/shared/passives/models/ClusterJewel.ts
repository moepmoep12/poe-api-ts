import { IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, Min } from "class-validator";

export abstract class ClusterJewel {
  @IsOptional()
  @IsPositive()
  @IsInt()
  size?: number;

  @IsOptional()
  @Min(0)
  @IsInt()
  index?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  // the proxy node skill hash
  proxy?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  // the parent node skill hash
  parent?: string;
}
