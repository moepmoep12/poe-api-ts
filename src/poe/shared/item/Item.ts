import { Type } from "class-transformer";
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Min,
  ValidateNested,
} from "class-validator";

import { InventoryId } from "./models/InventoryId";
import { IncubatedItem, Influences, Property, Socket } from "./models";
import { ItemBase } from "./ItemBase";
import { SocketedItem } from "./SocketedItem";

export class Item extends ItemBase {
  @IsOptional()
  @IsString()
  inventoryId?: InventoryId | string;

  @IsOptional()
  @Min(0)
  @IsInt()
  x?: number;

  @IsOptional()
  @Min(0)
  @IsInt()
  y?: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Socket)
  sockets?: Socket[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Property)
  properties?: Property[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  flavourText?: string[];

  @IsOptional()
  @IsArray()
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  craftedMods?: string[];

  @IsOptional()
  @IsArray()
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  enchantMods?: string[];

  @IsOptional()
  @Min(0)
  @IsInt()
  itemLevel?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  prophecyText?: string;

  @IsOptional()
  @IsArray()
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  utilityMods?: string[];

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  artFilename?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  note?: string;

  @IsOptional()
  @IsPositive()
  @IsInt()
  talismanTier?: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => Influences)
  influences?: Influences;

  @IsOptional()
  @IsBoolean()
  elder?: boolean;

  @IsOptional()
  @IsBoolean()
  shaper?: boolean;

  @IsOptional()
  @ValidateNested()
  @Type(() => IncubatedItem)
  incubatedItem?: IncubatedItem;

  @IsOptional()
  @IsBoolean()
  delve?: boolean;

  @IsOptional()
  @IsArray()
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  veiledMods?: string[];

  @IsOptional()
  @IsBoolean()
  veiled?: boolean;

  @IsOptional()
  @IsBoolean()
  duplicated?: boolean;

  @IsOptional()
  @IsBoolean()
  isRelic?: boolean;

  @IsOptional()
  @IsArray()
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  cosmeticMods?: string[];

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  stackSizeText?: string;

  @IsOptional()
  @IsBoolean()
  replica?: boolean;

  @IsOptional()
  @IsBoolean()
  cisRaceReward?: boolean;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SocketedItem)
  socketedItems?: SocketedItem[];
}
