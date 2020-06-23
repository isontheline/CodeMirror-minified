'use strict';var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.findInternal=function(a,c,b){a instanceof String&&(a=String(a));for(var d=a.length,e=0;e<d;e++){var g=a[e];if(c.call(b,g,e,a))return{i:e,v:g}}return{i:-1,v:void 0}};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.SIMPLE_FROUND_POLYFILL=!1;$jscomp.ISOLATE_POLYFILLS=!1;
$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(a,c,b){if(a==Array.prototype||a==Object.prototype)return a;a[c]=b.value;return a};$jscomp.getGlobal=function(a){a=["object"==typeof globalThis&&globalThis,a,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof global&&global];for(var c=0;c<a.length;++c){var b=a[c];if(b&&b.Math==Math)return b}throw Error("Cannot find global object");};$jscomp.global=$jscomp.getGlobal(this);
$jscomp.IS_SYMBOL_NATIVE="function"===typeof Symbol&&"symbol"===typeof Symbol("x");$jscomp.TRUST_ES6_POLYFILLS=!$jscomp.ISOLATE_POLYFILLS||$jscomp.IS_SYMBOL_NATIVE;$jscomp.polyfills={};$jscomp.propertyToPolyfillSymbol={};$jscomp.POLYFILL_PREFIX="$jscp$";var $jscomp$lookupPolyfilledValue=function(a,c){var b=$jscomp.propertyToPolyfillSymbol[c];if(null==b)return a[c];b=a[b];return void 0!==b?b:a[c]};
$jscomp.polyfill=function(a,c,b,d){c&&($jscomp.ISOLATE_POLYFILLS?$jscomp.polyfillIsolated(a,c,b,d):$jscomp.polyfillUnisolated(a,c,b,d))};$jscomp.polyfillUnisolated=function(a,c,b,d){b=$jscomp.global;a=a.split(".");for(d=0;d<a.length-1;d++){var e=a[d];if(!(e in b))return;b=b[e]}a=a[a.length-1];d=b[a];c=c(d);c!=d&&null!=c&&$jscomp.defineProperty(b,a,{configurable:!0,writable:!0,value:c})};
$jscomp.polyfillIsolated=function(a,c,b,d){var e=a.split(".");a=1===e.length;d=e[0];d=!a&&d in $jscomp.polyfills?$jscomp.polyfills:$jscomp.global;for(var g=0;g<e.length-1;g++){var p=e[g];if(!(p in d))return;d=d[p]}e=e[e.length-1];b=$jscomp.IS_SYMBOL_NATIVE&&"es6"===b?d[e]:null;c=c(b);null!=c&&(a?$jscomp.defineProperty($jscomp.polyfills,e,{configurable:!0,writable:!0,value:c}):c!==b&&($jscomp.propertyToPolyfillSymbol[e]=$jscomp.IS_SYMBOL_NATIVE?$jscomp.global.Symbol(e):$jscomp.POLYFILL_PREFIX+e,e=
$jscomp.propertyToPolyfillSymbol[e],$jscomp.defineProperty(d,e,{configurable:!0,writable:!0,value:c})))};$jscomp.polyfill("Array.prototype.find",function(a){return a?a:function(a,b){return $jscomp.findInternal(this,a,b).v}},"es6","es3");
(function(a){"object"==typeof exports&&"object"==typeof module?a(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],a):a(CodeMirror)})(function(a){function c(a){a.state.markedSelection&&a.operation(function(){p(a)})}function b(a){a.state.markedSelection&&a.state.markedSelection.length&&a.operation(function(){e(a)})}function d(a,b,c,e){if(0!=n(b,c))for(var h=a.state.markedSelection,d=a.state.markedSelectionStyle,k=b.line;;){var l=k==b.line?b:r(k,
0);k+=q;var f=k>=c.line,g=f?c:r(k,0);l=a.markText(l,g,{className:d});null==e?h.push(l):h.splice(e++,0,l);if(f)break}}function e(a){a=a.state.markedSelection;for(var b=0;b<a.length;++b)a[b].clear();a.length=0}function g(a){e(a);for(var b=a.listSelections(),c=0;c<b.length;c++)d(a,b[c].from(),b[c].to())}function p(a){if(!a.somethingSelected())return e(a);if(1<a.listSelections().length)return g(a);var b=a.getCursor("start"),c=a.getCursor("end"),f=a.state.markedSelection;if(!f.length)return d(a,b,c);var h=
f[0].find(),m=f[f.length-1].find();if(!h||!m||c.line-b.line<=q||0<=n(b,m.to)||0>=n(c,h.from))return g(a);for(;0<n(b,h.from);)f.shift().clear(),h=f[0].find();0>n(b,h.from)&&(h.to.line-b.line<q?(f.shift().clear(),d(a,b,h.to,0)):d(a,b,h.from,0));for(;0>n(c,m.to);)f.pop().clear(),m=f[f.length-1].find();0<n(c,m.to)&&(c.line-m.from.line<q?(f.pop().clear(),d(a,m.from,c)):d(a,m.to,c))}a.defineOption("styleSelectedText",!1,function(d,k,l){l=l&&l!=a.Init;k&&!l?(d.state.markedSelection=[],d.state.markedSelectionStyle=
"string"==typeof k?k:"CodeMirror-selectedtext",g(d),d.on("cursorActivity",c),d.on("change",b)):!k&&l&&(d.off("cursorActivity",c),d.off("change",b),e(d),d.state.markedSelection=d.state.markedSelectionStyle=null)});var q=8,r=a.Pos,n=a.cmpPos});
