'use strict';(function(f){"object"==typeof exports&&"object"==typeof module?f(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],f):f(CodeMirror)})(function(f){f.defineMode("sparql",function(f){function k(b,a){var c=b.next();e=null;if("$"==c||"?"==c){if("?"==c&&b.match(/\s/,!1))return"operator";b.match(/^[\w\d]*/);return"variable-2"}if("<"!=c||b.match(/^[\s\u00a0=]/,!1)){if('"'==c||"'"==c)return a.tokenize=m(c),a.tokenize(b,a);if(/[{}\(\),\.;\[\]]/.test(c))return e=
c,"bracket";if("#"==c)return b.skipToEnd(),"comment";if(l.test(c))return b.eatWhile(l),"operator";if(":"==c)return b.eatWhile(/[\w\d\._\-]/),"atom";if("@"==c)return b.eatWhile(/[a-z\d\-]/i),"meta";b.eatWhile(/[_\w\d]/);if(b.eat(":"))return b.eatWhile(/[\w\d_\-]/),"atom";c=b.current();return n.test(c)?"builtin":p.test(c)?"keyword":"variable"}b.match(/^[^\s\u00a0>]*>?/);return"atom"}function m(b){return function(a,c){for(var d=!1,e;null!=(e=a.next());){if(e==b&&!d){c.tokenize=k;break}d=!d&&"\\"==e}return"string"}}
function g(b,a,c){b.context={prev:b.context,indent:b.indent,col:c,type:a}}function h(b){b.indent=b.context.indent;b.context=b.context.prev}var q=f.indentUnit,e,n=/^(?:str|lang|langmatches|datatype|bound|sameterm|isiri|isuri|iri|uri|bnode|count|sum|min|max|avg|sample|group_concat|rand|abs|ceil|floor|round|concat|substr|strlen|replace|ucase|lcase|encode_for_uri|contains|strstarts|strends|strbefore|strafter|year|month|day|hours|minutes|seconds|timezone|tz|now|uuid|struuid|md5|sha1|sha256|sha384|sha512|coalesce|if|strlang|strdt|isnumeric|regex|exists|isblank|isliteral|a|bind)$/i,
p=/^(?:base|prefix|select|distinct|reduced|construct|describe|ask|from|named|where|order|limit|offset|filter|optional|graph|by|asc|desc|as|having|undef|values|group|minus|in|not|service|silent|using|insert|delete|union|true|false|with|data|copy|to|move|add|create|drop|clear|load)$/i,l=/[*+\-<>=&|\^\/!\?]/;return{startState:function(){return{tokenize:k,context:null,indent:0,col:0}},token:function(b,a){b.sol()&&(a.context&&null==a.context.align&&(a.context.align=!1),a.indent=b.indentation());if(b.eatSpace())return null;
var c=a.tokenize(b,a);"comment"!=c&&a.context&&null==a.context.align&&"pattern"!=a.context.type&&(a.context.align=!0);if("("==e)g(a,")",b.column());else if("["==e)g(a,"]",b.column());else if("{"==e)g(a,"}",b.column());else if(/[\]\}\)]/.test(e)){for(;a.context&&"pattern"==a.context.type;)h(a);a.context&&e==a.context.type&&(h(a),"}"==e&&a.context&&"pattern"==a.context.type&&h(a))}else"."==e&&a.context&&"pattern"==a.context.type?h(a):/atom|string|variable/.test(c)&&a.context&&(/[\}\]]/.test(a.context.type)?
g(a,"pattern",b.column()):"pattern"!=a.context.type||a.context.align||(a.context.align=!0,a.context.col=b.column()));return c},indent:function(b,a){var c=a&&a.charAt(0),d=b.context;if(/[\]\}]/.test(c))for(;d&&"pattern"==d.type;)d=d.prev;c=d&&c==d.type;return d?"pattern"==d.type?d.col:d.align?d.col+(c?0:1):d.indent+(c?0:q):0},lineComment:"#"}});f.defineMIME("application/sparql-query","sparql")});
