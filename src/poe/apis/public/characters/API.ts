import {
  buildURL,
  requestTransformedArray,
  requestTransformed,
} from "../../../../common/functions";

import { IRealmOptions } from "../../../shared";
import { CharacterBase, Character } from "../../../shared/characters";
import { InventoryItem } from "../../../shared/item";
import { Passives } from "../../../shared/passives";

import { PublicEndpoints } from "../Endpoints";

import { GetItemsResponse } from "./models/GetItemsResponse";
import { PublicCharacter } from "./Character";
import { PublicCharacterBase } from "./CharacterBase";
import { PublicPassives } from "./Passives";

/**
 * Returns a list of characters for a specific account.
 *
 * @remarks The profile has to be public.
 *
 * @endpoint https://pathofexile.com/character-window/get-characters
 * @param accountName The name of the account
 * @param options
 * @returns A list of characters of an account
 * @throws [[APIError]]
 */
export const getAll = async (
  accountName: string,
  options?: IRealmOptions
): Promise<CharacterBase[]> => {
  const url = buildURL(PublicEndpoints.Characters, options, null, { accountName });
  const chars = await requestTransformedArray(PublicCharacterBase, url);
  for (const char of chars) {
    char.accountName = accountName;
  }
  return chars;
};

/**
 * Returns a specific character from an account.
 *
 * @remarks
 * The profile has to be public.
 *
 * @param accountName The name of the account
 * @param name The character name
 * @endpoint https://pathofexile.com/character-window/get-items
 *         & https://pathofexile.com/character-window/get-passive-skills
 * @throws [[APIError]]
 */
export const getByName = async (accountName: string, charName: string): Promise<Character> => {
  const url = buildURL(PublicEndpoints.Items, null, {}, { character: charName, accountName });

  const [itemsResponse, passives] = await Promise.all([
    requestTransformed(GetItemsResponse, url),
    getPassives(accountName, charName),
  ]);

  const char = new PublicCharacter(itemsResponse, passives);
  char.accountName = accountName;
  return char;
};

/**
 * Returns the equipped & inventory items of a character.
 *
 * @remarks
 * The profile has to be public. Jewels in the passive skill tree are not included.
 *
 * @param accountName The name of the account
 * @param name The character name
 * @endpoint https://pathofexile.com/character-window/get-items
 * @throws [[APIError]]
 */
export const getItems = async (accountName: string, charName: string): Promise<InventoryItem[]> => {
  const url = buildURL(
    PublicEndpoints.Items,
    null,
    {},
    { character: charName, accountName: accountName }
  );
  const response = await requestTransformed(GetItemsResponse, url);
  return response.items;
};

/**
 * Returns the passive skills of a character.
 *
 * @remarks
 * The profile has to be public. Bandit choice is not included.
 *
 * @param accountName The name of the account
 * @param name The character name
 * @endpoint https://pathofexile.com/character-window/get-passive-skills
 * @throws [[APIError]]
 */
export const getPassives = async (accountName: string, charName: string): Promise<Passives> => {
  const url = buildURL(
    PublicEndpoints.PassiveSkills,
    null,
    {},
    { character: charName, accountName: accountName }
  );
  return requestTransformed(PublicPassives, url);
};
