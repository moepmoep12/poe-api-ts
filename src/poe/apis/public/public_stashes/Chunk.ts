import { Chunk } from "../../../shared/public_stashes";

import * as API from "./API";

/**
 * @hidden
 */
export class PublicChunk extends Chunk {
  public getNext(): Promise<Chunk> {
    return API.getChunk(this.nextChangeId);
  }
}
