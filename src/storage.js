import cloneDeep from 'lodash.clonedeep';

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
    return (key in this._data);
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
    return Object.keys(this._data).length;
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

export default FallbackStorage;