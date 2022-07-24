import { ILadderOptions } from "../../../../shared/ladders/models/Options";

export type SortOptions =
  | "xp" //  sorts the ladder by experience
  | "depth" //sorts the ladder by Delve depth
  | "depthsolo" // sorts the ladder by Delve (Solo) depth
  | "time" // sorts the ladder by objective finish time
  | "score"; // sorts the ladder by objective score

export interface OAuthLadderOptions extends ILadderOptions {
  // The default sort type will either be xp or time depending on the league.
  sort?: SortOptions;
}
