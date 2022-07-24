import { Settings } from "../../../Settings";

export function addAuthorizationTokenHeader(
  headers: Record<string, string> = {}
): Record<string, string> {
  addAuthorizationHeader(headers, Settings.authorizationToken);
  return headers;
}

export function addServiceTokenHeader(
  headers: Record<string, string> = {}
): Record<string, string> {
  addAuthorizationHeader(headers, Settings.serviceToken);
  return headers;
}

function addAuthorizationHeader(headers: Record<string, string>, token: string) {
  headers["Authorization"] = `Bearer ${token}`;
}
