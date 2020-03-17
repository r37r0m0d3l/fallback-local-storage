let e=function(){if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;if("undefined"!=typeof global)return global;throw new Error("unable to locate global object")}();function cloneDeep(e){return JSON.parse(JSON.stringify(e))}function isSet(e){return e&&(e instanceof Set||"Set"===e.constructor.name)}function isKeyed(e){return function isMap(e){return e&&(e instanceof Map||"Map"===e.constructor.name)}(e)||isSet(e)}class Serializer{constructor(e=!1){Object.defineProperty(this,"_debug",{value:Boolean(e),writable:!0,configurable:!1,enumerable:!1})}deserialize(e,t){let r=t;const s=typeof e;if(!e)return this._debug&&(console.warn("Unable to parse scalar or empty values"),console.dir(e)),r;if("object"===s)return this._debug&&(console.warn("It looks like value is already parsed"),console.dir(e)),e;if("string"!==s)return this._debug&&(console.warn("Unable to parse non-string values"),console.dir(e)),r;try{r=JSON.parse(e)}catch(t){this._debug&&(console.warn("Unable to parse serialized data"),console.dir(e),console.dir(t))}return r}serialize(e){return e?"object"!=typeof e||Array.isArray(e)?JSON.stringify(e):JSON.stringify(function keyedToObject(e){if(!isKeyed(e))return e;if(isSet(e))return Array.from(e).map(e=>isKeyed(e)?keyedToObject(e):e);const t={};return e.forEach((e,r)=>{isKeyed(e)?t[r]=keyedToObject(e):t[r]=e}),t}(e)):JSON.stringify(e)}}class FallbackStorage{constructor(){this._data={}}setItem(e,t){e&&(this._data[`${e}`]=`${t}`)}getItem(e){return e in this._data?cloneDeep(this._data[e]):null}hasItem(e){return e in this._data}removeItem(e){e in this._data&&delete this._data[e]}key(e){const t=Object.keys(this._data);return e in t?cloneDeep(t[e]):null}clear(){this._data={}}get length(){return Object.keys(this._data).length}set length(e){return Object.keys(this._data).length}keys(){return Object.keys(this._data)}values(){return Object.values(cloneDeep(this._data))}entries(){return Object.entries(cloneDeep(this._data))}toString(){return JSON.stringify(this._data)}valueOf(){return cloneDeep(this._data)}toJSON(){return cloneDeep(this._data)}}class FallbackLocalStorage{static get NAME(){return"FallbackLocalStorage"}static get VERSION(){return"0.0.22"}constructor(t=!1,r=!1,s=!0,i=null){Object.defineProperty(this,"_debug",{value:Boolean(t),writable:!0,configurable:!1,enumerable:!1}),Object.defineProperty(this,"_iterable",{value:Boolean(r),writable:!1,configurable:!1,enumerable:!1}),Object.defineProperty(this,"_serialize",{value:Boolean(s),writable:!1,configurable:!1,enumerable:!1}),Object.defineProperty(this,"_serializer",{value:function _serializer(e){return i?"function"==typeof i?new i(e._debug):"object"==typeof i?i:new Serializer(e._debug):new Serializer(e._debug)}(this),writable:!1,configurable:!1,enumerable:!1});let a={};const o=FallbackLocalStorage.getStorage();switch(!0){case o.indexOf("localStorage")>-1:a=e.localStorage,this._debug&&console.info("FallbackLocalStorage. Start using [localStorage].");break;case o.indexOf("sessionStorage")>-1:a=e.sessionStorage,this._debug&&console.warn("FallbackLocalStorage. Start using [sessionStorage].");break;default:a=new FallbackStorage,this._debug&&console.warn("FallbackLocalStorage. Start using [fallbackStorage].")}Object.defineProperty(this,"_storage",{value:a,writable:!0,configurable:!1,enumerable:!1})}static getStorage(){const t=[];try{if(void 0!==e.localStorage)try{e.localStorage.setItem("",""),t.push("localStorage")}catch(e){}}catch(e){}try{if(void 0!==e.sessionStorage)try{e.sessionStorage.setItem("",""),t.push("sessionStorage")}catch(e){}}catch(e){}return t.push("fallbackStorage"),t}toString(){return JSON.stringify(this._storage)}toJSON(){return"toJSON"in this._storage&&"function"==typeof this._storage.toJSON?this._storage.toJSON():JSON.stringify(this._storage)}toStringTag(){return this.toString()}getItem(e,t=null){const r=`${e}`;return this.hasItem(r)?this._serialize?this._serializer.deserialize(this._storage.getItem(r)):this._storage.getItem(r):t}setItem(e,t){const r=`${e}`;let s;this._serialize?s=this._serializer.serialize(t):(this._debug&&"string"!=typeof t&&console.warn(`Value for key "${r}" will be converted to string: "${t}"`),s=`${t}`);let i=!0;try{this._storage.setItem(r,s)}catch(e){i=`Device exceeded storage data limit or encounter error.\n${e}`,this._debug&&console.warn(i)}return this._iterable&&(this[r]=s),i}hasItem(t){const r=`${t}`;return"function"==typeof this._storage.hasItem?this._storage.hasItem(r):r in this._storage&&!(r in e.Storage.prototype)}removeItem(e){const t=`${e}`;this.hasItem(t)&&(this._iterable&&delete this[t],this._storage.removeItem(t))}clear(){this._iterable&&Object.keys(this).forEach(e=>delete this[e]),this._storage.clear()}key(e){if(!this._serialize)return"function"==typeof this._storage.key?this._storage.key(e):e in this.values()?this.values()[e]:null;let t=null;return"function"==typeof this._storage.key?t=this._storage.key(e):e in this.values()&&(t=this.values()[e]),this._serializer.deserialize(t)}item(...e){return!e.length||e.length>2?null:(1===e.length||this.setItem(e[0],e[1]),this.getItem(e[0]))}keys(){return"function"==typeof this._storage.keys?this._storage.keys():Object.keys(this._storage)}values(){if(!this._serialize)return"function"==typeof this._storage.values?this._storage.values():Object.values(this._storage);let e;return e="function"==typeof this._storage.values?this._storage.values():Object.values(this._storage),e.map(e=>this._serializer.deserialize(e))}entries(){if(!this._serialize)return"function"==typeof this._storage.entries?this._storage.entries():Object.entries(this._storage);let e;return e="function"==typeof this._storage.entries?this._storage.entries():Object.entries(this._storage),e.map(e=>{const t=[];return t[0]=e[0],t[1]=this._serializer.deserialize(e[1]),t})}forEach(e,t){this.keys().length&&"function"==typeof e&&(!1===this._serialize&&"function"==typeof this._storage.forEach&&this._storage.forEach.call(t,e),this.entries().forEach((r,s)=>e.call(t,r,s)))}get length(){return this.keys().length}set length(e){return this.keys().length}}export default FallbackLocalStorage;
//# sourceMappingURL=fallback-local-storage.mjs.map
