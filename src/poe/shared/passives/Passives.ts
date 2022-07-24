import { Transform, Type } from "class-transformer";
import { IsArray, IsEnum, IsInt, IsOptional, Min, ValidateNested } from "class-validator";

import { InventoryItem } from "../item";

import { BanditChoice } from "./models/BanditChoice";
import { ItemJewelData } from "./models/ItemJewelData";
import { PantheonMajor, PantheonMinor } from "./models/Pantheon";

export class Passives {
  @IsArray()
  @Min(0, { each: true })
  @IsInt({ each: true })
  hashes!: number[];

  @IsArray()
  @Min(0, { each: true })
  @IsInt({ each: true })
  hashes_ex!: number[];

  @IsInt({ each: true })
  @Min(0, { each: true })
  @Type((type) =>
    Array.isArray(type?.object[type?.property]) ? Array<number> : Map<string, number>
  )
  @Transform((params) =>
    Array.isArray(params.value)
      ? params.value.map((val) => parseInt(val as string))
      : (params.value as Map<string, number>)
  )
  // the key is the string value of the mastery node skill hash and the value is the selected effect hash
  mastery_effects!: Map<string, number> | Array<number>;

  @ValidateNested({ each: true })
  @Type(() => ItemJewelData)
  // the key is the string value of the x property of an item from the jewels array
  jewel_data!: Map<string, ItemJewelData>;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InventoryItem)
  jewels!: InventoryItem[];

  @IsOptional()
  @IsEnum(BanditChoice)
  bandit_choice?: BanditChoice;

  @IsOptional()
  @IsEnum(PantheonMajor)
  pantheon_major?: PantheonMajor;

  @IsOptional()
  @IsEnum(PantheonMinor)
  pantheon_minor?: PantheonMinor;
}
