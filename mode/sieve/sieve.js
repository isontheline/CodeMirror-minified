'use strict';(function(d){"object"==typeof exports&&"object"==typeof module?d(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],d):d(CodeMirror)})(function(d){d.defineMode("sieve",function(d){function g(a){var c={};a=a.split(" ");for(var b=0;b<a.length;++b)c[a[b]]=!0;return c}function e(a,c){var b=a.next();if("/"==b&&a.eat("*"))return c.tokenize=h,h(a,c);if("#"===b)return a.skipToEnd(),"comment";if('"'==b)return c.tokenize=k(b),c.tokenize(a,c);
if("("==b)return c._indent.push("("),c._indent.push("{"),null;if("{"===b)return c._indent.push("{"),null;")"==b&&(c._indent.pop(),c._indent.pop());if("}"===b)return c._indent.pop(),null;if(","==b||";"==b||/[{}\(\),;]/.test(b))return null;if(/\d/.test(b))return a.eatWhile(/[\d]/),a.eat(/[KkMmGg]/),"number";if(":"==b)return a.eatWhile(/[a-zA-Z_]/),a.eatWhile(/[a-zA-Z0-9_]/),"operator";a.eatWhile(/\w/);b=a.current();return"text"==b&&a.eat(":")?(c.tokenize=l,"string"):m.propertyIsEnumerable(b)?"keyword":
n.propertyIsEnumerable(b)?"atom":null}function l(a,c){c._multiLineString=!0;if(!a.sol()){a.eatSpace();if("#"==a.peek())return a.skipToEnd(),"comment";a.skipToEnd();return"string"}"."==a.next()&&a.eol()&&(c._multiLineString=!1,c.tokenize=e);return"string"}function h(a,c){for(var b=!1,d;null!=(d=a.next());){if(b&&"/"==d){c.tokenize=e;break}b="*"==d}return"comment"}function k(a){return function(c,b){for(var d=!1,f;null!=(f=c.next())&&(f!=a||d);)d=!d&&"\\"==f;d||(b.tokenize=e);return"string"}}var m=g("if elsif else stop require"),
n=g("true false not"),p=d.indentUnit;return{startState:function(a){return{tokenize:e,baseIndent:a||0,_indent:[]}},token:function(a,c){return a.eatSpace()?null:(c.tokenize||e)(a,c)},indent:function(a,c){var b=a._indent.length;c&&"}"==c[0]&&b--;0>b&&(b=0);return b*p},electricChars:"}"}});d.defineMIME("application/sieve","sieve")});
