'use strict';(function(c){"object"==typeof exports&&"object"==typeof module?c(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],c):c(CodeMirror)})(function(c){c.defineMode("eiffel",function(){function c(b){for(var d={},a=0,h=b.length;a<h;++a)d[b[a]]=!0;return d}function e(b,d){if(b.eatSpace())return null;var a=b.next();return'"'==a||"'"==a?(a=k(a,"string"),d.tokenize.push(a),a(b,d)):"-"==a&&b.eat("-")?(b.skipToEnd(),"comment"):":"==a&&b.eat("=")?
"operator":/[0-9]/.test(a)?(b.eatWhile(/[xXbBCc0-9\.]/),b.eat(/[\?\!]/),"ident"):/[a-zA-Z_0-9]/.test(a)?(b.eatWhile(/[a-zA-Z_0-9]/),b.eat(/[\?\!]/),"ident"):/[=+\-\/*^%<>~]/.test(a)?(b.eatWhile(/[=+\-\/*^%<>~]/),"operator"):null}function k(b,d,a){return function(c,e){for(var f=!1,g;null!=(g=c.next());){if(g==b&&(a||!f)){e.tokenize.pop();break}f=!f&&"%"==g}return d}}var l=c("note across when variant until unique undefine then strip select retry rescue require rename reference redefine prefix once old obsolete loop local like is inspect infix include if frozen from external export ensure end elseif else do creation create check alias agent separate invariant inherit indexing feature expanded deferred class Void True Result Precursor False Current create attached detachable as and implies not or".split(" ")),
m=c(":=;and then;and;or;<<;>>".split(";"));return{startState:function(){return{tokenize:[e]}},token:function(b,c){var a=c.tokenize[c.tokenize.length-1](b,c);"ident"==a&&(a=b.current(),a=l.propertyIsEnumerable(b.current())?"keyword":m.propertyIsEnumerable(b.current())?"operator":/^[A-Z][A-Z_0-9]*$/g.test(a)?"tag":/^0[bB][0-1]+$/g.test(a)?"number":/^0[cC][0-7]+$/g.test(a)?"number":/^0[xX][a-fA-F0-9]+$/g.test(a)?"number":/^([0-9]+\.[0-9]*)|([0-9]*\.[0-9]+)$/g.test(a)?"number":/^[0-9]+$/g.test(a)?"number":
"variable");return a},lineComment:"--"}});c.defineMIME("text/x-eiffel","eiffel")});
