import { requestTransformed } from "../../../common/functions";

import { NinjaEndpoints } from "../../Endpoints";

import { Statistics } from "./Statistics";

/**
 * @endpoint https://poe.ninja/api/Data/GetStats
 */
export const get = async (): Promise<Statistics> => {
  const url = new URL(NinjaEndpoints.Stats);
  return await requestTransformed(Statistics, url);
};
