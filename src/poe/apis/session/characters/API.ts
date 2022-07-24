import {
  buildURL,
  requestTransformedArray,
  stripOuter,
  requestTransformed,
} from "../../../../common/functions";

import { IRealmOptions } from "../../../shared";
import { CharacterBase, Character } from "../../../shared/characters";
import { InventoryItem } from "../../../shared/item";
import { Passives } from "../../../shared/passives";

import { SessionEndpoints } from "../Endpoints";
import { SessionCharacter } from "./Character";
import { SessionCharacterBase } from "./CharacterBase";
import { GetItemsResponse } from "./models/GetItemsResponse";
import { SessionPassives } from "./Passives";

/**
 * Returns a list of characters of the owning account.
 *
 * @remarks
 * Requires `sessionId` to be set in [[Settings]] if profile or character tab is private.
 *
 * @endpoint https://pathofexile.com/character-window/get-characters
 * @param options
 * @returns A list of characters of an account
 * @throws [[APIError]]
 */
export const getAll = async (options?: IRealmOptions): Promise<CharacterBase[]> => {
  const url = buildURL(SessionEndpoints.Characters, options);
  return await requestTransformedArray(SessionCharacterBase, url);
};

/**
 * Returns a specific character from the owning account.
 *
 * @remarks
 * Requires `sessionId` to be set in [[Settings]] if profile or character tab is private.
 *
 * @param name The character name.
 * @endpoint https://pathofexile.com/character-window/get-items
 *         & https://pathofexile.com/character-window/get-passive-skills
 * @throws [[APIError]]
 */
export const getByName = async (name: string): Promise<Character> => {
  const itemUrl = buildURL(SessionEndpoints.Items, null, {}, { character: name });

  const [itemsResponse, passives] = await Promise.all([
    requestTransformed(GetItemsResponse, itemUrl),
    getPassives(name),
  ]);

  return new SessionCharacter(itemsResponse, passives);
};

/**
 * Returns the equipped & inventory items of a character.
 *
 * @remarks
 * Requires `sessionId` to be set in [[Settings]] if profile or character tab is private.
 *
 * @param name The character name
 * @endpoint https://pathofexile.com/character-window/get-items
 * @throws [[APIError]]
 */
export const getItems = async (charName: string): Promise<InventoryItem[]> => {
  const url = buildURL(SessionEndpoints.Items, null, {}, { character: charName });
  return await requestTransformedArray(InventoryItem, url, "GET", {}, {}, stripOuter);
};

/**
 * Returns the passive skills of a character.
 *
 * @remarks
 * Requires `sessionId` to be set in [[Settings]] if profile or character tab is private.
 * Bandit choice is not included.
 *
 * @param name The character name
 * @endpoint https://pathofexile.com/character-window/get-passive-skills
 * @throws [[APIError]]
 */
export const getPassives = async (charName: string): Promise<Passives> => {
  const url = buildURL(SessionEndpoints.PassiveSkills, null, {}, { character: charName });
  return await requestTransformed(SessionPassives, url);
};
