import {
  buildURL,
  requestTransformedArray,
  requestTransformed,
} from "../../../../common/functions";
import { stripOuter } from "../../../../common/functions";
import { Character, CharacterBase } from "../../..//shared/characters";

import { OAuthEndpoints } from "../utils/Endpoints";
import { addAuthorizationTokenHeader } from "../utils/Headers";

import { OAuthCharacterBase } from "./CharacterBase";
import { OAuthCharacter } from "./Character";

/**
 * Returns all characters belonging to the owning account.
 *
 * @remarks
 * Requires [[Settings.accessToken]] to be set and the scope `account:characters`.
 *
 * @endpoint https://api.pathofexile.com/character
 * @throws [[APIError]]
 */
export const getAll = async (): Promise<CharacterBase[]> => {
  const url = buildURL(OAuthEndpoints.Character);
  return await requestTransformedArray(
    OAuthCharacterBase,
    url,
    "GET",
    {},
    addAuthorizationTokenHeader(),
    stripOuter
  );
};

/**
 * Returns a character by name from the owning account.
 *
 * @remarks
 * Requires [[Settings.accessToken]] to be set and the scope `account:characters`.
 *
 * @endpoint https://api.pathofexile.com/character/:name
 * @throws [[APIError]]
 */
export const getByName = async (name: string): Promise<Character> => {
  const url = buildURL(`${OAuthEndpoints.Character}/${name}`);
  const char = await requestTransformed(
    OAuthCharacter,
    url,
    "GET",
    {},
    addAuthorizationTokenHeader(),
    stripOuter
  );
  char.passives.jewels = char.jewels;
  return char;
};
