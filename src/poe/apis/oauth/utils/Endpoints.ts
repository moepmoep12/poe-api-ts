/**
 * These endpoints require an OAuth2 access token & the required scope.
 */
export enum OAuthEndpoints {
  // Required scope: `account:profile`
  Profile = "https://api.pathofexile.com/profile",

  // Required scope: service:leagues
  League = "https://api.pathofexile.com/league",

  // Required scope: `account:characters`
  Character = "https://api.pathofexile.com/character",

  // Required scope: `account:stashes`
  Stashes = "https://api.pathofexile.com/stash",

  // Required scope: `service:pvp_matches`
  PVPMatches = "https://api.pathofexile.com/pvp-match",

  // Required scope: `service:psapi`
  PublicStashChanges = "https://api.pathofexile.com/public-stash-tabs",
}
