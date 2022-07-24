import { IsNotEmpty, IsString } from "class-validator";

import { Transformable } from "../../../../common/classes/Transformable";
import { League } from "../../leagues";

export abstract class TradeLeague extends Transformable {
  @IsNotEmpty()
  @IsString()
  public id!: string;

  @IsNotEmpty()
  @IsString()
  public text!: string;

  public abstract getLeague(): Promise<League>;
}
