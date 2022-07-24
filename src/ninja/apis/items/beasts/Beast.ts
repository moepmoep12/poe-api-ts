import { IsString } from "class-validator";

import { ItemBase } from "../../../shared/items";

export class Beast extends ItemBase {
  @IsString()
  baseType!: string;
}
