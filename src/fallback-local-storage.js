import FallbackStorage from "./storage";

class FallbackLocalStorage {
  /**
   * @constructor
   * @param {boolean=false} debug
   * @param {boolean=true} iterable
   * @param {boolean=false} autoSerialize
   */
  constructor(debug = false, iterable = true, autoSerialize = false) {
    Object.defineProperty(this, "name", {
      value: "FallbackLocalStorage",
      writable: false,
      configurable: false,
      enumerable: false,
    });
    Object.defineProperty(this, "debug", {
      value: !!debug,
      writable: true,
      configurable: false,
      enumerable: false,
    });
    Object.defineProperty(this, "iterable", {
      value: !!iterable,
      writable: false,
      configurable: false,
      enumerable: false,
    });
    Object.defineProperty(this, "serialize", {
      value: !!autoSerialize,
      writable: false,
      configurable: false,
      enumerable: false,
    });
    Object.defineProperty(this, "version", {
      value: "0.0.6",
      writable: false,
      configurable: false,
      enumerable: false,
    });
    let storage = {};
    const storagesAvailable = FallbackLocalStorage.getStorage();
    switch (true) {
      case storagesAvailable.indexOf("localStorage") > -1:
        storage = localStorage;
        if (this.debug) {
          console.info("FallbackLocalStorage. Start using [localStorage].");
        }
        break;
      case storagesAvailable.indexOf("sessionStorage") > -1:
        storage = sessionStorage;
        if (this.debug) {
          console.warn("FallbackLocalStorage. Start using [sessionStorage].");
        }
        break;
      default:
        storage = new FallbackStorage;
        if (this.debug) {
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
   * @returns {Array}
   */
  static getStorage() {
    const storage = [];
    if (typeof localStorage !== "undefined") {
      try {
        localStorage.setItem("", "");
        storage.push("localStorage");
      } catch (error) {
      }
    }
    if (typeof sessionStorage !== "undefined") {
      try {
        sessionStorage.setItem("", "");
        storage.push("sessionStorage");
      } catch (error) {
      }
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

  getItem(name, defaults) {
    if (!this.hasItem(name)) {
      return arguments.length > 1 ? defaults : null;
    }
    return this._storage.getItem(name);
  }

  setItem(name, value) {
    if (this.debug && typeof value !== "string") {
      console.warn(`FallbackLocalStorage. Value for key "${name}" will be converted to string:
"${value}"`);
    }
    let returnState = true;
    try {
      this._storage.setItem(name, value);
    } catch (error) {
      returnState = `FallbackLocalStorage. Device exceeded storage data limit or encounter error.
${error}`;
      if (this.debug) {
        console.warn(returnState);
      }
    }
    if (this.iterable) {
      this[name] = `${value}`;
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
    if (this.iterable) {
      delete this[name];
    }
    this._storage.removeItem(name);
  }

  clear() {
    if (this.iterable) {
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

  keys() {
    if (typeof this._storage.keys === "function") {
      return this._storage.keys();
    }
    return Object.keys(this._storage);
  }

  values() {
    if (typeof this._storage.values === "function") {
      return this._storage.values();
    }
    return Object.values(this._storage);
  }

  entries() {
    if (typeof this._storage.entries === "function") {
      return this._storage.entries();
    }
    return Object.entries(this._storage);
  }
}

export default FallbackLocalStorage;