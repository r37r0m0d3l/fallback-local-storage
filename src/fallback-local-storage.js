import FallbackStorage from "./storage";
import Serializer from "./serializer";

class FallbackLocalStorage {
  static NAME = "FallbackLocalStorage";
  static VERSION = "0.0.10";
  /**
   * @constructor
   * @param {boolean=false} debug
   * @param {boolean=true} iterable
   * @param {boolean=false} autoSerialize
   * @param {Function|Object=} CustomSerializer
   */
  constructor(debug = false, iterable = false, autoSerialize = false, CustomSerializer) {
    Object.defineProperty(this, "_debug", {
      value: !!debug,
      writable: true,
      configurable: false,
      enumerable: false,
    });
    Object.defineProperty(this, "_iterable", {
      value: !!iterable,
      writable: false,
      configurable: false,
      enumerable: false,
    });
    Object.defineProperty(this, "_serialize", {
      value: !!autoSerialize,
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
      }(this)),
      writable: false,
      configurable: false,
      enumerable: false,
    });
    let storage = {};
    const storageAvailable = FallbackLocalStorage.getStorage();
    switch (true) {
      case storageAvailable.indexOf("localStorage") > -1:
        storage = localStorage;
        if (this._debug) {
          console.info("FallbackLocalStorage. Start using [localStorage].");
        }
        break;
      case storageAvailable.indexOf("sessionStorage") > -1:
        storage = sessionStorage;
        if (this._debug) {
          console.warn("FallbackLocalStorage. Start using [sessionStorage].");
        }
        break;
      default:
        storage = new FallbackStorage;
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
   * Return list of available storage
   * @returns {Array}
   */
  static getStorage() {
    const storage = [];
    try {
      if (typeof localStorage !== "undefined") {
        try {
          localStorage.setItem("", "");
          storage.push("localStorage");
        } catch (error) {
        }
      }
    } catch (error) {
    }
    try {
      if (typeof sessionStorage !== "undefined") {
        try {
          sessionStorage.setItem("", "");
          storage.push("sessionStorage");
        } catch (error) {
        }
      }
    } catch (error) {
    }
    storage.push("fallbackStorage");
    return storage;
  }

  toString() {
    return JSON.stringify(this._storage);
  }

  toStringTag() {
    return this.toString();
  }

  /**
   * When passed a key name, will return that key's value
   * @param {string} name - the name of the key you want to retrieve the value of
   * @param {*} defaults - default value to return
   * @returns {*}
   */
  getItem(name, defaults = null) {
    if (!this.hasItem(name)) {
      return defaults;
    }
    if (!this._serialize) {
      return this._storage.getItem(name);
    }
    return this._serializer.deserialize(this._storage.getItem(name));
  }

  setItem(name, value) {
    let setValue;
    if (this._serialize) {
      setValue = this._serializer.serialize(value);
    } else if (this._debug && typeof value !== "string") {
      console.warn(`Value for key "${name}" will be converted to string:\n"${value}"`);
      setValue = value;
    }
    let returnState = true;
    try {
      this._storage.setItem(name, setValue);
    } catch (error) {
      returnState = `Device exceeded storage data limit or encounter error.\n${error}`;
      if (this._debug) {
        console.warn(returnState);
      }
    }
    if (this._iterable) {
      this[name] = `${setValue}`;
    }
    return returnState;
  }

  hasItem(name) {
    if (typeof this._storage.hasItem === "function") {
      return this._storage.hasItem(name);
    }
    return ((name in this._storage) && !(name in Storage.prototype));
  }

  removeItem(name) {
    if (this._iterable) {
      delete this[name];
    }
    this._storage.removeItem(name);
  }

  clear() {
    if (this._iterable) {
      Object.keys(this).forEach((name) => delete this[name]);
    }
    this._storage.clear();
  }

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
   * @returns {Array}
   */
  keys() {
    if (typeof this._storage.keys === "function") {
      return this._storage.keys();
    }
    return Object.keys(this._storage);
  }

  /**
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
   * Returns an array of [key, value] pairs
   * @returns {Iterator.<*>}
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
   * Executes a provided function once per array element
   * @param {Function} callback
   * @param {Object=} thisArg
   */
  forEach(callback, thisArg) {
    const keys = this.keys();
    if (!keys.length) {
      return;
    }
    if (typeof callback !== "function") {
      return;
    }
    if ((this._serialize === false) && (typeof this._storage.forEach === "function")) {
      this._storage.forEach.call(thisArg, callback);
    }
    this.entries().forEach((value, key) => callback.call(thisArg, value, key));
  }

  /**
   * Returns an integer representing the number of data items stored in the object
   * @returns {Number}
   */
  get length() {
    return this.keys().length;
  }

  /**
   * @param {Number} value
   */
  set length(value) {
  }
}
module.exports = FallbackLocalStorage;