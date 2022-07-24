import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";

import { PassiveClusterGroup } from "./PassiveClusterGroup";
import { PassiveNode } from "./PassiveNode";

export abstract class Subgraph {
  @ValidateNested({ each: true })
  @Type(() => PassiveClusterGroup)
  // the key is the string value of the group id
  groups!: Map<string, PassiveClusterGroup>;

  @ValidateNested({ each: true })
  @Type(() => PassiveNode)
  // the key is the string value of the node skill hash
  nodes!: Map<string, PassiveNode>;
}
