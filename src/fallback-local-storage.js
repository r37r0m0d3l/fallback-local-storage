import FallbackStorage from "./storage";

class FallbackLocalStorage {

  constructor(debug = false) {
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
    Object.defineProperty(this, "version", {
      value: "0.0.4",
      writable: false,
      configurable: false,
      enumerable: false,
    });
    let storage = {};
    switch (true) {
      case typeof localStorage !== "undefined":
        storage = localStorage;
        if (this.debug) {
          console.info("FallbackLocalStorage. Start using [window.localStorage].");
        }
        break;
      case typeof sessionStorage !== "undefined":
        storage = sessionStorage;
        if (this.debug) {
          console.warn("FallbackLocalStorage. Start using [window.sessionStorage].");
        }
        break;
      default:
        storage = new FallbackStorage;
        if (this.debug) {
          console.warn("FallbackLocalStorage. Start using [FallbackStorage].");
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
    this[name] = `${value}`;
    return returnState;
  }

  hasItem(name) {
    if (typeof this._storage.hasItem === "function") {
      return this._storage.hasItem(name);
    }
    return ((name in this._storage) && !(name in Storage.prototype));
  }

  removeItem(name) {
    delete this[name];
    this._storage.removeItem(name);
  }

  clear() {
    Object.keys(this).forEach((name) => delete this[name]);
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