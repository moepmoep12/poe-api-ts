import { Type } from "class-transformer";

import { ItemOverview } from "../../../shared/items";

import { Artifact } from "./Artifact";

export class ArtifactOverview extends ItemOverview<Artifact> {
  @Type(() => Artifact)
  entries!: Artifact[];
}
