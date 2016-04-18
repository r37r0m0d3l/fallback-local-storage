Fallback Local Storage
===========

> Universal localStorage fallback

[![Version](http://img.shields.io/npm/v/fallback-local-storage.svg)](https://www.npmjs.org/package/fallback-local-storage)
[![Build Status](https://travis-ci.org/p54l0m5h1k/fallback-local-storage.svg?branch=master)](https://travis-ci.org/p54l0m5h1k/fallback-local-storage)
[![Dependency Status](https://david-dm.org/jscs-dev/node-jscs.svg?theme=shields.io&style=flat)](https://david-dm.org/p54l0m5h1k/fallback-local-storage)
[![devDependency Status](https://david-dm.org/jscs-dev/node-jscs/dev-status.svg?theme=shields.io&style=flat)](https://david-dm.org/p54l0m5h1k/fallback-local-storage#info=devDependencies)
[![Code style: airbnb](https://img.shields.io/badge/code%20style-airbnb-blue.svg?style=flat)](https://github.com/airbnb/javascript)

### Install

```bash
npm install --save fallback-local-storage
```

```bash
bower install --save fallback-local-storage
```

### Include

```javascript
var FallbackLocalStorage = require("fallback-local-storage");
```

####Creating an instance:

```javascript
if (FallbackLocalStorage.getStorage().includes("localStorage")) {
	appStorage = localStorage;
} else {
	appStorage = new FallbackLocalStorage;
}
FallbackLocalStorage.getStorage();
appStorage.setItem("hash", {name: "John"});
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

If your browser supports `localStorage` there is no point to replace it with fallback.

### API

##### constructor (debug?: boolean, iterable?: boolean, autoSerialize?: boolean, CustomSerializer?: function)

+ *debug* _{boolean}_ (`false`) - toggle debug information output
+ *iterable* _{boolean}_ (`false`) - allow iteration over instance
+ *autoSerialize* _{boolean}_ (`false`) - serialize data before save
+ *CustomSerializer* _{Function}_ - custom serializer for values

##### static getStorage (): Array

Return list of available storage

```javascript
FallbackLocalStorage.getStorage();
[ 'localStorage', 'sessionStorage', 'fallbackStorage' ]
```