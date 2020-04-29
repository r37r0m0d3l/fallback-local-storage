/**
 * @class FallbackLocalStorage
 */
declare class FallbackLocalStorage {
    /**
     * @type {"FallbackLocalStorage"}
     * @static
     */
    static get NAME(): "FallbackLocalStorage";
    /**
     * @type {string}
     * @static
     */
    static get VERSION(): string;
    /**
     * @name getStorage
     * @description Return list of available storage. Can return `localStorage`, `sessionStorage` and `fallbackStorage`.
     * Will always return at least `fallbackStorage`.
     * @public
     * @returns {Array.<"localStorage"|"sessionStorage"|"fallbackStorage">} Available storage locations
     * @example FallbackLocalStorage.getStorage() // ["localStorage", "fallbackStorage"]
     * @static
     */
    public static getStorage(): ("localStorage" | "sessionStorage" | "fallbackStorage")[];
    /**
     * @constructor
     * @param {boolean} [debug=false] - Toggle debug information output.
     * @param {boolean} [iterable=false] - Allow iteration over instance. Disable if you don't want be compatible with
     * localStorage.
     * @param {boolean} [autoSerialize=false] - Serialize data before save and retrieve. VERY RECOMMENDED.
     * @param {(Function|Object)} [CustomSerializer=null] - Custom serializer for values.
     * @public
     */
    constructor(debug?: boolean, iterable?: boolean, autoSerialize?: boolean, CustomSerializer?: Object | Function);
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
     * @param {string} name - The name of the key you want to retrieve the value of.
     * @param {*} [defaults=null] - Default value to return if no item found at key name.
     * @returns {*}
     * @example fallbackStorage.getItem("email") // "person@example.org"
     */
    public getItem(name: string, defaults?: any): any;
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
    public setItem(name: string, value: any): boolean;
    /**
     * @name hasItem
     * @description Check if key exists in storage.
     * @public
     * @param {string} name - Key to check
     * @returns {boolean}
     * @example fallbackStorage.hasItem('email') // true
     */
    public hasItem(name: string): boolean;
    /**
     * @name removeItem
     * @description Removes the given key from storage.
     * @public
     * @param {string} name - Key to remove
     * @example fallbackStorage.removeItem('email')
     */
    public removeItem(name: string): void;
    /**
     * @name clear
     * @description Empties all keys out of the storage.
     * @public
     * @example fallbackStorage.clear()
     */
    public clear(): void;
    /**
     * @name: key
     * @description Returns the name of the nth key in the storage. This is a zero-based index.
     * @public
     * @param {number} key - An integer representing the number of the key you want to get the name of.
     * @returns {*}
     */
    public key(key: number): any;
    /**
     * @name item
     * @description Returns value at key. If a second argument is provided, it will be set as that key's value and
     * returned.
     * @public
     * @param {...*} args - Key name and (optional) value to store at that key
     * @returns {*} Value at the given key
     */
    public item(...args: any[]): any;
    /**
     * @name keys
     * @description Returns an array of keys saved in storage.
     * @public
     * @returns {Array.<string>} Key names
     */
    public keys(): string[];
    /**
     * @name values
     * @description Returns an array of values saved in storage.
     * @public
     * @returns {Array}
     */
    public values(): any[];
    /**
     * @name entries
     * @description Returns an array of [key,value] pairs for all storage items.
     * @public
     * @returns {Array.<Object<string, *>>}
     */
    public entries(): {
        [x: string]: any;
    }[];
    /**
     * @name forEach
     * @description Executes a provided function once per array element.
     * @public
     * @param {Function} callback - Function applied to each stored value
     * @param {Object=} thisArg - If no `this` arg is provided, `this` will be replaced with the global object
     */
    public forEach(callback: Function, thisArg?: Object): void;
    /**
     * @param {Number} value
     */
    set length(arg: number);
    /**
     * @name length
     * @description Returns an integer representing the number of data items stored in the object.
     * @returns {number}
     */
    get length(): number;
}

export default FallbackLocalStorage;
