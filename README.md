# Local Storage Fallback

Universal `localStorage` fallback.
Saves your time by fixing `Private Mode` error writing in web browser and
auto serialization that not included in `localStorage` by default.

[![npm](https://badgen.net/npm/v/fallback-local-storage?&icon=npm&label=npm&color=DD3636)](https://github.com/r37r0m0d3l/fallback-local-storage)
[![downloads](https://badgen.net/npm/dt/fallback-local-storage?&icon=terminal&label=downloads&color=009688)](https://github.com/r37r0m0d3l/fallback-local-storage)
[![stars](https://badgen.net/github/stars/r37r0m0d3l/fallback-local-storage?&icon=github&label=stars&color=ffcc33)](https://github.com/r37r0m0d3l/fallback-local-storage)
[![types](https://badgen.net/npm/types/fallback-local-storage?&icon=typescript&label=types&color=1E90FF)](https://github.com/r37r0m0d3l/fallback-local-storage/blob/master/dist/fallback-local-storage.d.ts)
[![build](https://badgen.net/travis/r37r0m0d3l/fallback-local-storage?&icon=travis&label=build)](https://github.com/r37r0m0d3l/fallback-local-storage)
[![lgtm](https://badgen.net/lgtm/grade/g/r37r0m0d3l/fallback-local-storage?&icon=lgtm&label=lgtm:js/ts&color=00C853&v=1.5.0)](https://github.com/r37r0m0d3l/fallback-local-storage)

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
import FallbackLocalStorage from "fallback-local-storage";
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
	// Here we don't have any problems
	// with writing to `window.localStorage`
	appStorage = globalThis.localStorage;
} else {
	// Looks like we have some troubles.
	// Browser has disable `window.localStorage` support.
	// Or browser is in `Private Mode`
	// which disables localStorage completely.
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
// Allow iteration over instance.
// Disable if you don't want be compatible with localStorage.
const ITERABLE = true;
// Serialize data before save and retrieve. VERY RECOMMENDED.
const AUTO_SERIALIZE = true;
// Custom serializer for values.
const CUSTOM_SERIALIZER = null;
const appStorage = new FallbackLocalStorage(
  DEBUG, ITERABLE, AUTO_SERIALIZE, CUSTOM_SERIALIZER
);
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

## See also

[My other projects](https://r37r0m0d3l.icu/open_source_map)

<img src="https://raw.githubusercontent.com/r37r0m0d3l/r37r0m0d3l/master/osmap.svg?sanitize=true" width="960" height="520" style="display:block;height:auto;margin-left:auto;margin-right:auto;min-height:520px;min-width:960px;width:100%;">
