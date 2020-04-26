export declare class FallbackLocalStorage {
  /**
   * @constructor
   * @public
   */
  public constructor();
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
}

export declare class Serializer {
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
