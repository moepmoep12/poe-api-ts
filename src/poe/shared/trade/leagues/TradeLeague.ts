import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

import { Transformable } from "../../../../common/classes/Transformable";
import { League } from "../../leagues";
import { Realm } from "../../models";

export abstract class TradeLeague extends Transformable {
  @IsNotEmpty()
  @IsString()
  public id!: string;

  @IsNotEmpty()
  @IsString()
  public text!: string;

  @IsOptional()
  @IsEnum(Realm)
  public realm?: Realm;

  public abstract getLeague(): Promise<League>;
}
