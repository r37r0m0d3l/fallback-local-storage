Fallback Local Storage
===========

Universal `localStorage` fallback. Saves your time by fixing `Private Mode` error writing in web browser and auto serialization that not included in `localStorage` by default.

[![Version](http://img.shields.io/npm/v/fallback-local-storage.svg)](https://www.npmjs.org/package/fallback-local-storage)
[![Build Status](https://travis-ci.org/r37r0m0d3l/fallback-local-storage.svg?branch=master)](https://travis-ci.org/r37r0m0d3l/fallback-local-storage)
[![Code style: airbnb](https://img.shields.io/badge/code%20style-airbnb-blue.svg?style=flat)](https://github.com/airbnb/javascript)

### Install

```bash
npm i --save --save-exact fallback-local-storage
```

```bash
bower install --save fallback-local-storage
```

### Include

```html
<script src="./bower_components/fallback-local-storage/dist/fallback-local-storage.web.js"></script>
```

```javascript
var FallbackLocalStorage = require("fallback-local-storage");
```

```javascript
import FallbackLocalStorage from "fallback-local-storage";
```

####Creating an instance:

Creating instance with little check.

```javascript
let appStorage;
if (FallbackLocalStorage.getStorage().includes("localStorage")) {
	// Here we don't have any problems with writing to `window.localStorage`
	appStorage = window.localStorage;
} else {
	// Looks like we have some troubles.
	// Browser has disable `window.localStorage` support.
	// Or browser is in `Private Mode` which disables localStorage completely.
	appStorage = new FallbackLocalStorage();
}
```

Recommended way of using instance.

```javascript
global.appStorage = appStorage;
self.appStorage = appStorage;
window.appStorage = appStorage;
```

Not recommended. Only if you have troubles with `Private Mode` and other libraries.

```javascript
window.localStorage = new FallbackLocalStorage();
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

### API

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

##### static getStorage (): Array

Return list of available storage

```javascript
FallbackLocalStorage.getStorage();
// ["localStorage", "sessionStorage", "fallbackStorage"]
```

#### Examples

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

### Changelog

#### 0.0.20

- Add serialization for Set and Map.
- Update documentation.

#### 0.0.19

- Remove `json3` from dependencies.
- Update dependencies.

#### 0.0.18

- Fully compatible with localStorage API.
