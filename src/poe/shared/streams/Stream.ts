import { Expose } from "class-transformer";
import { IsString, IsInt, IsOptional, IsNotEmpty, Min } from "class-validator";

import { Transformable } from "../../../common/classes/Transformable";

export abstract class Stream extends Transformable {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  image?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  status?: string;

  @IsOptional()
  @Min(0)
  @IsInt()
  viewers?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  id?: string;

  @IsNotEmpty()
  @IsString()
  @Expose({ name: "url" })
  get url(): string {
    return `https://twitch.tv/${this.name.toLowerCase()}`;
  }
}
