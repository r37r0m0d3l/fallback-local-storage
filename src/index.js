const getGlobal = function () {
  if (typeof self !== "undefined") {
    // eslint-disable-next-line no-undef
    return self;
  }
  if (typeof window !== "undefined") {
    // eslint-disable-next-line no-undef
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw new Error("unable to locate global object");
};

let theGlobal = getGlobal();

function cloneDeep(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function isMap(value) {
  return value && (value instanceof Map || value.constructor.name === "Map");
}

function isSet(value) {
  return value && (value instanceof Set || value.constructor.name === "Set");
}

function isKeyed(value) {
  return isMap(value) || isSet(value);
}

function keyedToObject(keyed) {
  if (!isKeyed(keyed)) {
    return keyed;
  }
  if (isSet(keyed)) {
    return Array.from(keyed).map((value) => (isKeyed(value) ? keyedToObject(value) : value));
  }
  const object = {};
  keyed.forEach((value, key) => {
    if (isKeyed(value)) {
      object[key] = keyedToObject(value);
    } else {
      object[key] = value;
    }
  });
  return object;
}

/**
 * Trying to parse or stringify JSON, do not throws errors
 * @class Serializer
 */
class Serializer {
  constructor(debug = false) {
    Object.defineProperty(this, "_debug", {
      value: Boolean(debug),
      writable: true,
      configurable: false,
      enumerable: false,
    });
  }

  deserialize(value, defaults) {
    let result = defaults;
    const type = typeof value;
    if (!value) {
      if (this._debug) {
        console.warn("Unable to parse scalar or empty values");
        console.dir(value);
      }
      return result;
    }
    if (type === "object") {
      if (this._debug) {
        console.warn("It looks like value is already parsed");
        console.dir(value);
      }
      return value;
    }
    if (type !== "string") {
      if (this._debug) {
        console.warn("Unable to parse non-string values");
        console.dir(value);
      }
      return result;
    }
    try {
      result = JSON.parse(value);
    } catch (exception) {
      if (this._debug) {
        console.warn("Unable to parse serialized data");
        console.dir(value);
        console.dir(exception);
      }
    }
    return result;
  }

  // noinspection Eslint
  /**
   * @param {*} value
   * @returns {string}
   */
  serialize(value) {
    if (!value) {
      return JSON.stringify(value);
    }
    if (typeof value !== "object") {
      return JSON.stringify(value);
    }
    if (Array.isArray(value)) {
      return JSON.stringify(value);
    }
    return JSON.stringify(keyedToObject(value));
  }
}

/**
 * A fallback interface imitation of the Web Storage API.
 * @class FallbackStorage
 */
class FallbackStorage {
  constructor() {
    this._data = {};
  }

  setItem(key, value) {
    if (!key) {
      return;
    }
    this._data[`${key}`] = `${value}`;
  }

  getItem(key) {
    if (key in this._data) {
      return cloneDeep(this._data[key]);
    }
    return null;
  }

  hasItem(key) {
    return key in this._data;
  }

  removeItem(key) {
    if (key in this._data) {
      delete this._data[key];
    }
  }

  key(key) {
    const keys = Object.keys(this._data);
    if (key in keys) {
      return cloneDeep(keys[key]);
    }
    return null;
  }

  clear() {
    this._data = {};
  }

  get length() {
    return Object.keys(this._data).length;
  }

  set length(value) {
    Object.keys(this._data).length;
  }

  keys() {
    return Object.keys(this._data);
  }

  values() {
    return Object.values(cloneDeep(this._data));
  }

  entries() {
    return Object.entries(cloneDeep(this._data));
  }

  toString() {
    return JSON.stringify(this._data);
  }

  valueOf() {
    return cloneDeep(this._data);
  }

  toJSON() {
    return cloneDeep(this._data);
  }
}

/**
 * @class FallbackLocalStorage
 */
class FallbackLocalStorage {
  /**
   * @type {"FallbackLocalStorage"}
   * @static
   */
  static get NAME() {
    return "FallbackLocalStorage";
  }
  /**
   * @type {string}
   * @static
   */
  static get VERSION() {
    return "0.0.22";
  }

  /**
   * @constructor
   * @param {boolean} [debug=false] - Toggle debug information output.
   * @param {boolean} [iterable=false] - Allow iteration over instance. Disable if you don't want be compatible with
   * localStorage.
   * @param {boolean} [autoSerialize=false] - Serialize data before save and retrieve. VERY RECOMMENDED.
   * @param {(Function|Object)} [CustomSerializer=null] - Custom serializer for values.
   * @public
   */
  constructor(debug = false, iterable = false, autoSerialize = true, CustomSerializer = null) {
    Object.defineProperty(this, "_debug", {
      value: Boolean(debug),
      writable: true,
      configurable: false,
      enumerable: false,
    });
    Object.defineProperty(this, "_iterable", {
      value: Boolean(iterable),
      writable: false,
      configurable: false,
      enumerable: false,
    });
    Object.defineProperty(this, "_serialize", {
      value: Boolean(autoSerialize),
      writable: false,
      configurable: false,
      enumerable: false,
    });
    Object.defineProperty(this, "_serializer", {
      value: (function _serializer(_this) {
        if (!CustomSerializer) {
          return new Serializer(_this._debug);
        } else if (typeof CustomSerializer === "function") {
          return new CustomSerializer(_this._debug);
        } else if (typeof CustomSerializer === "object") {
          return CustomSerializer;
        }
        return new Serializer(_this._debug);
      })(this),
      writable: false,
      configurable: false,
      enumerable: false,
    });
    let storage = {};
    const storageAvailable = FallbackLocalStorage.getStorage();
    switch (true) {
      case storageAvailable.indexOf("localStorage") > -1:
        storage = theGlobal.localStorage;
        if (this._debug) {
          console.info("FallbackLocalStorage. Start using [localStorage].");
        }
        break;
      case storageAvailable.indexOf("sessionStorage") > -1:
        storage = theGlobal.sessionStorage;
        if (this._debug) {
          console.warn("FallbackLocalStorage. Start using [sessionStorage].");
        }
        break;
      default:
        storage = new FallbackStorage();
        if (this._debug) {
          console.warn("FallbackLocalStorage. Start using [fallbackStorage].");
        }
        break;
    }
    Object.defineProperty(this, "_storage", {
      value: storage,
      writable: true,
      configurable: false,
      enumerable: false,
    });
  }

  /**
   * @name getStorage
   * @description Return list of available storage. Can return `localStorage`, `sessionStorage` and `fallbackStorage`.
   * Will always return at least `fallbackStorage`.
   * @public
   * @returns {Array.<"localStorage"|"sessionStorage"|"fallbackStorage">} Available storage locations
   * @example FallbackLocalStorage.getStorage() // ["localStorage", "fallbackStorage"]
   * @static
   */
  static getStorage() {
    const storage = [];
    try {
      if (typeof theGlobal.localStorage !== "undefined") {
        try {
          theGlobal.localStorage.setItem("", "");
          storage.push("localStorage");
        } catch (error) {
          //
        }
      }
    } catch (error) {
      //
    }
    try {
      if (typeof theGlobal.sessionStorage !== "undefined") {
        try {
          theGlobal.sessionStorage.setItem("", "");
          storage.push("sessionStorage");
        } catch (error) {
          //
        }
      }
    } catch (error) {
      //
    }
    storage.push("fallbackStorage");
    return storage;
  }

  /**
   * @name toString
   * @description Stringifies storage contents.
   * @public
   * @returns {string}
   */
  toString() {
    return JSON.stringify(this._storage);
  }

  /**
   * @name toJSON
   * @description Returns FallbackLocalStorage or stringified localStorage/sessionStorage.
   * @public
   * @returns {*}
   */
  toJSON() {
    if ("toJSON" in this._storage && typeof this._storage.toJSON === "function") {
      return this._storage.toJSON();
    }
    return JSON.stringify(this._storage);
  }

  /**
   * @name toStringTag
   * @description Returns FallbackLocalStorage instance as a string.
   * @public
   * @returns {string}
   */
  toStringTag() {
    return this.toString();
  }

  /**
   * @name getItem
   * @description When passed a key name, will return that key's value if storage has an item at that key.
   * Otherwise it returns defaults, the optional second param (null if not provided).
   * @public
   * @param {string} name - The name of the key you want to retrieve the value of.
   * @param {*} [defaults=null] - Default value to return if no item found at key name.
   * @returns {*}
   * @example fallbackStorage.getItem("email") // "person@example.org"
   */
  getItem(name, defaults = null) {
    const strName = `${name}`;
    if (!this.hasItem(strName)) {
      return defaults;
    }
    if (!this._serialize) {
      return this._storage.getItem(strName);
    }
    return this._serializer.deserialize(this._storage.getItem(strName));
  }

  /**
   * @name setItem
   * @description When passed a key name and value, will add that key to the storage,
   * or update that key's value if it already exists.
   * @public
   * @param {string} name - The key to create or update.
   * @param {*} value - Value to store at the given key.
   * @returns {boolean} Was operation successful
   * @example appStorage.setItem("hash", { name: "John" })
   */
  setItem(name, value) {
    const strName = `${name}`;
    let setValue;
    if (this._serialize) {
      setValue = this._serializer.serialize(value);
    } else {
      if (this._debug && typeof value !== "string") {
        console.warn(`Value for key "${strName}" will be converted to string: "${value}"`);
      }
      setValue = `${value}`;
    }
    let returnState = true;
    try {
      this._storage.setItem(strName, setValue);
    } catch (error) {
      returnState = `Device exceeded storage data limit or encounter error.\n${error}`;
      if (this._debug) {
        console.warn(returnState);
      }
    }
    if (this._iterable) {
      this[strName] = setValue;
    }
    return returnState;
  }

  /**
   * @name hasItem
   * @description Check if key exists in storage.
   * @public
   * @param {string} name - Key to check
   * @returns {boolean}
   * @example fallbackStorage.hasItem('email') // true
   */
  hasItem(name) {
    const strName = `${name}`;
    if (typeof this._storage.hasItem === "function") {
      return this._storage.hasItem(strName);
    }
    return strName in this._storage && !(strName in theGlobal.Storage.prototype);
  }

  /**
   * @name removeItem
   * @description Removes the given key from storage.
   * @public
   * @param {string} name - Key to remove
   * @example fallbackStorage.removeItem('email')
   */
  removeItem(name) {
    const strName = `${name}`;
    if (this.hasItem(strName)) {
      if (this._iterable) {
        delete this[strName];
      }
      this._storage.removeItem(strName);
    }
  }

  /**
   * @name clear
   * @description Empties all keys out of the storage.
   * @public
   * @example fallbackStorage.clear()
   */
  clear() {
    if (this._iterable) {
      Object.keys(this).forEach((name) => delete this[name]);
    }
    this._storage.clear();
  }

  /**
   * @name: key
   * @description Returns the name of the nth key in the storage. This is a zero-based index.
   * @public
   * @param {number} key - An integer representing the number of the key you want to get the name of.
   * @returns {*}
   */
  key(key) {
    if (!this._serialize) {
      if (typeof this._storage.key === "function") {
        return this._storage.key(key);
      }
      if (key in this.values()) {
        return this.values()[key];
      }
      return null;
    }
    let value = null;
    if (typeof this._storage.key === "function") {
      value = this._storage.key(key);
    } else if (key in this.values()) {
      value = this.values()[key];
    }
    return this._serializer.deserialize(value);
  }

  /**
   * @name item
   * @description Returns value at key. If a second argument is provided, it will be set as that key's value and
   * returned.
   * @public
   * @param {...*} args - Key name and (optional) value to store at that key
   * @returns {*} Value at the given key
   */
  item(...args) {
    if (!args.length || args.length > 2) {
      return null;
    }
    if (args.length === 1) {
      return this.getItem(args[0]);
    }
    this.setItem(args[0], args[1]);
    return this.getItem(args[0]);
  }

  /**
   * @name keys
   * @description Returns an array of keys saved in storage.
   * @public
   * @returns {Array.<string>} Key names
   */
  keys() {
    if (typeof this._storage.keys === "function") {
      return this._storage.keys();
    }
    return Object.keys(this._storage);
  }

  /**
   * @name values
   * @description Returns an array of values saved in storage.
   * @public
   * @returns {Array}
   */
  values() {
    if (!this._serialize) {
      if (typeof this._storage.values === "function") {
        return this._storage.values();
      }
      return Object.values(this._storage);
    }
    let values;
    if (typeof this._storage.values === "function") {
      values = this._storage.values();
    } else {
      values = Object.values(this._storage);
    }
    return values.map((value) => this._serializer.deserialize(value));
  }

  /**
   * @name entries
   * @description Returns an array of [key,value] pairs for all storage items.
   * @public
   * @returns {Array.<Object<string, *>>}
   */
  entries() {
    if (!this._serialize) {
      if (typeof this._storage.entries === "function") {
        return this._storage.entries();
      }
      return Object.entries(this._storage);
    }
    let entries;
    if (typeof this._storage.entries === "function") {
      entries = this._storage.entries();
    } else {
      entries = Object.entries(this._storage);
    }
    return entries.map((entry) => {
      const newEntry = [];
      newEntry[0] = entry[0];
      newEntry[1] = this._serializer.deserialize(entry[1]);
      return newEntry;
    });
  }

  /**
   * @name forEach
   * @description Executes a provided function once per array element.
   * @public
   * @param {Function} callback - Function applied to each stored value
   * @param {Object=} thisArg - If no `this` arg is provided, `this` will be replaced with the global object
   */
  forEach(callback, thisArg) {
    const keys = this.keys();
    if (!keys.length) {
      return;
    }
    if (typeof callback !== "function") {
      return;
    }
    if (this._serialize === false && typeof this._storage.forEach === "function") {
      this._storage.forEach.call(thisArg, callback);
    }
    this.entries().forEach((value, key) => callback.call(thisArg, value, key));
  }

  /**
   * @name length
   * @description Returns an integer representing the number of data items stored in the object.
   * @returns {number}
   */
  get length() {
    return this.keys().length;
  }

  /**
   * @param {Number} value
   */
  set length(value) {
    this.keys().length;
  }
}

export default FallbackLocalStorage;
