import { IsIn, IsInt, IsOptional, Min } from "class-validator";

import { Attribute, ATTRIBUTE_VALUES } from "./Attribute";
import { SocketColour, SOCKET_COLOUR_VALUES } from "./SocketColour";

export abstract class Socket {
  @Min(0)
  @IsInt()
  group!: number;

  @IsOptional()
  @IsIn(ATTRIBUTE_VALUES)
  attr?: Attribute;

  @IsOptional()
  @IsIn(SOCKET_COLOUR_VALUES)
  sColour?: SocketColour;
}
