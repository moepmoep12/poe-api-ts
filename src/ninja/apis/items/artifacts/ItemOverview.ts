import { Type } from "class-transformer";

import { ItemOverview } from "../../../shared/items";

import { Artifact } from "./Artifact";

export class ArtifactOverview extends ItemOverview<Artifact> {
  @Type(/* istanbul ignore next */ () => Artifact)
  entries!: Artifact[];
}
