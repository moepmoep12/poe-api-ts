import axios, { AxiosError, AxiosRequestConfig, Method } from "axios";
import { plainToClass, plainToInstance } from "class-transformer";

import { Settings } from "../../poe";
import { APIError } from "../../poe/errors";
import { isExternalAPIError } from "../../poe/errors/models/ExternalAPIError";
import { getCode, isOAuthAPIError } from "../../poe/errors/models/OAuthAPIError";
import { isWrappedError } from "../../poe/errors/models/WrappedError";
import { isUnwrappedError } from "../../poe/errors/models/UnwrappedError";

export async function request(
  url: URL,
  method: Method = "get",
  payload: unknown = {},
  headers: Record<string, string> = {},
  transformResponse?: (data: string) => string
): Promise<string> {
  try {
    const config: AxiosRequestConfig = {
      url: url.toString(),
      method: method,
      headers: buildHeaders(url, headers),
      data: payload,
      transformResponse: [
        transformResponse
          ? transformResponse
          : (data: string): string => {
              return data;
            },
      ],
    };

    if (Settings.httpsAgent) config.httpsAgent = Settings.httpsAgent;

    const response = await axios(config);
    const data = <string>response.data;

    return stripByteOrderMark(data);
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      const err = handleAxiosError(error, url.host);
      if (err) throw err;
    }
    throw error;
  }
}

export async function requestTransformed<T>(
  cls: new () => T,
  url: URL,
  method: Method = "get",
  payload: unknown = {},
  headers: Record<string, string> = {},
  transformResponse?: (data: string) => string
): Promise<T> {
  const response = await request(url, method, payload, headers, transformResponse);
  const obj = <T>JSON.parse(response);

  return plainToClass(cls, obj, { enableImplicitConversion: true });
}

export async function requestTransformedArray<T>(
  cls: new () => T,
  url: URL,
  method: Method = "get",
  payload: unknown = {},
  headers: Record<string, string> = {},
  transformResponse?: (data: string) => string
): Promise<T[]> {
  const response = await request(url, method, payload, headers, transformResponse);
  const obj = <T[]>JSON.parse(response);

  return plainToInstance(cls, obj, { enableImplicitConversion: true });
}

export function buildHeaders(
  url: URL,
  headers: Record<string, string> = {}
): Record<string, string> {
  if (url.host.includes("pathofexile.com")) {
    if (Settings.sessionId != null && !headers["Authorization"]) {
      headers["Cookie"] = `POESESSID=${Settings.sessionId}`;
    }

    if (Settings.userAgent != null) {
      headers["User-Agent"] = Settings.userAgent;
    }
  }

  return headers;
}

export function stripByteOrderMark(str: string): string {
  if (str.charCodeAt(0) === 0xfeff) {
    str = str.slice(1);
  }

  return str;
}

function handleAxiosError(error: AxiosError, url: string) {
  if (url.includes("pathofexile.com")) {
    if (error.response) {
      const responseData: unknown = JSON.parse(error.response.data as string);
      if (isWrappedError(responseData))
        return new APIError(responseData.message, responseData.code, error.status);

      if (isExternalAPIError(responseData))
        return new APIError(responseData.error.message, responseData.error.code, error.status);

      if (isOAuthAPIError(responseData))
        return new APIError(
          responseData.error,
          getCode(responseData.error),
          error.status,
          `${responseData.error} : ${responseData.error_description}`
        );

      if (isUnwrappedError(responseData))
        return new APIError(responseData, getCode(responseData), error.status);
    }
  }
}
