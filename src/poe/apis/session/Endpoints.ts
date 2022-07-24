/**
 * These endpoints require the cookie POESESSID
 */
export enum SessionEndpoints {
  Guild = "https://pathofexile.com/api/guild",
  Account = "https://pathofexile.com/api/account",
  Profile = "https://pathofexile.com/api/profile",
  AccountAvatar = "https://pathofexile.com/api/account-avatar",
  Mtx = "https://pathofexile.com/character-window/get-mtx-stash-items",
  Stash = "https://pathofexile.com/character-window/get-stash-items",
  Characters = "https://www.pathofexile.com/character-window/get-characters",
  Items = "https://www.pathofexile.com/character-window/get-items",
  PassiveSkills = "https://www.pathofexile.com/character-window/get-passive-skills",
}
