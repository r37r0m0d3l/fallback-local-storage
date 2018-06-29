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
    return Array.from(keyed).map(
      value => (isKeyed(value) ? keyedToObject(value) : value)
    );
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
      value: !!debug,
      writable: true,
      configurable: false,
      enumerable: false
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

module.exports = Serializer;
