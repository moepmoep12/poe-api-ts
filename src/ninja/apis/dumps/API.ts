import { requestTransformedArray } from "../../../common/functions";

import { NinjaEndpoints } from "../../Endpoints";

import { DataDump } from "./DataDump";

/**
 * @endpoint https://poe.ninja/api/Data/GetStats
 */
export const get = async (): Promise<DataDump[]> => {
  const url = new URL(NinjaEndpoints.DataDumps);
  return await requestTransformedArray(DataDump, url);
};
