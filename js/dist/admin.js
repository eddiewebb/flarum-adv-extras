module.exports=function(e){var r={};function n(a){if(r[a])return r[a].exports;var t=r[a]={i:a,l:!1,exports:{}};return e[a].call(t.exports,t,t.exports,n),t.l=!0,t.exports}return n.m=e,n.c=r,n.d=function(e,r,a){n.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:a})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,r){if(1&r&&(e=n(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var t in e)n.d(a,t,function(r){return e[r]}.bind(null,t));return a},n.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(r,"a",r),r},n.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},n.p="",n(n.s=35)}({20:function(e,r){e.exports=flarum.core.compat["components/BasicsPage"]},35:function(e,r,n){"use strict";n.r(r);var a=n(5),t=n(20),o=n.n(t);app.initializers.add("webbinaro/flarum-calendar",(function(){console.log("[webbinaro/flarum-calendar] Hello, admin!"),app.extensionData.for("webbinaro-calendar").registerPermission({icon:"fas fa-calendar",label:app.translator.trans("flarum-calendar.admin.permissions.view"),permission:"event.view",allowGuest:!0},"view",95).registerPermission({icon:"fas fa-calendar-plus",label:app.translator.trans("flarum-calendar.admin.permissions.add"),permission:"event.create"},"start",95).registerPermission({icon:"fas fa-calendar-times",label:app.translator.trans("flarum-calendar.admin.permissions.moderate"),permission:"event.moderate"},"moderate",95),Object(a.extend)(o.a.prototype,"homePageItems",(function(e){e.add("events",{path:"/events",label:app.translator.trans("flarum-calendar.admin.basics.homepage")})}))}))},5:function(e,r){e.exports=flarum.core.compat.extend}});
//# sourceMappingURL=admin.js.map