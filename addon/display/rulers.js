'use strict';(function(f){"object"==typeof exports&&"object"==typeof module?f(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],f):f(CodeMirror)})(function(f){function g(a){for(var d=a.display.lineSpace.childNodes.length-1;0<=d;d--){var e=a.display.lineSpace.childNodes[d];/(^|\s)CodeMirror-ruler($|\s)/.test(e.className)&&e.parentNode.removeChild(e)}}function h(a){for(var d=a.getOption("rulers"),e=a.defaultCharWidth(),g=a.charCoords(f.Pos(a.firstLine(),
0),"div").left,h=a.display.scroller.offsetHeight+30,k=0;k<d.length;k++){var b=document.createElement("div");b.className="CodeMirror-ruler";var l,c=d[k];"number"==typeof c?l=c:(l=c.column,c.className&&(b.className+=" "+c.className),c.color&&(b.style.borderColor=c.color),c.lineStyle&&(b.style.borderLeftStyle=c.lineStyle),c.width&&(b.style.borderLeftWidth=c.width));b.style.left=g+l*e+"px";b.style.top="-50px";b.style.bottom="-20px";b.style.minHeight=h+"px";a.display.lineSpace.insertBefore(b,a.display.cursorDiv)}}
function m(a){g(a);h(a)}f.defineOption("rulers",!1,function(a,d,e){e&&e!=f.Init&&(g(a),a.off("refresh",m));d&&d.length&&(h(a),a.on("refresh",m))})});
