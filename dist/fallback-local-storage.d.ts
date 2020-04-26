/**
 * Potentially supported storage methods.
 * @enum {string}
 */
export type StorageType = "localStorage" | "sessionStorage" | "fallbackStorage";

/**
 * @class FallbackLocalStorage
 */
declare class FallbackLocalStorage {
  /**
   * @type {string}
   * @static
   */
  static get NAME(): "FallbackLocalStorage";

  /**
   * @type {string}
   * @static
   */
  static get VERSION(): string;

  /**
   * @constructor
   * @param {boolean=false} debug Toggle debug information output.
   * @param {boolean=false} iterable Allow iteration over instance. Disable if you don't want be compatible with
   * localStorage.
   * @param {boolean=false} autoSerialize Serialize data before save and retrieve. VERY RECOMMENDED.
   * @param {Function|Object=null} CustomSerializer Custom serializer for values.
   * @public
   */
  public constructor(
    debug?: boolean,
    iterable?: boolean,
    autoSerialize?: boolean,
    CustomSerializer?: Function | Object
  );

  /**
   * @name getStorage
   * @description Return list of available storage. Can return `localStorage`, `sessionStorage` and `fallbackStorage`.
   * Will always return at least `fallbackStorage`.
   * @public
   * @returns {Array.<StorageType>} Available storage locations
   * @example (FallbackLocalStorage.getStorage() // ["localStorage", "fallbackStorage"])
   * @static
   */
  public static getStorage(): Array<StorageType>;

  /**
   * @name setItem
   * @description Sets the value of the pair identified by key to value, creating a new key/value pair if none existed for key previously.
   * @public
   * @param {string} key The key of the element to add to the FallbackLocalStorage object.
   * @param {*} value The value of the element to add to the FallbackLocalStorage object.
   * @returns {void}
   * @throws {DOMException}
   * @example (new FallbackLocalStorage()).setItem("myStringKey", { prop: "theValue" });
   */
  public setItem(key: string, value: any): void;

  /**
   * @name toString
   * @description Stringifies storage contents.
   * @public
   * @returns {string}
   */
  public toString(): string;

  /**
   * @name toJSON
   * @description Returns FallbackLocalStorage or stringified localStorage/sessionStorage.
   * @public
   * @returns {*}
   */
  public toJSON(): any;

  /**
   * @name toStringTag
   * @description Returns FallbackLocalStorage instance as a string.
   * @public
   * @returns {string}
   */
  public toStringTag(): string;

  /**
   * @name getItem
   * @description When passed a key name, will return that key's value if storage has an item at that key.
   * Otherwise it returns defaults, the optional second param (null if not provided).
   * @public
   * @param {string} name The name of the key you want to retrieve the value of.
   * @param {*} defaults Default value to return if no item found at key name.
   * @returns {*}
   * @example (fallbackStorage.getItem("email") // "person@example.org"
   */
  public getItem(name: string, defaults?: any): any;

  /**
   * @name setItem
   * @description When passed a key name and value, will add that key to the storage,
   * or update that key's value if it already exists.
   * @public
   * @param {string} name The key to create or update.
   * @param {*} value Value to store at the given key.
   * @returns {boolean} Was operation successful
   * @example (appStorage.setItem("hash", { name: "John" }))
   */
  public setItem(name: string, value: any): boolean;

  /**
   * @name hasItem
   * @description Check if key exists in storage.
   * @public
   * @param {string} name Key to check
   * @returns {boolean}
   * @example (fallbackStorage.hasItem('email') // true)
   */
  public hasItem(name: string): boolean;

  /**
   * @name removeItem
   * @description Removes the given key from storage.
   * @public
   * @param {string} name Key to remove
   * @example (fallbackStorage.removeItem('email'))
   */
  public removeItem(name: string): void;

  /**
   * @name clear
   * @description Empties all keys out of the storage.
   * @public
   * @example (fallbackStorage.clear())
   */
  public clear(): void;

  /**
   * @name: key
   * @description Returns the name of the nth key in the storage. This is a zero-based index.
   * @public
   * @param {number} key An integer representing the number of the key you want to get the name of.
   * @returns {*}
   */
  public key(key: number): any;

  /**
   * @name item
   * @description Returns value at key. If a second argument is provided, it will be set as that key's value and
   * returned.
   * @public
   * @param {string} name Key name to get value of
   * @param {*=} value Value to be stored at given key
   * @returns {*} Value at the given key
   */
  public item(name: string, value?: any): any;

  /**
   * @name keys
   * @description Returns an array of keys saved in storage.
   * @public
   * @returns {Array.<string>} Key names
   */
  public keys(): Array<string>;

  /**
   * @name values
   * @description Returns an array of values saved in storage.
   * @public
   * @returns {Array}
   */
  public values(): Array<any>;

  /**
   * @name entries
   * @description Returns an array of [key,value] pairs for all storage items.
   * @public
   * @returns {Array.<Object<string, *>>}
   */
  public entries(): Array<{ [name: string]: any }>

  /**
   * @name forEach
   * @description Executes a provided function once per array element.
   * @public
   * @param {Function} callback
   * @param {Object=} thisArg If no `this` arg is provided, `this` will be replaced with the global object
   */
  public forEach(callback: Function, thisArg?: Object): void;

  /**
   * @name length
   * @description Returns an integer representing the number of data items stored in the object.
   * @returns {number}
   */
  get length(): number;
}


declare class Serializer {
  /**
   * @constructor
   * @public
   */
  public constructor(debug?: boolean);
  /**
   * @name deserialize
   * @description Converts a JavaScript Object Notation (JSON) string into an object.
   * @public
   * @param {string} value A valid JSON string.
   * @param {*=} defaults Default value in case of failure.
   * @returns {*}
   * @example (new Serializer()).deserialize(`{"prop":"theValue"}`, null); // { prop: "theValue" }
   */
  public deserialize(value: string, defaults?: any): any;
}

export default FallbackLocalStorage;
