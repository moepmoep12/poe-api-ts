import { buildURL, requestTransformed, requestTransformedArray } from "../../../common/functions";

import { NinjaEndpoints } from "../../Endpoints";
import { HistoryPoint, LanguageCode } from "../../shared";
import { ItemBase, ItemOverview } from "../../shared/items";
import { ItemOption } from "./models/ItemOption";

import { DeliriumOrbOverview } from "./deliriumorbs";
import { IncubatorOverview } from "./incubators";
import { InvitationOverview } from "./invitations";
import { OilOverview } from "./oils";
import { ScarabOverview } from "./scarabs";
import { FossilOverview } from "./fossils";
import { ResonatorOverview } from "./resonators";
import { EssenceOverview } from "./essences";
import { DivinitationCardOverview } from "./div";
import { SkillGemOverview } from "./gems";
import { BaseTypeOverview } from "./basetypes";
import { HelmetEnchantOverview } from "./helmetenchants";
import { MapOverview } from "./maps";
import { UniqueJewelOverview } from "./jewels";
import { UniqueFlaskOverview } from "./flasks";
import { UniqueWeaponOverview } from "./weapons";
import { UniqueArmourOverview } from "./armours";
import { UniqueAccessoireOverview } from "./accessoires";
import { BeastOverview } from "./beasts";
import { VialOverview } from "./vials";
import { ArtifactOverview } from "./artifacts";
import { ClusterJewelOverview } from "./clusterjewels";
import { SentinelOverview } from "./sentinels";

/**
 * @endpoint https://poe.ninja/api/data/ItemOverview
 * @param league
 * @param language
 */
export const getOverviewGeneric = async <T extends ItemBase>(
  league: string,
  type: ItemOption,
  /* istanbul ignore next */
  language: LanguageCode = LanguageCode.en,
  cls: new () => ItemOverview<T>
): Promise<ItemOverview<T>> => {
  const url = buildURL(NinjaEndpoints.ItemOverview, null, null, {
    league,
    type,
    language,
  });
  return await requestTransformed(cls, url);
};

const mapping: Record<ItemOption, (new () => ItemOverview<ItemBase>) | undefined> = {
  Invitation: InvitationOverview,
  DeliriumOrb: DeliriumOrbOverview,
  Watchstone: undefined,
  Oil: OilOverview,
  Incubator: IncubatorOverview,
  Scarab: ScarabOverview,
  Fossil: FossilOverview,
  Resonator: ResonatorOverview,
  Essence: EssenceOverview,
  DivinationCard: DivinitationCardOverview,
  Prophecy: undefined,
  SkillGem: SkillGemOverview,
  BaseType: BaseTypeOverview,
  HelmetEnchant: HelmetEnchantOverview,
  UniqueMap: MapOverview,
  Map: MapOverview,
  UniqueJewel: UniqueJewelOverview,
  UniqueFlask: UniqueFlaskOverview,
  UniqueWeapon: UniqueWeaponOverview,
  UniqueArmour: UniqueArmourOverview,
  UniqueAccessory: UniqueAccessoireOverview,
  Beast: BeastOverview,
  Vial: VialOverview,
  Artifact: ArtifactOverview,
  ClusterJewel: ClusterJewelOverview,
  BlightedMap: MapOverview,
  BlightRavagedMap: MapOverview,
  Sentinel: SentinelOverview,
};

export const getOverviewAll = async (
  league: string,
  language: LanguageCode = LanguageCode.en
): Promise<Map<ItemOption, ItemOverview<ItemBase> | undefined>> => {
  const map: Map<ItemOption, ItemOverview<ItemBase> | undefined> = new Map();
  const promises = [];

  for (const [entry, constructorFn] of Object.entries(mapping)) {
    const itemOption = entry as ItemOption;

    if (constructorFn) {
      promises.push(
        getOverviewGeneric(league, itemOption, language, constructorFn)
          .then((val) => map.set(itemOption, val))
          .catch(() => {
            map.set(itemOption, undefined);
          })
      );
    } else {
      map.set(itemOption, undefined);
    }
  }

  await Promise.all(promises);

  return map;
};

/**
 * @endpoint https://poe.ninja/api/data/ItemHistory
 * @param league
 * @param type
 * @param id
 */
export const getHistoryGeneric = async (
  league: string,
  type: ItemOption,
  id: number
): Promise<HistoryPoint[]> => {
  const url = buildURL(NinjaEndpoints.ItemHistory, null, null, {
    league,
    type,
    itemId: id.toString(),
  });

  return await requestTransformedArray(HistoryPoint, url);
};
