# Path of Exile API TS

## Table of Contents

- [Path of Exile API TS](#path-of-exile-api-ts)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Overview](#overview)
  - [Installation](#installation)
  - [Getting started](#getting-started)

## Introduction

The purpose of this library is to provide simple access to the different APIs of the game [Path of Exile](https://www.pathofexile.com/) by Grinding Gear Games. Data can be requested with simple method calls and is returned as fully typed class objects. The library was built upon the previous work of [klayveR](https://github.com/klayveR) and his library [poe-api-wrappers](https://github.com/klayveR/poe-api-wrappers). Unfortunately, poe-api-wrappers is no longer maintained, outdated, and doesn't provide access to the OAuth2 API. Hence, this library was created.

> Note: This product isn't affiliated with or endorsed by Grinding Gear Games in any way.

## Overview

The key objectives of this library are:

- Provide simplified access to the official PoE APIs. These include the Public API, the OAuth API and the Session API using the POESESSID cookie.
- Provide simplified access to the [poe.ninja](https://poe.ninja/) API for fetching economy data.
- Provide the data fetched from the APIs as class objects using [class-transformer](https://github.com/typestack/class-transformer) enhanced with methods for ease of use.

## Installation

Install the latest stable version of this library:

```bash
 npm install --save poe-api-ts
```

## Getting started

```typescript
import { PathOfExile } from "poe-api-wrappers";
```

Before making requests to the official API, you should set your user agent, as requested by GGG [here](https://www.pathofexile.com/forum/view-thread/3019033/page/1#p23790007).

```typescript
PathOfExile.Settings.userAgent = "my-awesome-tool-name, contact@me.com";
```

These settings are sufficient in order to use the PoE Public API & poe.ninja. However, in order to use the Session and the OAuth API further setup is required.

### Session API

In order to use the [PoE Session API](src/poe/apis/session), the _POESESSID_ needs to be set.

```typescript
PathOfExile.Settings.sessionId = "somePOESESSID";
```

### OAuth API

The [PoE OAuth API](src/poe/apis/oauth) uses OAuth2.0 for authorization. The official documentation by GGG can be found [here](https://www.pathofexile.com/developer/docs/index). The endpoints in the PoE OAuth API require the token to be set and the required scope.

In order to access endpoints which are related to an account, the token obtained by the **Authorization Code Grant** needs to be set

```typescript
PathOfExile.Settings.authorizationToken = "someAuthorizationToken";
```

In order to access endpoints which are **not** related to an account, the token obtained by the **Client Credentials Grant** needs to be set

```typescript
PathOfExile.Settings.serviceToken = "someServiceToken";
```

## Examples

### PublicAPI

#### Get 10 public stash tab chunks and do something with them

```typescript
let chunk = await PathOfExile.PublicAPI.PublicStashes.getChunk();

for (let index = 0; index < 9; index++) {
  console.log(`This chunk as ${chunk.stashes.length} stashes.`);
  chunk = await chunk.getNext();
}
```

#### Get the entire Standard league ladder and filter it by online players

```typescript
// Get the ladder with the first 200 entries
const ladder = await PathOfExile.PublicAPI.Ladders.get("Standard", { limit: 200 });

// Request the remaining entries in chunks of 200 and append them to the current ladder object
// until there are no entries left
while ((await ladder.getNextEntries(true)) != null) {
  console.log(`Current entries: ${ladder.entries.length}`);
}

// Filter by online players
const online = ladder.filterBy("online", true);
console.log(`${online.length}/${ladder.total} players are currently online.`);
```

#### Execute a search query and get the prices for the first 10 results

```typescript
const query: SearchQueryContainer = {
  query: {
    status: { option: "online" },
    name: "Shavronne's Wrappings",
    type: "Occultist's Vestment",
  },
  sort: { price: "asc" },
};

const search = await PathOfExile.PublicAPI.Trade.search("Standard", query);
const results = await search.getNextItems(10);

if (results != null) {
  for (const result of results) {
    const price = result.listing.price;
    const name = result.item.name;
    const seller = result.listing.account.name;
    console.log(`Item '${name}' is being sold for ${price.amount} ${price.currency} by ${seller}`);
  }
}
```

#### Get the character of an account with its inventory and passives

```typescript
const accountName = "moepmoep12";
const charName = "CratoLsArch";
const char = await PathOfExile.PublicAPI.Characters.getByName(accountName, charName);
console.log(
  `The character is level ${char.level} and has ${char.inventory.length} items in its inventory.`
);

// Update the inventory after some event happened, e.g. hideout entered
await char.updateInventory();
console.log(`The character has now ${char.inventory.length} items in its inventory.`);
```

### SessionAPI

These examples require the POESESSID to be set in the Settings.

#### Get the Standard stash and the items inside the tabs

```typescript
// Get an overview of the stash with all tabs, excluding the items
const stash = await PathOfExile.SessionAPI.Stashes.getStash("myAccount", "Standard");
console.log(`The stash has ${stash.numTabs} tabs.`);

const stashTab = stash.tabs[0];
console.log(`The color of the stash tab is ${stashTab.Color}`);

// Get the items inside the stash tab
await stashTab.update();
console.log(`The stash tab '${stashTab.name}' contains ${stashTab.items?.length} items;`);
```

### OAuthAPI

#### Get 10 public stash tab chunks and do something with them (same as Public API)

```typescript
let chunk = await PathOfExile.PublicAPI.PublicStashes.getChunk();

for (let index = 0; index < 9; index++) {
  console.log(`This chunk as ${chunk.stashes.length} stashes.`);
  chunk = await chunk.getNext();
}
```

#### Get stash tab inside a folder

```typescript
// Get an overview of the stash, exlcuding items inside the folders
const stash = await PathOfExile.OAuthAPI.Stashes.getStash("Standard");
// Find the first folder with children
const stashTabFolder = stash.tabs.find(
  (s) => s.type == StashType.Folder && s.children && s.children.length > 0
);

if (stashTabFolder) {
  console.log(
    `The folder '${stashTabFolder.name}' has ${stashTabFolder.children?.length} children.`
  );

  const childTab = stashTabFolder.children![0];
  await childTab.update();
  console.log(`Childtab ${childTab.name} contains ${childTab.items?.length} items.`);
}
```

### PoENinja API

```typescript
import { PoENinja } from "poe-api-wrappers";
```

#### Get the price of Exalted Orbs in Standard

```typescript
const currencyOverview = await PoENinja.Currencies.getOverview("Standard", CurrencyOption.Currency);
console.log(`Fetched data for ${currencyOverview.entries.length} entries.`);

const exaltedOrb = currencyOverview.entries.find((c) => c.name == "Exalted Orb");
console.log(`One Exalted Orb is worth ${exaltedOrb?.buy?.value} Chaos orbs.`);
```

#### Get the price of House of Mirrors in Standard

```typescript
const divCardOverview = await PoENinja.Items.DiviniationCards.getOverview("Standard");
console.log(`Fetched data for ${divCardOverview.entries.length} entries.`);

const exaltedOrb = divCardOverview.entries.find((c) => c.name == "House of Mirrors");
console.log(`One House of Mirrors is worth ${exaltedOrb?.exaltedValue} Exalted orbs.`);
```

## Handling errors

Requests to the Path of Exile API throw custom errors when something goes wrong. The thrown custom error class include the same error codes as the ones documented in the [official developer API documentation](https://www.pathofexile.com/developer/docs/index#errors). Please note that you should also check for other errors, which might occur when, for example, no internet connection is available.

```typescript
try {
  await PathOfExile.SessionAPI.Accounts.getProfile();
} catch (error: unknown) {
  if (error instanceof PathOfExile.Errors.APIError) {
    console.log(`Request failed with code ${error.code}: ${error.message}`);
  }

  // Handle other errors...
}
```
