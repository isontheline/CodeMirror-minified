'use strict';(function(a){"object"==typeof exports&&"object"==typeof module?a(require("../../lib/codemirror"),"cjs"):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],function(g){a(g,"amd")}):a(CodeMirror,"plain")})(function(a,g){function l(b,a){var c=a;return function(){0==--c&&b()}}function k(b,d){var c=a.modes[b].dependencies;if(!c)return d();for(var f=[],e=0;e<c.length;++e)a.modes.hasOwnProperty(c[e])||f.push(c[e]);if(!f.length)return d();c=l(d,f.length);for(e=0;e<f.length;++e)a.requireMode(f[e],
c)}a.modeURL||(a.modeURL="../mode/%N/%N.js");var h={};a.requireMode=function(b,d){"string"!=typeof b&&(b=b.name);if(a.modes.hasOwnProperty(b))return k(b,d);if(h.hasOwnProperty(b))return h[b].push(d);var c=a.modeURL.replace(/%N/g,b);if("plain"==g){var f=document.createElement("script");f.src=c;var c=document.getElementsByTagName("script")[0],e=h[b]=[d];a.on(f,"load",function(){k(b,function(){for(var a=0;a<e.length;++a)e[a]()})});c.parentNode.insertBefore(f,c)}else"cjs"==g?(require(c),d()):"amd"==g&&
requirejs([c],d)};a.autoLoadMode=function(b,d){a.modes.hasOwnProperty(d)||a.requireMode(d,function(){b.setOption("mode",b.getOption("mode"))})}});
