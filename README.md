# Local Storage Fallback

Universal `localStorage` fallback.
Saves your time by fixing `Private Mode` error writing in web browser and
auto serialization that not included in `localStorage` by default.

[![NPM Version](https://img.shields.io/npm/v/fallback-local-storage.svg?style=flat)]()
[![NPM Downloads](https://img.shields.io/npm/dt/fallback-local-storage.svg?style=flat)]()
[![Build Status](https://travis-ci.org/r37r0m0d3l/fallback-local-storage.svg?branch=master)](https://travis-ci.org/r37r0m0d3l/fallback-local-storage)
[![GitHub stars](https://img.shields.io/github/stars/r37r0m0d3l/fallback-local-storage.svg?style=social&label=Star)](https://github.com/r37r0m0d3l/fallback-local-storage)
[![GitHub followers](https://img.shields.io/github/followers/r37r0m0d3l.svg?style=social&label=Follow)](https://github.com/r37r0m0d3l)

## Install

```bash
npm i fallback-local-storage
```

## Include

Require CommonJS.

```javascript
const FallbackLocalStorage = require("fallback-local-storage");
```

Import as ECMAScript module.

```javascript
import FallbackLocalStorage from "fallback-local-storage/es";
```

CDN.

```html
<script src="https://unpkg.com/fallback-local-storage"></script>
```

## Creating an instance

Creating instance with little check.

```javascript
let appStorage;
if (FallbackLocalStorage.getStorage().includes("localStorage")) {
	// Here we don't have any problems with writing to `window.localStorage`
	appStorage = globalThis.localStorage;
} else {
	// Looks like we have some troubles.
	// Browser has disable `globalThis.localStorage` support.
	// Or browser is in `Private Mode` which disables localStorage completely.
	appStorage = new FallbackLocalStorage();
}
```

Recommended way of using instance.

```javascript
globalThis.appStorage = appStorage;
self.appStorage = appStorage;
```

Not recommended. Only if you have troubles with `Private Mode` and other libraries.

```javascript
globalThis.localStorage = new FallbackLocalStorage();
self.localStorage = new FallbackLocalStorage();
```

```javascript
// Toggle debug information output.
const DEBUG = false;
// Allow iteration over instance. Disable if you don't want be compatible with localStorage.
const ITERABLE = true;
// Serialize data before save and retrieve. VERY RECOMMENDED.
const AUTO_SERIALIZE = true;
// Custom serializer for values.
const CUSTOM_SERIALIZER = null;
const appStorage = new FallbackLocalStorage(DEBUG, ITERABLE, AUTO_SERIALIZE, CUSTOM_SERIALIZER);
```

## API

All basic methods of `localStorage` are included.

```javascript
appStorage.setItem("hash", { name: "John" });
appStorage.getItem("isTurnedOn", false);
appStorage.removeItem("hash");
appStorage.hasItem("hash");
appStorage.keys();
appStorage.values();
appStorage.entries();
appStorage.forEach();
appStorage.toString();
appStorage.toJSON();
appStorage.length;
appStorage.clear();
```

### static getStorage (): Array

Return list of available storage

```javascript
FallbackLocalStorage.getStorage();
// ["localStorage", "sessionStorage", "fallbackStorage"]
```

## Examples

```javascript
const appStorage = new FallbackLocalStorage();
// FallbackLocalStorage. Start using [localStorage].

const array = ["ONE", "TWO", "THREE"];
appStorage.setItem("array", array);
// If auto-serialize is disabled
// Value for key "array" will be converted to string: "ONE,TWO,THREE"
// If auto-serialize is enabled
// ["ONE", "TWO", "THREE"]

const object = { "1": "ONE", "2": "TWO", "3": "THREE" };
appStorage.setItem("object", object);
// If auto-serialize is disabled
// Value for key "object" will be converted to string: "[object Object]"
// If auto-serialize is enabled
// { 1: "ONE", 2: "TWO", 3: "THREE" }

const map = new Map([[1, "ONE"], [2, "TWO"], [3, "THREE"]]);
appStorage.setItem("map", map);
// If auto-serialize is disabled
// Value for key "map" will be converted to string: "[object Map]"
// If auto-serialize is enabled
// { 1: "ONE", 2: "TWO", 3: "THREE" }

const set = new Set(["ONE", "TWO", "THREE"]);
appStorage.setItem("set", set);
// If auto-serialize is disabled
// Value for key "set" will be converted to string: "[object Set]"
// If auto-serialize is enabled
// ["ONE", "TWO", "THREE"]
```

## Changelog

### 1.0.3

-   Updated dependencies

### 1.0.2

-   Updated dependencies

### 1.0.1

-   Fixed tests

### 1.0.0

-   Added ECMAScript module variant.

### 0.0.21

-   Move everything to one file.

### 0.0.20

-   Add serialization for Set and Map.
-   Update documentation.

### 0.0.19

-   Remove `json3` from dependencies.
-   Update dependencies.

### 0.0.18

-   Fully compatible with localStorage API.

## Discover more

-   🔎[Consono](https://consono.js.org)🔎 -
  The most informative and correct variable inspector for JavaScript on the web.

-   🌠[OF](https://of.js.org)🌠 - Promise wrapper with some sugar.

-   🔄[Publish Subscribe](https://publish-subscribe.js.org)🔄 -
  JavaScript implementation of the Publish-Subscribe pattern.

-   🧰[Vicis](https://vicis.js.org)🧰 -
  Presentation and transformation layer for data output in RESTful APIs.

Or find useful these tools:

-   🧾[JSON Sorter](https://r37r0m0d3l.github.io/json_sort)🧾 - Neat online JSON sorter.
