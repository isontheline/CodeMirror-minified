'use strict';(function(f){"object"==typeof exports&&"object"==typeof module?f(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],f):f(CodeMirror)})(function(f){f.defineMode("tiddlywiki",function(){function g(a,d,c){d.tokenize=c;return c(a,d)}function e(a,d){var c=a.sol(),b;d.block=!1;b=a.peek();if(c&&/[<\/\*{}\-]/.test(b)){if(a.match(m))return d.block=!0,g(a,d,h);if(a.match(n))return"quote";if(a.match(p)||a.match(q)||a.match(r)||a.match(t)||a.match(u)||
a.match(v))return"comment";if(a.match(w))return"hr"}b=a.next();if(c&&/[\/\*!#;:>|]/.test(b)){if("!"==b)return a.skipToEnd(),"header";if("*"==b)return a.eatWhile("*"),"comment";if("#"==b)return a.eatWhile("#"),"comment";if(";"==b)return a.eatWhile(";"),"comment";if(":"==b)return a.eatWhile(":"),"comment";if(">"==b)return a.eatWhile(">"),"quote";if("|"==b)return"header"}if("{"==b&&a.match(/\{\{/))return g(a,d,h);if(/[hf]/i.test(b)&&/[ti]/i.test(a.peek())&&a.match(/\b(ttps?|tp|ile):\/\/[\-A-Z0-9+&@#\/%?=~_|$!:,.;]*[A-Z0-9+&@#\/%=~_|$]/i))return"link";
if('"'==b)return"string";if("~"==b)return"brace";if(/[\[\]]/.test(b)&&a.peek()==b)return a.next(),"brace";if("@"==b)return a.eatWhile(x),"link";if(/\d/.test(b))return a.eatWhile(/\d/),"number";if("/"==b){if(a.eat("%"))return g(a,d,f);if(a.eat("/"))return g(a,d,y)}if("_"==b&&a.eat("_"))return g(a,d,z);if("-"==b&&a.eat("-")){if(" "!=a.peek())return g(a,d,A);if(" "==a.peek())return"brace"}if("'"==b&&a.eat("'"))return g(a,d,B);if("<"==b){if(a.eat("<"))return g(a,d,C)}else return null;a.eatWhile(/[\w\$_]/);
c=a.current();return(c=k.propertyIsEnumerable(c)&&k[c])?c.style:null}function f(a,d){for(var c=!1,b;b=a.next();){if("/"==b&&c){d.tokenize=e;break}c="%"==b}return"comment"}function B(a,d){for(var c=!1,b;b=a.next();){if("'"==b&&c){d.tokenize=e;break}c="'"==b}return"strong"}function h(a,d){var c=d.block;if(c&&a.current())return"comment";if(!c&&a.match(D)||c&&a.sol()&&a.match(E))return d.tokenize=e,"comment";a.next();return"comment"}function y(a,d){for(var c=!1,b;b=a.next();){if("/"==b&&c){d.tokenize=
e;break}c="/"==b}return"em"}function z(a,d){for(var c=!1,b;b=a.next();){if("_"==b&&c){d.tokenize=e;break}c="_"==b}return"underlined"}function A(a,d){for(var c=!1,b;b=a.next();){if("-"==b&&c){d.tokenize=e;break}c="-"==b}return"strikethrough"}function C(a,d){var c,b;if("<<"==a.current())return"macro";c=a.next();if(!c)return d.tokenize=e,null;if(">"==c&&">"==a.peek())return a.next(),d.tokenize=e,"macro";a.eatWhile(/[\w\$_]/);c=a.current();return(b=l.propertyIsEnumerable(c)&&l[c])?(b.style,c):(null,c)}
var k={},l=function(){function a(a){return{type:a,style:"macro"}}return{allTags:a("allTags"),closeAll:a("closeAll"),list:a("list"),newJournal:a("newJournal"),newTiddler:a("newTiddler"),permaview:a("permaview"),saveChanges:a("saveChanges"),search:a("search"),slider:a("slider"),tabs:a("tabs"),tag:a("tag"),tagging:a("tagging"),tags:a("tags"),tiddler:a("tiddler"),timeline:a("timeline"),today:a("today"),version:a("version"),option:a("option"),"with":a("with"),filter:a("filter")}}(),x=/[\w_\-]/i,w=/^\-\-\-\-+$/,
p=/^\/\*\*\*$/,q=/^\*\*\*\/$/,n=/^<<<$/,r=/^\/\/\{\{\{$/,t=/^\/\/\}\}\}$/,u=/^\x3c!--\{\{\{--\x3e$/,v=/^\x3c!--\}\}\}--\x3e$/,m=/^\{\{\{$/,E=/^\}\}\}$/,D=/.*?\}\}\}/;return{startState:function(){return{tokenize:e,indented:0,level:0}},token:function(a,d){return a.eatSpace()?null:d.tokenize(a,d)},electricChars:""}});f.defineMIME("text/x-tiddlywiki","tiddlywiki")});
