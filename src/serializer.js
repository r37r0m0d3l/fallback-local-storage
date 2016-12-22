import * as JSON3 from 'json3';

/**
 * Trying to parse or stringify JSON, do not throws errors
 * @class Serializer
 */
class Serializer {

  constructor(debug = false) {
    Object.defineProperty(this, "_debug", {
      value: !!debug,
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
      result = JSON3.parse(value);
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
    return JSON3.stringify(value);
  }

}
module.exports = Serializer;