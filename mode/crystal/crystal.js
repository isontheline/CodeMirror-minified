'use strict';(function(k){"object"==typeof exports&&"object"==typeof module?k(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],k):k(CodeMirror)})(function(k){k.defineMode("crystal",function(x){function l(a,b){return new RegExp((b?"":"^")+"(?:"+a.join("|")+")"+(b?"$":"\\b"))}function g(a,b,c){c.tokenize.push(a);return a(b,c)}function r(a,b){if(a.eatSpace())return null;if("\\"!=b.lastToken&&a.match("{%",!1))return g(h("%","%"),a,b);if("\\"!=b.lastToken&&
a.match("{{",!1))return g(h("{","}"),a,b);if("#"==a.peek())return a.skipToEnd(),"comment";if(a.match(n)){a.eat(/[?!]/);var c=a.current();return a.eat(":")?"atom":"."==b.lastToken?"property":E.test(c)?(F.test(c)?"fun"==c&&0<=b.blocks.indexOf("lib")||"def"==c&&"abstract"==b.lastToken||(b.blocks.push(c),b.currentIndent+=1):"operator"!=b.lastStyle&&b.lastStyle||!G.test(c)?"end"==c&&(b.blocks.pop(),--b.currentIndent):(b.blocks.push(c),b.currentIndent+=1),y.hasOwnProperty(c)&&b.tokenize.push(y[c]),"keyword"):
H.test(c)?"atom":"variable"}if(a.eat("@")){if("["==a.peek())return g(p("[","]","meta"),a,b);a.eat("@");a.match(n)||a.match(q);return"variable-2"}if(a.match(q))return"tag";if(a.eat(":")){if(a.eat('"'))return g(t('"',"atom",!1),a,b);if(a.match(n)||a.match(q)||a.match(u)||a.match(v)||a.match(z))return"atom";a.eat(":");return"operator"}if(a.eat('"'))return g(t('"',"string",!0),a,b);if("%"==a.peek()){c="string";var e=!0;if(a.match("%r")){c="string-2";var d=a.next()}else if(a.match("%w"))e=!1,d=a.next();
else if(a.match("%q"))e=!1,d=a.next();else if(d=a.match(/^%([^\w\s=])/))d=d[1];else{if(a.match(/^%[a-zA-Z_\u009F-\uFFFF][\w\u009F-\uFFFF]*/))return"meta";if(a.eat("%"))return"operator"}w.hasOwnProperty(d)&&(d=w[d]);return g(t(d,c,e),a,b)}if(c=a.match(/^<<-('?)([A-Z]\w*)\1/))return g(I(c[2],!c[1]),a,b);if(a.eat("'"))return a.match(/^(?:[^']|\\(?:[befnrtv0'"]|[0-7]{3}|u(?:[0-9a-fA-F]{4}|\{[0-9a-fA-F]{1,6}\})))/),a.eat("'"),"atom";if(a.eat("0"))return a.eat("x")?a.match(/^[0-9a-fA-F_]+/):a.eat("o")?
a.match(/^[0-7_]+/):a.eat("b")&&a.match(/^[01_]+/),"number";if(a.eat(/^\d/))return a.match(/^[\d_]*(?:\.[\d_]+)?(?:[eE][+-]?\d+)?/),"number";if(a.match(u))return a.eat("="),"operator";if(a.match(v)||a.match(J))return"operator";if(c=a.match(/[({[]/,!1))return c=c[0],g(p(c,w[c],null),a,b);if(a.eat("\\"))return a.next(),"meta";a.next();return null}function p(a,b,c,e){return function(d,f){if(!e&&d.match(a))return f.tokenize[f.tokenize.length-1]=p(a,b,c,!0),f.currentIndent+=1,c;var A=r(d,f);d.current()===
b&&(f.tokenize.pop(),--f.currentIndent,A=c);return A}}function h(a,b,c){return function(e,d){return!c&&e.match("{"+a)?(d.currentIndent+=1,d.tokenize[d.tokenize.length-1]=h(a,b,!0),"meta"):e.match(b+"}")?(--d.currentIndent,d.tokenize.pop(),"meta"):r(e,d)}}function B(a,b){if(a.eatSpace())return null;a.match(n)?a.eat(/[!?]/):a.match(u)||a.match(v)||a.match(z);b.tokenize.pop();return"def"}function m(a,b){if(a.eatSpace())return null;a.match(q);b.tokenize.pop();return"def"}function t(a,b,c){return function(e,
d){for(var f=!1;e.peek();)if(f)e.next(),f=!1;else{if(e.match("{%",!1)){d.tokenize.push(h("%","%"));break}if(e.match("{{",!1)){d.tokenize.push(h("{","}"));break}if(c&&e.match("#{",!1)){d.tokenize.push(p("#{","}","meta"));break}f=e.next();if(f==a){d.tokenize.pop();break}f=c&&"\\"==f}return b}}function I(a,b){return function(c,e){if(c.sol()&&(c.eatSpace(),c.match(a)))return e.tokenize.pop(),"string";for(var d=!1;c.peek();)if(d)c.next(),d=!1;else{if(c.match("{%",!1)){e.tokenize.push(h("%","%"));break}if(c.match("{{",
!1)){e.tokenize.push(h("{","}"));break}if(b&&c.match("#{",!1)){e.tokenize.push(p("#{","}","meta"));break}d=b&&"\\"==c.next()}return"string"}}var u=/^(?:[-+/%|&^]|\*\*?|[<>]{2})/,v=/^(?:[=!]~|===|<=>|[<>=!]=?|[|&]{2}|~)/,z=/^(?:\[\][?=]?)/,J=/^(?:\.(?:\.{2})?|->|[?:])/,n=/^[a-z_\u009F-\uFFFF][a-zA-Z0-9_\u009F-\uFFFF]*/,q=/^[A-Z_\u009F-\uFFFF][a-zA-Z0-9_\u009F-\uFFFF]*/,E=l("abstract alias as asm begin break case class def do else elsif end ensure enum extend for fun if include instance_sizeof lib macro module next of out pointerof private protected rescue return require select sizeof struct super then type typeof uninitialized union unless until when while with yield __DIR__ __END_LINE__ __FILE__ __LINE__".split(" ")),
H=l(["true","false","nil","self"]),F=l("def fun macro class module struct lib enum union do for".split(" ")),G=l("if unless case while until begin then".split(" ")),C=["end","else","elsif","rescue","ensure"],K=l(C),D=["\\)","\\}","\\]"],L=new RegExp("^(?:"+D.join("|")+")$"),y={def:B,fun:B,macro:function(a,b){if(a.eatSpace())return null;var c;if(c=a.match(n)){if("def"==c)return"keyword";a.eat(/[?!]/)}b.tokenize.pop();return"def"},"class":m,module:m,struct:m,lib:m,"enum":m,union:m},w={"[":"]","{":"}",
"(":")","<":">"};return{startState:function(){return{tokenize:[r],currentIndent:0,lastToken:null,lastStyle:null,blocks:[]}},token:function(a,b){var c=b.tokenize[b.tokenize.length-1](a,b);a=a.current();c&&"comment"!=c&&(b.lastToken=a,b.lastStyle=c);return c},indent:function(a,b){b=b.replace(/^\s*(?:\{%)?\s*|\s*(?:%\})?\s*$/g,"");return K.test(b)||L.test(b)?x.indentUnit*(a.currentIndent-1):x.indentUnit*a.currentIndent},fold:"indent",electricInput:l(D.concat(C),!0),lineComment:"#"}});k.defineMIME("text/x-crystal",
"crystal")});
