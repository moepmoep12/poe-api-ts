/**
 * These endpoints can be requested without OAuth access token or the poesessid.
 */
export enum PublicEndpoints {
  Leagues = "https://api.pathofexile.com/leagues",
  LeagueRules = "https://api.pathofexile.com/league-rules",
  Streams = "https://pathofexile.com/api/streams",
  AccountShowcasePins = "https://pathofexile.com/api/account/showcase-pins",
  Characters = "https://www.pathofexile.com/character-window/get-characters",
  AccountNameByCharacter = "https://pathofexile.com/character-window/get-account-name-by-character",
  Items = "https://www.pathofexile.com/character-window/get-items",
  PassiveSkills = "https://www.pathofexile.com/character-window/get-passive-skills",
  Ladders = "https://api.pathofexile.com/ladders",
  MTXSpecials = "https://pathofexile.com/api/shop/microtransactions/specials",
  PublicStashChanges = "https://api.pathofexile.com/public-stash-tabs",
  Seasons = "https://pathofexile.com/api/seasons",
  SeasonPlayerHistory = "https://pathofexile.com/api/season-player-history",
  TradeLeagues = "https://pathofexile.com/api/trade/data/leagues",
  TradeStats = "https://pathofexile.com/api/trade/data/stats",
  TradeStatic = "https://pathofexile.com/api/trade/data/static",
  TradeIgnore = "https://pathofexile.com/api/trade/ignore",
  TradeItems = "https://pathofexile.com/api/trade/data/items",
  TradeFetch = "https://www.pathofexile.com/api/trade/fetch",
  TradeSearch = "https://www.pathofexile.com/api/trade/search",
  TradeExchange = "https://www.pathofexile.com/api/trade/exchange",
}
