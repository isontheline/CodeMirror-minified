'use strict';var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.findInternal=function(b,h,g){b instanceof String&&(b=String(b));for(var l=b.length,k=0;k<l;k++){var t=b[k];if(h.call(g,t,k,b))return{i:k,v:t}}return{i:-1,v:void 0}};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.SIMPLE_FROUND_POLYFILL=!1;$jscomp.ISOLATE_POLYFILLS=!1;$jscomp.FORCE_POLYFILL_PROMISE=!1;$jscomp.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION=!1;
$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(b,h,g){if(b==Array.prototype||b==Object.prototype)return b;b[h]=g.value;return b};$jscomp.getGlobal=function(b){b=["object"==typeof globalThis&&globalThis,b,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof global&&global];for(var h=0;h<b.length;++h){var g=b[h];if(g&&g.Math==Math)return g}throw Error("Cannot find global object");};$jscomp.global=$jscomp.getGlobal(this);
$jscomp.IS_SYMBOL_NATIVE="function"===typeof Symbol&&"symbol"===typeof Symbol("x");$jscomp.TRUST_ES6_POLYFILLS=!$jscomp.ISOLATE_POLYFILLS||$jscomp.IS_SYMBOL_NATIVE;$jscomp.polyfills={};$jscomp.propertyToPolyfillSymbol={};$jscomp.POLYFILL_PREFIX="$jscp$";var $jscomp$lookupPolyfilledValue=function(b,h){var g=$jscomp.propertyToPolyfillSymbol[h];if(null==g)return b[h];g=b[g];return void 0!==g?g:b[h]};
$jscomp.polyfill=function(b,h,g,l){h&&($jscomp.ISOLATE_POLYFILLS?$jscomp.polyfillIsolated(b,h,g,l):$jscomp.polyfillUnisolated(b,h,g,l))};$jscomp.polyfillUnisolated=function(b,h,g,l){g=$jscomp.global;b=b.split(".");for(l=0;l<b.length-1;l++){var k=b[l];if(!(k in g))return;g=g[k]}b=b[b.length-1];l=g[b];h=h(l);h!=l&&null!=h&&$jscomp.defineProperty(g,b,{configurable:!0,writable:!0,value:h})};
$jscomp.polyfillIsolated=function(b,h,g,l){var k=b.split(".");b=1===k.length;l=k[0];l=!b&&l in $jscomp.polyfills?$jscomp.polyfills:$jscomp.global;for(var t=0;t<k.length-1;t++){var A=k[t];if(!(A in l))return;l=l[A]}k=k[k.length-1];g=$jscomp.IS_SYMBOL_NATIVE&&"es6"===g?l[k]:null;h=h(g);null!=h&&(b?$jscomp.defineProperty($jscomp.polyfills,k,{configurable:!0,writable:!0,value:h}):h!==g&&(void 0===$jscomp.propertyToPolyfillSymbol[k]&&(g=1E9*Math.random()>>>0,$jscomp.propertyToPolyfillSymbol[k]=$jscomp.IS_SYMBOL_NATIVE?
$jscomp.global.Symbol(k):$jscomp.POLYFILL_PREFIX+g+"$"+k),$jscomp.defineProperty(l,$jscomp.propertyToPolyfillSymbol[k],{configurable:!0,writable:!0,value:h})))};$jscomp.polyfill("Array.prototype.find",function(b){return b?b:function(h,g){return $jscomp.findInternal(this,h,g).v}},"es6","es3");
(function(b){"object"==typeof exports&&"object"==typeof module?b(require("../../lib/codemirror"),require("./searchcursor"),require("../dialog/dialog")):"function"==typeof define&&define.amd?define(["../../lib/codemirror","./searchcursor","../dialog/dialog"],b):b(CodeMirror)})(function(b){function h(a,c){"string"==typeof a?a=new RegExp(a.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&"),c?"gi":"g"):a.global||(a=new RegExp(a.source,a.ignoreCase?"gi":"g"));return{token:function(e){a.lastIndex=e.pos;
var d=a.exec(e.string);if(d&&d.index==e.pos)return e.pos+=d[0].length||1,"searching";d?e.pos=d.index:e.skipToEnd()}}}function g(){this.overlay=this.posFrom=this.posTo=this.lastQuery=this.query=null}function l(a){return a.state.search||(a.state.search=new g)}function k(a){return"string"==typeof a&&a==a.toLowerCase()}function t(a,c,e){return a.getSearchCursor(c,e,{caseFold:k(c),multiline:!0})}function A(a,c,e,d,f){a.openDialog(c,d,{value:e,selectValueOnOpen:!0,closeOnEnter:!1,onClose:function(){y(a)},
onKeyDown:f,bottom:a.options.search.bottom})}function D(a,c,e,d,f){a.openDialog?a.openDialog(c,f,{value:d,selectValueOnOpen:!0,bottom:a.options.search.bottom}):f(prompt(e,d))}function J(a,c,e,d){if(a.openConfirm)a.openConfirm(c,d);else if(confirm(e))d[0]()}function E(a){return a.replace(/\\([nrt\\])/g,function(c,e){return"n"==e?"\n":"r"==e?"\r":"t"==e?"\t":"\\"==e?"\\":c})}function F(a){var c=a.match(/^\/(.*)\/([a-z]*)$/);if(c)try{a=new RegExp(c[1],-1==c[2].indexOf("i")?"":"i")}catch(e){}else a=E(a);
if("string"==typeof a?""==a:a.test(""))a=/x^/;return a}function B(a,c,e){c.queryText=e;c.query=F(e);a.removeOverlay(c.overlay,k(c.query));c.overlay=h(c.query,k(c.query));a.addOverlay(c.overlay);a.showMatchesOnScrollbar&&(c.annotate&&(c.annotate.clear(),c.annotate=null),c.annotate=a.showMatchesOnScrollbar(c.query,k(c.query)))}function x(a,c,e,d){var f=l(a);if(f.query)return C(a,c);var n=a.getSelection()||f.lastQuery;n instanceof RegExp&&"x^"==n.source&&(n=null);if(e&&a.openDialog){var u=null,r=function(q,
w){b.e_stop(w);q&&(q!=f.queryText&&(B(a,f,q),f.posFrom=f.posTo=a.getCursor()),u&&(u.style.opacity=1),C(a,w.shiftKey,function(p,v){var z;3>v.line&&document.querySelector&&(z=a.display.wrapper.querySelector(".CodeMirror-dialog"))&&z.getBoundingClientRect().bottom-4>a.cursorCoords(v,"window").top&&((u=z).style.opacity=.4)}))};A(a,G(a),n,r,function(q,w){var p=b.keyName(q),v=a.getOption("extraKeys");p=v&&v[p]||b.keyMap[a.getOption("keyMap")][p];if("findNext"==p||"findPrev"==p||"findPersistentNext"==p||
"findPersistentPrev"==p)b.e_stop(q),B(a,l(a),w),a.execCommand(p);else if("find"==p||"findPersistent"==p)b.e_stop(q),r(w,q)});d&&n&&(B(a,f,n),C(a,c))}else D(a,G(a),"Search for:",n,function(q){q&&!f.query&&a.operation(function(){B(a,f,q);f.posFrom=f.posTo=a.getCursor();C(a,c)})})}function C(a,c,e){a.operation(function(){var d=l(a),f=t(a,d.query,c?d.posFrom:d.posTo);if(!f.find(c)&&(f=t(a,d.query,c?b.Pos(a.lastLine()):b.Pos(a.firstLine(),0)),!f.find(c)))return;a.setSelection(f.from(),f.to());a.scrollIntoView({from:f.from(),
to:f.to()},20);d.posFrom=f.from();d.posTo=f.to();e&&e(f.from(),f.to())})}function y(a){a.operation(function(){var c=l(a);if(c.lastQuery=c.query)c.query=c.queryText=null,a.removeOverlay(c.overlay),c.annotate&&(c.annotate.clear(),c.annotate=null)})}function m(a,c){var e=a?document.createElement(a):document.createDocumentFragment(),d;for(d in c)e[d]=c[d];for(d=2;d<arguments.length;d++){var f=arguments[d];e.appendChild("string"==typeof f?document.createTextNode(f):f)}return e}function G(a){return m("",
null,m("span",{className:"CodeMirror-search-label"},a.phrase("Search:"))," ",m("input",{type:"text",style:"width: 10em",className:"CodeMirror-search-field"})," ",m("span",{style:"color: #888",className:"CodeMirror-search-hint"},a.phrase("(Use /re/ syntax for regexp search)")))}function K(a){return m("",null," ",m("input",{type:"text",style:"width: 10em",className:"CodeMirror-search-field"})," ",m("span",{style:"color: #888",className:"CodeMirror-search-hint"},a.phrase("(Use /re/ syntax for regexp search)")))}
function L(a){return m("",null,m("span",{className:"CodeMirror-search-label"},a.phrase("Replace?"))," ",m("button",{},a.phrase("Yes"))," ",m("button",{},a.phrase("No"))," ",m("button",{},a.phrase("All"))," ",m("button",{},a.phrase("Stop")))}function H(a,c,e){a.operation(function(){for(var d=t(a,c);d.findNext();)if("string"!=typeof c){var f=a.getRange(d.from(),d.to()).match(c);d.replace(e.replace(/\$(\d)/g,function(n,u){return f[u]}))}else d.replace(e)})}function I(a,c){if(!a.getOption("readOnly")){var e=
a.getSelection()||l(a).lastQuery,d=c?a.phrase("Replace all:"):a.phrase("Replace:"),f=m("",null,m("span",{className:"CodeMirror-search-label"},d),K(a));D(a,f,d,e,function(n){n&&(n=F(n),D(a,m("",null,m("span",{className:"CodeMirror-search-label"},a.phrase("With:"))," ",m("input",{type:"text",style:"width: 10em",className:"CodeMirror-search-field"})),a.phrase("Replace with:"),"",function(u){u=E(u);if(c)H(a,n,u);else{y(a);var r=t(a,n,a.getCursor("from")),q=function(){var p=r.from(),v;if(!(v=r.findNext())&&
(r=t(a,n),!(v=r.findNext())||p&&r.from().line==p.line&&r.from().ch==p.ch))return;a.setSelection(r.from(),r.to());a.scrollIntoView({from:r.from(),to:r.to()});J(a,L(a),a.phrase("Replace?"),[function(){w(v)},q,function(){H(a,n,u)}])},w=function(p){r.replace("string"==typeof n?u:u.replace(/\$(\d)/g,function(v,z){return p[z]}));q()};q()}}))})}}b.defineOption("search",{bottom:!1});b.commands.find=function(a){y(a);x(a)};b.commands.findPersistent=function(a){y(a);x(a,!1,!0)};b.commands.findPersistentNext=
function(a){x(a,!1,!0,!0)};b.commands.findPersistentPrev=function(a){x(a,!0,!0,!0)};b.commands.findNext=x;b.commands.findPrev=function(a){x(a,!0)};b.commands.clearSearch=y;b.commands.replace=I;b.commands.replaceAll=function(a){I(a,!0)}});
