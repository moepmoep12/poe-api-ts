import { requestTransformed } from "../../../../common/functions";

import { Stream } from "../../../shared/streams";

import { PublicEndpoints } from "../Endpoints";

import { Response } from "./Response";

/**
 * @endpoint https://pathofexile.com/api/streams
 * @returns A list of all streams displayed on the official Path of Exile home page
 * @throws [[APIError]]
 */
export const get = async (): Promise<Stream[]> => {
  const url = new URL(PublicEndpoints.Streams);
  const response = await requestTransformed(Response, url);
  return response.streams;
};
