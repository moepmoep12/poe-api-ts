import { buildURL, requestTransformed, requestTransformedArray } from "../../../common/functions";

import { NinjaEndpoints } from "../../Endpoints";
import { HistoryPoint, LanguageCode } from "../../shared";
import { ItemBase, ItemOverview } from "../../shared/items";
import { ItemOption } from "./models/ItemOption";

import { DivinationCard } from "./div/DivinationCard";
import { DivinitationCardOverview } from "./div/ItemOverview";
import { DeliriumOrb, DeliriumOrbOverview } from "./deliriumorbs";
import { Incubator, IncubatorOverview } from "./incubators";
import { Invitation, InvitationOverview } from "./invitations";
import { Oil, OilOverview } from "./oils";
import { Scarab, ScarabOverview } from "./scarabs";
import { Fossil, FossilOverview } from "./fossils";
import { Resonator, ResonatorOverview } from "./resonators";
import { Essence, EssenceOverview } from "./essences";
import { SkillGem, SkillGemOverview } from "./gems";
import { BaseType, BaseTypeOverview } from "./basetypes";
import { HelmetEnchant, HelmetEnchantOverview } from "./helmetenchants";
import { MapOverview, Map } from "./maps";
import { UniqueJewel, UniqueJewelOverview } from "./jewels";
import { UniqueFlask, UniqueFlaskOverview } from "./flasks";
import { UniqueWeapon, UniqueWeaponOverview } from "./weapons";
import { UniqueArmour, UniqueArmourOverview } from "./armours";
import { UniqueAccessoire, UniqueAccessoireOverview } from "./accessoires";
import { Beast, BeastOverview } from "./beasts";
import { Vial, VialOverview } from "./vials";
import { Artifact, ArtifactOverview } from "./artifacts";
import { ClusterJewel, ClusterJewelOverview } from "./clusterjewels";

export type OptionMapping = {
  Invitation: Invitation;
  DeliriumOrb: DeliriumOrb;
  Oil: Oil;
  Incubator: Incubator;
  Scarab: Scarab;
  Fossil: Fossil;
  Resonator: Resonator;
  Essence: Essence;
  DivinationCard: DivinationCard;
  SkillGem: SkillGem;
  BaseType: BaseType;
  HelmetEnchant: HelmetEnchant;
  UniqueMap: Map;
  Map: Map;
  UniqueJewel: UniqueJewel;
  UniqueFlask: UniqueFlask;
  UniqueWeapon: UniqueWeapon;
  UniqueArmour: UniqueArmour;
  UniqueAccessory: UniqueAccessoire;
  Beast: Beast;
  Vial: Vial;
  Artifact: Artifact;
  ClusterJewel: ClusterJewel;
  BlightedMap: Map;
  BlightRavagedMap: Map;
  Watchstone: undefined;
  Prophecy: undefined;
  Sentinel: undefined;
};

export type RetType<T extends ItemOption> = OptionMapping[T] extends ItemBase
  ? ItemOverview<OptionMapping[T]>
  : undefined;

export type OverviewAllResult = {
  [P in ItemOption]: RetType<P>;
};

type ConstructorMapping = {
  [P in ItemOption]: OptionMapping[P] extends ItemBase ? new () => RetType<P> : undefined;
};

const overviewConstructorMapping: Partial<ConstructorMapping> = {
  Invitation: InvitationOverview,
  DeliriumOrb: DeliriumOrbOverview,
  Oil: OilOverview,
  Incubator: IncubatorOverview,
  Scarab: ScarabOverview,
  Fossil: FossilOverview,
  Resonator: ResonatorOverview,
  Essence: EssenceOverview,
  DivinationCard: DivinitationCardOverview,
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
  Watchstone: undefined,
  Prophecy: undefined,
  Sentinel: undefined,
};

/**
 * @endpoint https://poe.ninja/api/data/ItemOverview
 * @param league
 * @param language
 */
export const getOverviewGeneric = async <T extends ItemOption>(
  league: string,
  type: T,
  /* istanbul ignore next */
  language: LanguageCode = LanguageCode.en
): Promise<RetType<T>> => {
  const constructorFn = overviewConstructorMapping[type];
  if (!constructorFn) return undefined as RetType<T>;

  const url = buildURL(NinjaEndpoints.ItemOverview, null, null, {
    league,
    type,
    language,
  });

  return await requestTransformed(constructorFn, url);
};

export const getOverviewAll = async <T extends ItemOption>(
  league: string,
  language: LanguageCode = LanguageCode.en
): Promise<OverviewAllResult> => {
  const result: Partial<Record<ItemOption, ItemOverview<ItemBase>>> = {};
  const promises = [];

  for (const [entry, constructorFn] of Object.entries(overviewConstructorMapping)) {
    const itemOption = entry as T;

    if (constructorFn) {
      promises.push(
        getOverviewGeneric(league, itemOption, language)
          .then((val) => (result[itemOption] = val))
          .catch(() => {
            result[itemOption] = undefined;
          })
      );
    } else {
      result[itemOption] = undefined;
    }
  }

  await Promise.all(promises);

  return result as OverviewAllResult;
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
