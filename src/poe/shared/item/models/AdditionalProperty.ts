import { IsNumber, IsOptional, Min } from "class-validator";

import { Property } from "./Property";

export class AdditionalProperty extends Property {
  @IsOptional()
  @Min(0)
  @IsNumber()
  // rounded to 2 decimal places
  progress?: number;
}
