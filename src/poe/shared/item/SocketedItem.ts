import { Type } from "class-transformer";
import {
  IsArray,
  IsBoolean,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
  ValidateIf,
  ValidateNested,
} from "class-validator";

import { ItemBase } from "./ItemBase";
import { COLOUR_VALUES, ItemColour } from "./models/ItemColour";
import { Property } from "./models/Property";

/**
 * Represents an item that is socketed into another item, i.e. gems.
 */
export class SocketedItem extends ItemBase {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(/* istanbul ignore next */ () => Property)
  properties!: Property[];

  @Min(0)
  @IsInt()
  socket!: number;

  @IsIn(COLOUR_VALUES)
  @ValidateIf((_, value) => value != null)
  colour!: ItemColour | null;

  @IsOptional()
  @IsBoolean()
  // always true if present
  support?: boolean;

  // these are optional in ItemBase but always provided in SocketedItem
  @IsNotEmpty()
  @IsString()
  override descrText!: string;

  @IsNotEmpty()
  @IsString()
  override secDescrText!: string;

  @IsArray()
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  override explicitMods!: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(/* istanbul ignore next */ () => Property)
  override requirements!: Property[];
}
