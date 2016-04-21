!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define("FallbackLocalStorage",[],e):"object"==typeof exports?exports.FallbackLocalStorage=e():t.FallbackLocalStorage=e()}(this,function(){return function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return t[r].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){t.exports=n(1)},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}var o=n(2),i=r(o),u=n(37),a=r(u),f=n(40),s=r(f),c=n(45),l=r(c),p=n(47),h=r(p),d=n(79),v=r(d),y=n(80),g=r(y),b=n(84),_=r(b),m=n(85),x=r(m),S=function(){function t(){var e=arguments.length<=0||void 0===arguments[0]?!1:arguments[0],n=arguments.length<=1||void 0===arguments[1]?!1:arguments[1],r=arguments.length<=2||void 0===arguments[2]?!1:arguments[2],o=arguments[3];(0,v["default"])(this,t),Object.defineProperty(this,"_debug",{value:!!e,writable:!0,configurable:!1,enumerable:!1}),Object.defineProperty(this,"_iterable",{value:!!n,writable:!1,configurable:!1,enumerable:!1}),Object.defineProperty(this,"_serialize",{value:!!r,writable:!1,configurable:!1,enumerable:!1}),Object.defineProperty(this,"_serializer",{value:function(t){return o?"function"==typeof o?new o(t._debug):"object"===("undefined"==typeof o?"undefined":(0,h["default"])(o))?o:new x["default"](t._debug):new x["default"](t._debug)}(this),writable:!1,configurable:!1,enumerable:!1});var i={},u=t.getStorage();switch(!0){case u.indexOf("localStorage")>-1:i=localStorage,this._debug&&console.info("FallbackLocalStorage. Start using [localStorage].");break;case u.indexOf("sessionStorage")>-1:i=sessionStorage,this._debug&&console.warn("FallbackLocalStorage. Start using [sessionStorage].");break;default:i=new _["default"],this._debug&&console.warn("FallbackLocalStorage. Start using [fallbackStorage].")}Object.defineProperty(this,"_storage",{value:i,writable:!0,configurable:!1,enumerable:!1})}return(0,g["default"])(t,[{key:"toString",value:function(){return(0,l["default"])(this._storage)}},{key:"toStringTag",value:function(){return this.toString()}},{key:"getItem",value:function(t){var e=arguments.length<=1||void 0===arguments[1]?null:arguments[1];return this.hasItem(t)?this._serialize?this._serializer.deserialize(this._storage.getItem(t)):this._storage.getItem(t):e}},{key:"setItem",value:function(t,e){var n=void 0;this._serialize?n=this._serializer.serialize(e):(this._debug&&"string"!=typeof e&&console.warn('Value for key "'+t+'" will be converted to string:\n"'+e+'"'),n=""+e);var r=!0;try{this._storage.setItem(t,n)}catch(o){r="Device exceeded storage data limit or encounter error.\n"+o,this._debug&&console.warn(r)}return this._iterable&&(this[t]=n),r}},{key:"hasItem",value:function(t){return"function"==typeof this._storage.hasItem?this._storage.hasItem(t):t in this._storage&&!(t in Storage.prototype)}},{key:"removeItem",value:function(t){this._iterable&&delete this[t],this._storage.removeItem(t)}},{key:"clear",value:function(){var t=this;this._iterable&&(0,s["default"])(this).forEach(function(e){return delete t[e]}),this._storage.clear()}},{key:"key",value:function(t){if(!this._serialize)return"function"==typeof this._storage.key?this._storage.key(t):t in this.values()?this.values()[t]:null;var e=null;return"function"==typeof this._storage.key?e=this._storage.key(t):t in this.values()&&(e=this.values()[t]),this._serializer.deserialize(e)}},{key:"item",value:function(){return!arguments.length||arguments.length>2?null:1===arguments.length?this.getItem(arguments.length<=0?void 0:arguments[0]):(this.setItem(arguments.length<=0?void 0:arguments[0],arguments.length<=1?void 0:arguments[1]),this.getItem(arguments.length<=0?void 0:arguments[0]))}},{key:"keys",value:function(){return"function"==typeof this._storage.keys?this._storage.keys():(0,s["default"])(this._storage)}},{key:"values",value:function e(){var t=this;if(!this._serialize)return"function"==typeof this._storage.values?this._storage.values():(0,a["default"])(this._storage);var e=void 0;return e="function"==typeof this._storage.values?this._storage.values():(0,a["default"])(this._storage),e.map(function(e){return t._serializer.deserialize(e)})}},{key:"entries",value:function n(){var t=this;if(!this._serialize)return"function"==typeof this._storage.entries?this._storage.entries():(0,i["default"])(this._storage);var n=void 0;return n="function"==typeof this._storage.entries?this._storage.entries():(0,i["default"])(this._storage),n.map(function(e){var n=[];return n[0]=e[0],n[1]=t._serializer.deserialize(e[1]),n})}},{key:"forEach",value:function(t,e){var n=this.keys();n.length&&"function"==typeof t&&(this._serialize===!1&&"function"==typeof this._storage.forEach&&this._storage.forEach.call(e,t),this.entries().forEach(function(n,r){return t.call(e,n,r)}))}},{key:"length",get:function(){return this.keys().length},set:function(t){}}],[{key:"getStorage",value:function(){var t=[];try{if("undefined"!=typeof localStorage)try{localStorage.setItem("",""),t.push("localStorage")}catch(e){}}catch(e){}try{if("undefined"!=typeof sessionStorage)try{sessionStorage.setItem("",""),t.push("sessionStorage")}catch(e){}}catch(e){}return t.push("fallbackStorage"),t}}]),t}();S.NAME="FallbackLocalStorage",S.VERSION="0.0.12",t.exports=S},function(t,e,n){t.exports={"default":n(3),__esModule:!0}},function(t,e,n){n(4),t.exports=n(7).Object.entries},function(t,e,n){var r=n(5),o=n(20)(!0);r(r.S,"Object",{entries:function(t){return o(t)}})},function(t,e,n){var r=n(6),o=n(7),i=n(8),u=n(10),a="prototype",f=function(t,e,n){var s,c,l,p=t&f.F,h=t&f.G,d=t&f.S,v=t&f.P,y=t&f.B,g=t&f.W,b=h?o:o[e]||(o[e]={}),_=b[a],m=h?r:d?r[e]:(r[e]||{})[a];h&&(n=e);for(s in n)c=!p&&m&&void 0!==m[s],c&&s in b||(l=c?m[s]:n[s],b[s]=h&&"function"!=typeof m[s]?n[s]:y&&c?i(l,r):g&&m[s]==l?function(t){var e=function(e,n,r){if(this instanceof t){switch(arguments.length){case 0:return new t;case 1:return new t(e);case 2:return new t(e,n)}return new t(e,n,r)}return t.apply(this,arguments)};return e[a]=t[a],e}(l):v&&"function"==typeof l?i(Function.call,l):l,v&&((b.virtual||(b.virtual={}))[s]=l,t&f.R&&_&&!_[s]&&u(_,s,l)))};f.F=1,f.G=2,f.S=4,f.P=8,f.B=16,f.W=32,f.U=64,f.R=128,t.exports=f},function(t,e){var n=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},function(t,e){var n=t.exports={version:"2.2.2"};"number"==typeof __e&&(__e=n)},function(t,e,n){var r=n(9);t.exports=function(t,e,n){if(r(t),void 0===e)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,r){return t.call(e,n,r)};case 3:return function(n,r,o){return t.call(e,n,r,o)}}return function(){return t.apply(e,arguments)}}},function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,e,n){var r=n(11),o=n(19);t.exports=n(15)?function(t,e,n){return r.f(t,e,o(1,n))}:function(t,e,n){return t[e]=n,t}},function(t,e,n){var r=n(12),o=n(14),i=n(18),u=Object.defineProperty;e.f=n(15)?Object.defineProperty:function(t,e,n){if(r(t),e=i(e,!0),r(n),o)try{return u(t,e,n)}catch(a){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(t[e]=n.value),t}},function(t,e,n){var r=n(13);t.exports=function(t){if(!r(t))throw TypeError(t+" is not an object!");return t}},function(t,e){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,e,n){t.exports=!n(15)&&!n(16)(function(){return 7!=Object.defineProperty(n(17)("div"),"a",{get:function(){return 7}}).a})},function(t,e,n){t.exports=!n(16)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(t,e){t.exports=function(t){try{return!!t()}catch(e){return!0}}},function(t,e,n){var r=n(13),o=n(6).document,i=r(o)&&r(o.createElement);t.exports=function(t){return i?o.createElement(t):{}}},function(t,e,n){var r=n(13);t.exports=function(t,e){if(!r(t))return t;var n,o;if(e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;if("function"==typeof(n=t.valueOf)&&!r(o=n.call(t)))return o;if(!e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;throw TypeError("Can't convert object to primitive value")}},function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},function(t,e,n){var r=n(21),o=n(24),i=n(36).f;t.exports=function(t){return function(e){for(var n,u=o(e),a=r(u),f=a.length,s=0,c=[];f>s;)i.call(u,n=a[s++])&&c.push(t?[n,u[n]]:u[n]);return c}}},function(t,e,n){var r=n(22),o=n(35);t.exports=Object.keys||function(t){return r(t,o)}},function(t,e,n){var r=n(23),o=n(24),i=n(28)(!1),u=n(32)("IE_PROTO");t.exports=function(t,e){var n,a=o(t),f=0,s=[];for(n in a)n!=u&&r(a,n)&&s.push(n);for(;e.length>f;)r(a,n=e[f++])&&(~i(s,n)||s.push(n));return s}},function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},function(t,e,n){var r=n(25),o=n(27);t.exports=function(t){return r(o(t))}},function(t,e,n){var r=n(26);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==r(t)?t.split(""):Object(t)}},function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},function(t,e){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},function(t,e,n){var r=n(24),o=n(29),i=n(31);t.exports=function(t){return function(e,n,u){var a,f=r(e),s=o(f.length),c=i(u,s);if(t&&n!=n){for(;s>c;)if(a=f[c++],a!=a)return!0}else for(;s>c;c++)if((t||c in f)&&f[c]===n)return t||c||0;return!t&&-1}}},function(t,e,n){var r=n(30),o=Math.min;t.exports=function(t){return t>0?o(r(t),9007199254740991):0}},function(t,e){var n=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?r:n)(t)}},function(t,e,n){var r=n(30),o=Math.max,i=Math.min;t.exports=function(t,e){return t=r(t),0>t?o(t+e,0):i(t,e)}},function(t,e,n){var r=n(33)("keys"),o=n(34);t.exports=function(t){return r[t]||(r[t]=o(t))}},function(t,e,n){var r=n(6),o="__core-js_shared__",i=r[o]||(r[o]={});t.exports=function(t){return i[t]||(i[t]={})}},function(t,e){var n=0,r=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++n+r).toString(36))}},function(t,e){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(t,e){e.f={}.propertyIsEnumerable},function(t,e,n){t.exports={"default":n(38),__esModule:!0}},function(t,e,n){n(39),t.exports=n(7).Object.values},function(t,e,n){var r=n(5),o=n(20)(!1);r(r.S,"Object",{values:function(t){return o(t)}})},function(t,e,n){t.exports={"default":n(41),__esModule:!0}},function(t,e,n){n(42),t.exports=n(7).Object.keys},function(t,e,n){var r=n(43),o=n(21);n(44)("keys",function(){return function(t){return o(r(t))}})},function(t,e,n){var r=n(27);t.exports=function(t){return Object(r(t))}},function(t,e,n){var r=n(5),o=n(7),i=n(16);t.exports=function(t,e){var n=(o.Object||{})[t]||Object[t],u={};u[t]=e(n),r(r.S+r.F*i(function(){n(1)}),"Object",u)}},function(t,e,n){t.exports={"default":n(46),__esModule:!0}},function(t,e,n){var r=n(7),o=r.JSON||(r.JSON={stringify:JSON.stringify});t.exports=function(t){return o.stringify.apply(o,arguments)}},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}e.__esModule=!0;var o=n(48),i=r(o),u=n(67),a=r(u),f="function"==typeof a["default"]&&"symbol"==typeof i["default"]?function(t){return typeof t}:function(t){return t&&"function"==typeof a["default"]&&t.constructor===a["default"]?"symbol":typeof t};e["default"]="function"==typeof a["default"]&&"symbol"===f(i["default"])?function(t){return"undefined"==typeof t?"undefined":f(t)}:function(t){return t&&"function"==typeof a["default"]&&t.constructor===a["default"]?"symbol":"undefined"==typeof t?"undefined":f(t)}},function(t,e,n){t.exports={"default":n(49),__esModule:!0}},function(t,e,n){n(50),n(63),t.exports=n(61)("iterator")},function(t,e,n){"use strict";var r=n(51)(!0);n(52)(String,"String",function(t){this._t=String(t),this._i=0},function(){var t,e=this._t,n=this._i;return n>=e.length?{value:void 0,done:!0}:(t=r(e,n),this._i+=t.length,{value:t,done:!1})})},function(t,e,n){var r=n(30),o=n(27);t.exports=function(t){return function(e,n){var i,u,a=String(o(e)),f=r(n),s=a.length;return 0>f||f>=s?t?"":void 0:(i=a.charCodeAt(f),55296>i||i>56319||f+1===s||(u=a.charCodeAt(f+1))<56320||u>57343?t?a.charAt(f):i:t?a.slice(f,f+2):(i-55296<<10)+(u-56320)+65536)}}},function(t,e,n){"use strict";var r=n(53),o=n(5),i=n(54),u=n(10),a=n(23),f=n(55),s=n(56),c=n(60),l=n(62),p=n(61)("iterator"),h=!([].keys&&"next"in[].keys()),d="@@iterator",v="keys",y="values",g=function(){return this};t.exports=function(t,e,n,b,_,m,x){s(n,e,b);var S,O,k,w=function(t){if(!h&&t in I)return I[t];switch(t){case v:return function(){return new n(this,t)};case y:return function(){return new n(this,t)}}return function(){return new n(this,t)}},j=e+" Iterator",P=_==y,E=!1,I=t.prototype,M=I[p]||I[d]||_&&I[_],z=M||w(_),F=_?P?w("entries"):z:void 0,N="Array"==e?I.entries||M:M;if(N&&(k=l(N.call(new t)),k!==Object.prototype&&(c(k,j,!0),r||a(k,p)||u(k,p,g))),P&&M&&M.name!==y&&(E=!0,z=function(){return M.call(this)}),r&&!x||!h&&!E&&I[p]||u(I,p,z),f[e]=z,f[j]=g,_)if(S={values:P?z:w(y),keys:m?z:w(v),entries:F},x)for(O in S)O in I||i(I,O,S[O]);else o(o.P+o.F*(h||E),e,S);return S}},function(t,e){t.exports=!0},function(t,e,n){t.exports=n(10)},function(t,e){t.exports={}},function(t,e,n){"use strict";var r=n(57),o=n(19),i=n(60),u={};n(10)(u,n(61)("iterator"),function(){return this}),t.exports=function(t,e,n){t.prototype=r(u,{next:o(1,n)}),i(t,e+" Iterator")}},function(t,e,n){var r=n(12),o=n(58),i=n(35),u=n(32)("IE_PROTO"),a=function(){},f="prototype",s=function(){var t,e=n(17)("iframe"),r=i.length,o=">";for(e.style.display="none",n(59).appendChild(e),e.src="javascript:",t=e.contentWindow.document,t.open(),t.write("<script>document.F=Object</script"+o),t.close(),s=t.F;r--;)delete s[f][i[r]];return s()};t.exports=Object.create||function(t,e){var n;return null!==t?(a[f]=r(t),n=new a,a[f]=null,n[u]=t):n=s(),void 0===e?n:o(n,e)}},function(t,e,n){var r=n(11),o=n(12),i=n(21);t.exports=n(15)?Object.defineProperties:function(t,e){o(t);for(var n,u=i(e),a=u.length,f=0;a>f;)r.f(t,n=u[f++],e[n]);return t}},function(t,e,n){t.exports=n(6).document&&document.documentElement},function(t,e,n){var r=n(11).f,o=n(23),i=n(61)("toStringTag");t.exports=function(t,e,n){t&&!o(t=n?t:t.prototype,i)&&r(t,i,{configurable:!0,value:e})}},function(t,e,n){var r=n(33)("wks"),o=n(34),i=n(6).Symbol,u="function"==typeof i;t.exports=function(t){return r[t]||(r[t]=u&&i[t]||(u?i:o)("Symbol."+t))}},function(t,e,n){var r=n(23),o=n(43),i=n(32)("IE_PROTO"),u=Object.prototype;t.exports=Object.getPrototypeOf||function(t){return t=o(t),r(t,i)?t[i]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?u:null}},function(t,e,n){n(64);for(var r=n(6),o=n(10),i=n(55),u=n(61)("toStringTag"),a=["NodeList","DOMTokenList","MediaList","StyleSheetList","CSSRuleList"],f=0;5>f;f++){var s=a[f],c=r[s],l=c&&c.prototype;l&&!l[u]&&o(l,u,s),i[s]=i.Array}},function(t,e,n){"use strict";var r=n(65),o=n(66),i=n(55),u=n(24);t.exports=n(52)(Array,"Array",function(t,e){this._t=u(t),this._i=0,this._k=e},function(){var t=this._t,e=this._k,n=this._i++;return!t||n>=t.length?(this._t=void 0,o(1)):"keys"==e?o(0,n):"values"==e?o(0,t[n]):o(0,[n,t[n]])},"values"),i.Arguments=i.Array,r("keys"),r("values"),r("entries")},function(t,e){t.exports=function(){}},function(t,e){t.exports=function(t,e){return{value:e,done:!!t}}},function(t,e,n){t.exports={"default":n(68),__esModule:!0}},function(t,e,n){n(69),n(78),t.exports=n(7).Symbol},function(t,e,n){"use strict";var r=n(6),o=n(7),i=n(23),u=n(15),a=n(5),f=n(54),s=n(70).KEY,c=n(16),l=n(33),p=n(60),h=n(34),d=n(61),v=n(71),y=n(72),g=n(74),b=n(12),_=n(24),m=n(18),x=n(19),S=n(57),O=n(75),k=n(77),w=n(11),j=k.f,P=w.f,E=O.f,I=r.Symbol,M=r.JSON,z=M&&M.stringify,F=!1,N="prototype",T=d("_hidden"),A=d("toPrimitive"),L={}.propertyIsEnumerable,C=l("symbol-registry"),J=l("symbols"),R=Object[N],D="function"==typeof I,W=r.QObject,U=u&&c(function(){return 7!=S(P({},"a",{get:function(){return P(this,"a",{value:7}).a}})).a})?function(t,e,n){var r=j(R,e);r&&delete R[e],P(t,e,n),r&&t!==R&&P(R,e,r)}:P,G=function(t){var e=J[t]=S(I[N]);return e._k=t,u&&F&&U(R,t,{configurable:!0,set:function(e){i(this,T)&&i(this[T],t)&&(this[T][t]=!1),U(this,t,x(1,e))}}),e},K=D&&"symbol"==typeof I.iterator?function(t){return"symbol"==typeof t}:function(t){return t instanceof I},B=function(t,e,n){return b(t),e=m(e,!0),b(n),i(J,e)?(n.enumerable?(i(t,T)&&t[T][e]&&(t[T][e]=!1),n=S(n,{enumerable:x(0,!1)})):(i(t,T)||P(t,T,x(1,{})),t[T][e]=!0),U(t,e,n)):P(t,e,n)},V=function(t,e){b(t);for(var n,r=y(e=_(e)),o=0,i=r.length;i>o;)B(t,n=r[o++],e[n]);return t},Y=function(t,e){return void 0===e?S(t):V(S(t),e)},Q=function(t){var e=L.call(this,t=m(t,!0));return e||!i(this,t)||!i(J,t)||i(this,T)&&this[T][t]?e:!0},q=function(t,e){var n=j(t=_(t),e=m(e,!0));return!n||!i(J,e)||i(t,T)&&t[T][e]||(n.enumerable=!0),n},H=function(t){for(var e,n=E(_(t)),r=[],o=0;n.length>o;)i(J,e=n[o++])||e==T||e==s||r.push(e);return r},X=function(t){for(var e,n=E(_(t)),r=[],o=0;n.length>o;)i(J,e=n[o++])&&r.push(J[e]);return r},Z=function(t){if(void 0!==t&&!K(t)){for(var e,n,r=[t],o=1;arguments.length>o;)r.push(arguments[o++]);return e=r[1],"function"==typeof e&&(n=e),!n&&g(e)||(e=function(t,e){return n&&(e=n.call(this,t,e)),K(e)?void 0:e}),r[1]=e,z.apply(M,r)}},$=c(function(){var t=I();return"[null]"!=z([t])||"{}"!=z({a:t})||"{}"!=z(Object(t))});D||(I=function(){if(this instanceof I)throw TypeError("Symbol is not a constructor!");return G(h(arguments.length>0?arguments[0]:void 0))},f(I[N],"toString",function(){return this._k}),k.f=q,w.f=B,n(76).f=O.f=H,n(36).f=Q,n(73).f=X,u&&!n(53)&&f(R,"propertyIsEnumerable",Q,!0)),a(a.G+a.W+a.F*!D,{Symbol:I});for(var tt="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),et=0;tt.length>et;){var nt=tt[et++],rt=o.Symbol,ot=d(nt);nt in rt||P(rt,nt,{value:D?ot:G(ot)})}W&&W[N]&&W[N].findChild||(F=!0),a(a.S+a.F*!D,"Symbol",{"for":function(t){return i(C,t+="")?C[t]:C[t]=I(t)},keyFor:function(t){if(K(t))return v(C,t);throw TypeError(t+" is not a symbol!")},useSetter:function(){F=!0},useSimple:function(){F=!1}}),a(a.S+a.F*!D,"Object",{create:Y,defineProperty:B,defineProperties:V,getOwnPropertyDescriptor:q,getOwnPropertyNames:H,getOwnPropertySymbols:X}),M&&a(a.S+a.F*(!D||$),"JSON",{stringify:Z}),I[N][A]||n(10)(I[N],A,I[N].valueOf),p(I,"Symbol"),p(Math,"Math",!0),p(r.JSON,"JSON",!0)},function(t,e,n){var r=n(34)("meta"),o=n(13),i=n(23),u=n(11).f,a=0,f=Object.isExtensible||function(){return!0},s=!n(16)(function(){return f(Object.preventExtensions({}))}),c=function(t){u(t,r,{value:{i:"O"+ ++a,w:{}}})},l=function(t,e){if(!o(t))return"symbol"==typeof t?t:("string"==typeof t?"S":"P")+t;if(!i(t,r)){if(!f(t))return"F";if(!e)return"E";c(t)}return t[r].i},p=function(t,e){if(!i(t,r)){if(!f(t))return!0;if(!e)return!1;c(t)}return t[r].w},h=function(t){return s&&d.NEED&&f(t)&&!i(t,r)&&c(t),t},d=t.exports={KEY:r,NEED:!1,fastKey:l,getWeak:p,onFreeze:h}},function(t,e,n){var r=n(21),o=n(24);t.exports=function(t,e){for(var n,i=o(t),u=r(i),a=u.length,f=0;a>f;)if(i[n=u[f++]]===e)return n}},function(t,e,n){var r=n(21),o=n(73),i=n(36);t.exports=function(t){var e=r(t),n=o.f;if(n)for(var u,a=n(t),f=i.f,s=0;a.length>s;)f.call(t,u=a[s++])&&e.push(u);return e}},function(t,e){e.f=Object.getOwnPropertySymbols},function(t,e,n){var r=n(26);t.exports=Array.isArray||function(t){return"Array"==r(t)}},function(t,e,n){var r=n(24),o=n(76).f,i={}.toString,u="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],a=function(t){try{return o(t)}catch(e){return u.slice()}};t.exports.f=function(t){return u&&"[object Window]"==i.call(t)?a(t):o(r(t))}},function(t,e,n){var r=n(22),o=n(35).concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return r(t,o)}},function(t,e,n){var r=n(36),o=n(19),i=n(24),u=n(18),a=n(23),f=n(14),s=Object.getOwnPropertyDescriptor;e.f=n(15)?s:function(t,e){if(t=i(t),e=u(e,!0),f)try{return s(t,e)}catch(n){}return a(t,e)?o(!r.f.call(t,e),t[e]):void 0}},function(t,e){},function(t,e){"use strict";e.__esModule=!0,e["default"]=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}e.__esModule=!0;var o=n(81),i=r(o);e["default"]=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),(0,i["default"])(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}()},function(t,e,n){t.exports={"default":n(82),__esModule:!0}},function(t,e,n){n(83);var r=n(7).Object;t.exports=function(t,e,n){return r.defineProperty(t,e,n)}},function(t,e,n){var r=n(5);r(r.S+r.F*!n(15),"Object",{defineProperty:n(11).f})},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(45),i=r(o),u=n(2),a=r(u),f=n(37),s=r(f),c=n(40),l=r(c),p=n(79),h=r(p),d=n(80),v=r(d),y=function(){function t(){(0,h["default"])(this,t),this._data={}}return(0,v["default"])(t,[{key:"setItem",value:function(t,e){t&&(this._data[t]=""+e)}},{key:"getItem",value:function(t){return t in this._data?this._data[t]:null}},{key:"hasItem",value:function(t){return t in this._data}},{key:"removeItem",value:function(t){t in this._data&&delete this._data[t]}},{key:"key",value:function(t){var e=(0,l["default"])(this._data);return t in e?e[t]:null}},{key:"clear",value:function(){this._data={}}},{key:"keys",value:function(){return(0,l["default"])(this._data)}},{key:"values",value:function(){return(0,s["default"])(this._data)}},{key:"entries",value:function(){return(0,a["default"])(this._data)}},{key:"toString",value:function(){return(0,i["default"])(this._data)}},{key:"valueOf",value:function(){return this._data}},{key:"toJSON",value:function(){return this._data}},{key:"length",get:function(){return(0,l["default"])(this._data).length},set:function(t){}}]),t}();e["default"]=y},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}var o=n(45),i=r(o),u=n(47),a=r(u),f=n(79),s=r(f),c=n(80),l=r(c),p=function(){function t(){var e=arguments.length<=0||void 0===arguments[0]?!1:arguments[0];(0,s["default"])(this,t),Object.defineProperty(this,"_debug",{value:!!e,writable:!0,configurable:!1,enumerable:!1})}return(0,l["default"])(t,[{key:"deserialize",value:function(t,e){var n=e,r="undefined"==typeof t?"undefined":(0,a["default"])(t);if(!t)return this._debug&&(console.warn("Unable to parse scalar or empty values"),console.dir(t)),n;if("object"===r)return this._debug&&(console.warn("It looks like value is already parsed"),console.dir(t)),t;if("string"!==r)return this._debug&&(console.warn("Unable to parse non-string values"),console.dir(t)),n;try{n=JSON.parse(t)}catch(o){this._debug&&(console.warn("Unable to parse serialized data"),console.dir(t),console.dir(o))}return n}},{key:"serialize",value:function(t){return(0,i["default"])(t)}}]),t}();t.exports=p}])});
//# sourceMappingURL=fallback-local-storage.web.js.map