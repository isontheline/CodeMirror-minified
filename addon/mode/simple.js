'use strict';(function(m){"object"==typeof exports&&"object"==typeof module?m(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],m):m(CodeMirror)})(function(m){function u(b,e){if(!b.hasOwnProperty(e))throw Error("Undefined state "+e+" in simple mode");}function t(b,e){if(!b)return/(?:)/;var c="";b instanceof RegExp?(b.ignoreCase&&(c="i"),b.unicode&&(c+="u"),b=b.source):b=String(b);return new RegExp((!1===e?"":"^")+"(?:"+b+")",c)}function w(b){if(!b)return null;
if(b.apply)return b;if("string"==typeof b)return b.replace(/\./g," ");for(var e=[],c=0;c<b.length;c++)e.push(b[c]&&b[c].replace(/\./g," "));return e}function x(b,e){(b.next||b.push)&&u(e,b.next||b.push);this.regex=t(b.regex);this.token=w(b.token);this.data=b}function y(b,e){return function(c,a){if(a.pending){var d=a.pending.shift();0==a.pending.length&&(a.pending=null);c.pos+=d.text.length;return d.token}if(a.local){if(a.local.end&&c.match(a.local.end))d=a.local.endToken||null,a.local=a.localState=
null;else{d=a.local.mode.token(c,a.localState);var h;a.local.endScan&&(h=a.local.endScan.exec(c.current()))&&(c.pos=c.start+h.index)}return d}for(var k=b[a.state],f=0;f<k.length;f++)if(d=k[f],h=(!d.data.sol||c.sol())&&c.match(d.regex)){d.data.next?a.state=d.data.next:d.data.push?((a.stack||(a.stack=[])).push(a.state),a.state=d.data.push):d.data.pop&&a.stack&&a.stack.length&&(a.state=a.stack.pop());if(d.data.mode){k=void 0;var n=e;f=a;var l=d.data.mode,p=d.token;if(l.persistent)for(var g=f.persistentStates;g&&
!k;g=g.next)if(l.spec?v(l.spec,g.spec):l.mode==g.mode)k=g;n=k?k.mode:l.mode||m.getMode(n,l.spec);g=k?k.state:m.startState(n);l.persistent&&!k&&(f.persistentStates={mode:n,spec:l.spec,state:g,next:f.persistentStates});f.localState=g;f.local={mode:n,end:l.end&&t(l.end),endScan:l.end&&!1!==l.forceEnd&&t(l.end,!1),endToken:p&&p.join?p[p.length-1]:p}}d.data.indent&&a.indent.push(c.indentation()+e.indentUnit);d.data.dedent&&a.indent.pop();(k=d.token)&&k.apply&&(k=k(h));if(2<h.length&&d.token&&"string"!=
typeof d.token){for(f=2;f<h.length;f++)h[f]&&(a.pending||(a.pending=[])).push({text:h[f],token:d.token[f-1]});c.backUp(h[0].length-(h[1]?h[1].length:0));return k[0]}return k&&k.join?k[0]:k}c.next();return null}}function v(b,e){if(b===e)return!0;if(!b||"object"!=typeof b||!e||"object"!=typeof e)return!1;var c=0,a;for(a in b)if(b.hasOwnProperty(a)){if(!e.hasOwnProperty(a)||!v(b[a],e[a]))return!1;c++}for(a in e)e.hasOwnProperty(a)&&c--;return 0==c}function z(b,e){return function(c,a,d){if(c.local&&c.local.mode.indent)return c.local.mode.indent(c.localState,
a,d);if(!(d=null==c.indent||c.local)&&(d=e.dontIndentStates)){a:{d=e.dontIndentStates;for(var h=0;h<d.length;h++)if(d[h]===c.state){d=!0;break a}d=void 0}d=-1<d}if(d)return m.Pass;d=c.indent.length-1;h=b[c.state];a:for(;;){for(var k=0;k<h.length;k++){var f=h[k];if(f.data.dedent&&!1!==f.data.dedentIfLineStart){var n=f.regex.exec(a);if(n&&n[0]){d--;if(f.next||f.push)h=b[f.next||f.push];a=a.slice(n[0].length);continue a}}}break}return 0>d?0:c.indent[d]}}m.defineSimpleMode=function(b,e){m.defineMode(b,
function(c){return m.simpleMode(c,e)})};m.simpleMode=function(b,e){u(e,"start");var c={},a=e.meta||{},d=!1,h;for(h in e)if(h!=a&&e.hasOwnProperty(h))for(var k=c[h]=[],f=e[h],n=0;n<f.length;n++){var l=f[n];k.push(new x(l,e));if(l.indent||l.dedent)d=!0}b={startState:function(){return{state:"start",pending:null,local:null,localState:null,indent:d?[]:null}},copyState:function(g){var r={state:g.state,pending:g.pending,local:g.local,localState:null,indent:g.indent&&g.indent.slice(0)};g.localState&&(r.localState=
m.copyState(g.local.mode,g.localState));g.stack&&(r.stack=g.stack.slice(0));for(var q=g.persistentStates;q;q=q.next)r.persistentStates={mode:q.mode,spec:q.spec,state:q.state==g.localState?r.localState:m.copyState(q.mode,q.state),next:r.persistentStates};return r},token:y(c,b),innerMode:function(g){return g.local&&{mode:g.local.mode,state:g.localState}},indent:z(c,a)};if(a)for(var p in a)a.hasOwnProperty(p)&&(b[p]=a[p]);return b}});
