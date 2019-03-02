'use strict';(function(t){"object"==typeof exports&&"object"==typeof module?t(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],t):t(CodeMirror)})(function(t){t.defineMode("javascript",function(Ja,w){function p(a,c,b){P=a;U=b;return c}function D(a,c){var b=a.next();if('"'==b||"'"==b)return c.tokenize=Ka(b),c.tokenize(a,c);if("."==b&&a.match(/^\d+(?:[eE][+\-]?\d+)?/))return p("number","number");if("."==b&&a.match(".."))return p("spread","meta");
if(/[\[\]{}\(\),;:\.]/.test(b))return p(b);if("="==b&&a.eat(">"))return p("=>","operator");if("0"==b&&a.match(/^(?:x[\da-f]+|o[0-7]+|b[01]+)n?/i))return p("number","number");if(/\d/.test(b))return a.match(/^\d*(?:n|(?:\.\d*)?(?:[eE][+\-]?\d+)?)?/),p("number","number");if("/"==b){if(a.eat("*"))return c.tokenize=V,V(a,c);if(a.eat("/"))return a.skipToEnd(),p("comment","comment");if(qa(a,c,1)){a:for(var d=c=!1;null!=(b=a.next());){if(!c){if("/"==b&&!d)break a;"["==b?d=!0:d&&"]"==b&&(d=!1)}c=!c&&"\\"==
b}a.match(/^\b(([gimyus])(?![gimyus]*\2))+\b/);return p("regexp","string-2")}a.eat("=");return p("operator","operator",a.current())}if("`"==b)return c.tokenize=fa,fa(a,c);if("#"==b)return a.skipToEnd(),p("error","error");if(ra.test(b))return">"==b&&c.lexical&&">"==c.lexical.type||(a.eat("=")?"!"!=b&&"="!=b||a.eat("="):/[<>*+\-]/.test(b)&&(a.eat(b),">"==b&&a.eat(b))),p("operator","operator",a.current());if(ha.test(b)){a.eatWhile(ha);b=a.current();if("."!=c.lastType){if(sa.propertyIsEnumerable(b))return a=
sa[b],p(a.type,a.style,b);if("async"==b&&a.match(/^(\s|\/\*.*?\*\/)*[\[\(\w]/,!1))return p("async","keyword",b)}return p("variable","variable",b)}}function Ka(a){return function(c,b){var d=!1,u;if(W&&"@"==c.peek()&&c.match(La))return b.tokenize=D,p("jsonld-keyword","meta");for(;null!=(u=c.next())&&(u!=a||d);)d=!d&&"\\"==u;d||(b.tokenize=D);return p("string","string")}}function V(a,c){for(var b=!1,d;d=a.next();){if("/"==d&&b){c.tokenize=D;break}b="*"==d}return p("comment","comment")}function fa(a,
c){for(var b=!1,d;null!=(d=a.next());){if(!b&&("`"==d||"$"==d&&a.eat("{"))){c.tokenize=D;break}b=!b&&"\\"==d}return p("quasi","string-2",a.current())}function ja(a,c){c.fatArrowAt&&(c.fatArrowAt=null);var b=a.string.indexOf("=>",a.start);if(!(0>b)){if(l){var d=/:\s*(?:\w+(?:<[^>]*>|\[\])?|\{[^}]*\})\s*$/.exec(a.string.slice(a.start,b));d&&(b=d.index)}d=0;var f=!1;for(--b;0<=b;--b){var e=a.string.charAt(b),g="([{}])".indexOf(e);if(0<=g&&3>g){if(!d){++b;break}if(0==--d){"("==e&&(f=!0);break}}else if(3<=
g&&6>g)++d;else if(ha.test(e))f=!0;else{if(/["'\/]/.test(e))return;if(f&&!d){++b;break}}}f&&!d&&(c.fatArrowAt=b)}}function ta(a,c,b,d,f,e){this.indented=a;this.column=c;this.type=b;this.prev=f;this.info=e;null!=d&&(this.align=d)}function g(){for(var a=arguments.length-1;0<=a;a--)d.cc.push(arguments[a])}function b(){g.apply(null,arguments);return!0}function ka(a,c){for(;c;c=c.next)if(c.name==a)return!0;return!1}function I(a){var c=d.state;d.marked="def";if(c.context)if("var"==c.lexical.info&&c.context&&
c.context.block){var b=ua(a,c.context);if(null!=b){c.context=b;return}}else if(!ka(a,c.localVars)){c.localVars=new Q(a,c.localVars);return}w.globalVars&&!ka(a,c.globalVars)&&(c.globalVars=new Q(a,c.globalVars))}function ua(a,c){return c?c.block?(a=ua(a,c.prev))?a==c.prev?c:new R(a,c.vars,!0):null:ka(a,c.vars)?c:new R(c.prev,new Q(a,c.vars),!1):null}function X(a){return"public"==a||"private"==a||"protected"==a||"abstract"==a||"readonly"==a}function R(a,c,b){this.prev=a;this.vars=c;this.block=b}function Q(a,
c){this.name=a;this.next=c}function J(){d.state.context=new R(d.state.context,d.state.localVars,!1);d.state.localVars=Ma}function va(){d.state.context=new R(d.state.context,d.state.localVars,!0);d.state.localVars=null}function z(){d.state.localVars=d.state.context.vars;d.state.context=d.state.context.prev}function e(a,c){var b=function(){var b=d.state,f=b.indented;if("stat"==b.lexical.type)f=b.lexical.indented;else for(var e=b.lexical;e&&")"==e.type&&e.align;e=e.prev)f=e.indented;b.lexical=new ta(f,
d.stream.column(),a,null,b.lexical,c)};b.lex=!0;return b}function f(){var a=d.state;a.lexical.prev&&(")"==a.lexical.type&&(a.indented=a.lexical.indented),a.lexical=a.lexical.prev)}function h(a){function c(d){return d==a?b():";"==a||"}"==d||")"==d||"]"==d?g():b(c)}return c}function q(a,c){return"var"==a?b(e("vardef",c),la,h(";"),f):"keyword a"==a?b(e("form"),ma,q,f):"keyword b"==a?b(e("form"),q,f):"keyword d"==a?d.stream.match(/^\s*$/,!1)?b():b(e("stat"),na,h(";"),f):"debugger"==a?b(h(";")):"{"==a?
b(e("}"),va,Y,f,z):";"==a?b():"if"==a?("else"==d.state.lexical.info&&d.state.cc[d.state.cc.length-1]==f&&d.state.cc.pop()(),b(e("form"),ma,q,f,wa)):"function"==a?b(x):"for"==a?b(e("form"),xa,q,f):"class"==a||l&&"interface"==c?(d.marked="keyword",b(e("form","class"==a?a:c),ya,f)):"variable"==a?l&&"declare"==c?(d.marked="keyword",b(q)):l&&("module"==c||"enum"==c||"type"==c)&&d.stream.match(/^\s*\w/,!1)?(d.marked="keyword","enum"==c?b(za):"type"==c?b(Aa,h("operator"),m,h(";")):b(e("form"),y,h("{"),e("}"),
Y,f,f)):l&&"namespace"==c?(d.marked="keyword",b(e("form"),k,q,f)):l&&"abstract"==c?(d.marked="keyword",b(q)):b(e("stat"),Na):"switch"==a?b(e("form"),ma,h("{"),e("}","switch"),va,Y,f,f,z):"case"==a?b(k,h(":")):"default"==a?b(h(":")):"catch"==a?b(e("form"),J,Oa,q,f,z):"export"==a?b(e("stat"),Pa,f):"import"==a?b(e("stat"),Qa,f):"async"==a?b(q):"@"==c?b(k,q):g(e("stat"),k,h(";"),f)}function Oa(a){if("("==a)return b(E,h(")"))}function k(a,c){return Ba(a,c,!1)}function v(a,c){return Ba(a,c,!0)}function ma(a){return"("!=
a?g():b(e(")"),k,h(")"),f)}function Ba(a,c,u){if(d.state.fatArrowAt==d.stream.start){var n=u?Ca:Da;if("("==a)return b(J,e(")"),r(E,")"),f,h("=>"),n,z);if("variable"==a)return g(J,y,h("=>"),n,z)}n=u?K:L;return Ra.hasOwnProperty(a)?b(n):"function"==a?b(x,n):"class"==a||l&&"interface"==c?(d.marked="keyword",b(e("form"),Sa,f)):"keyword c"==a||"async"==a?b(u?v:k):"("==a?b(e(")"),na,h(")"),f,n):"operator"==a||"spread"==a?b(u?v:k):"["==a?b(e("]"),Ta,f,n):"{"==a?S(Z,"}",null,n):"quasi"==a?g(aa,n):"new"==
a?b(Ua(u)):"import"==a?b(k):b()}function na(a){return a.match(/[;\}\)\],]/)?g():g(k)}function L(a,c){return","==a?b(k):K(a,c,!1)}function K(a,c,u){var n=0==u?L:K,ia=0==u?k:v;if("=>"==a)return b(J,u?Ca:Da,z);if("operator"==a)return/\+\+|--/.test(c)||l&&"!"==c?b(n):l&&"<"==c&&d.stream.match(/^([^>]|<.*?>)*>\s*\(/,!1)?b(e(">"),r(m,">"),f,n):"?"==c?b(k,h(":"),ia):b(ia);if("quasi"==a)return g(aa,n);if(";"!=a){if("("==a)return S(v,")","call",n);if("."==a)return b(Va,n);if("["==a)return b(e("]"),na,h("]"),
f,n);if(l&&"as"==c)return d.marked="keyword",b(m,n);if("regexp"==a)return d.state.lastType=d.marked="operator",d.stream.backUp(d.stream.pos-d.stream.start-1),b(ia)}}function aa(a,c){return"quasi"!=a?g():"${"!=c.slice(c.length-2)?b(aa):b(k,Wa)}function Wa(a){if("}"==a)return d.marked="string-2",d.state.tokenize=fa,b(aa)}function Da(a){ja(d.stream,d.state);return g("{"==a?q:k)}function Ca(a){ja(d.stream,d.state);return g("{"==a?q:v)}function Ua(a){return function(c){return"."==c?b(a?Xa:Ya):"variable"==
c&&l?b(Za,a?K:L):g(a?v:k)}}function Ya(a,c){if("target"==c)return d.marked="keyword",b(L)}function Xa(a,c){if("target"==c)return d.marked="keyword",b(K)}function Na(a){return":"==a?b(f,q):g(L,h(";"),f)}function Va(a){if("variable"==a)return d.marked="property",b()}function Z(a,c){if("async"==a)return d.marked="property",b(Z);if("variable"==a||"keyword"==d.style){d.marked="property";if("get"==c||"set"==c)return b($a);var f;l&&d.state.fatArrowAt==d.stream.start&&(f=d.stream.match(/^\s*:\s*/,!1))&&(d.state.fatArrowAt=
d.stream.pos+f[0].length);return b(F)}if("number"==a||"string"==a)return d.marked=W?"property":d.style+" property",b(F);if("jsonld-keyword"==a)return b(F);if(l&&X(c))return d.marked="keyword",b(Z);if("["==a)return b(k,G,h("]"),F);if("spread"==a)return b(v,F);if("*"==c)return d.marked="keyword",b(Z);if(":"==a)return g(F)}function $a(a){if("variable"!=a)return g(F);d.marked="property";return b(x)}function F(a){if(":"==a)return b(v);if("("==a)return g(x)}function r(a,c,f){function n(e,u){return(f?-1<
f.indexOf(e):","==e)?(e=d.state.lexical,"call"==e.info&&(e.pos=(e.pos||0)+1),b(function(b,d){return b==c||d==c?g():g(a)},n)):e==c||u==c?b():f&&-1<f.indexOf(";")?g(a):b(h(c))}return function(d,f){return d==c||f==c?b():g(a,n)}}function S(a,c,g){for(var n=3;n<arguments.length;n++)d.cc.push(arguments[n]);return b(e(c,g),r(a,c),f)}function Y(a){return"}"==a?b():g(q,Y)}function G(a,c){if(l){if(":"==a||"in"==c)return b(m);if("?"==c)return b(G)}}function Ea(a){if(l&&":"==a)return d.stream.match(/^\s*\w+\s+is\b/,
!1)?b(k,ab,m):b(m)}function ab(a,c){if("is"==c)return d.marked="keyword",b()}function m(a,c){if("keyof"==c||"typeof"==c||"infer"==c)return d.marked="keyword",b("typeof"==c?v:m);if("variable"==a||"void"==c)return d.marked="type",b(B);if("|"==c||"&"==c)return b(m);if("string"==a||"number"==a||"atom"==a)return b(B);if("["==a)return b(e("]"),r(m,"]",","),f,B);if("{"==a)return b(e("}"),r(T,"}",",;"),f,B);if("("==a)return b(r(oa,")"),bb,B);if("<"==a)return b(r(m,">"),m)}function bb(a){if("=>"==a)return b(m)}
function T(a,c){if("variable"==a||"keyword"==d.style)return d.marked="property",b(T);if("?"==c||"number"==a||"string"==a)return b(T);if(":"==a)return b(m);if("["==a)return b(h("variable"),G,h("]"),T);if("("==a)return g(M,T)}function oa(a,c){return"variable"==a&&d.stream.match(/^\s*[?:]/,!1)||"?"==c?b(oa):":"==a?b(m):"spread"==a?b(oa):g(m)}function B(a,c){if("<"==c)return b(e(">"),r(m,">"),f,B);if("|"==c||"."==a||"&"==c)return b(m);if("["==a)return b(m,h("]"),B);if("extends"==c||"implements"==c)return d.marked=
"keyword",b(m);if("?"==c)return b(m,h(":"),m)}function Za(a,c){if("<"==c)return b(e(">"),r(m,">"),f,B)}function ba(){return g(m,cb)}function cb(a,c){if("="==c)return b(m)}function la(a,c){return"enum"==c?(d.marked="keyword",b(za)):g(y,G,C,db)}function y(a,c){if(l&&X(c))return d.marked="keyword",b(y);if("variable"==a)return I(c),b();if("spread"==a)return b(y);if("["==a)return S(eb,"]");if("{"==a)return S(Fa,"}")}function Fa(a,c){if("variable"==a&&!d.stream.match(/^\s*:/,!1))return I(c),b(C);"variable"==
a&&(d.marked="property");return"spread"==a?b(y):"}"==a?g():"["==a?b(k,h("]"),h(":"),Fa):b(h(":"),y,C)}function eb(){return g(y,C)}function C(a,c){if("="==c)return b(v)}function db(a){if(","==a)return b(la)}function wa(a,c){if("keyword b"==a&&"else"==c)return b(e("form","else"),q,f)}function xa(a,c){if("await"==c)return b(xa);if("("==a)return b(e(")"),fb,f)}function fb(a){return"var"==a?b(la,N):"variable"==a?b(N):g(N)}function N(a,c){return")"==a?b():";"==a?b(N):"in"==c||"of"==c?(d.marked="keyword",
b(k,N)):g(k,N)}function x(a,c){if("*"==c)return d.marked="keyword",b(x);if("variable"==a)return I(c),b(x);if("("==a)return b(J,e(")"),r(E,")"),f,Ea,q,z);if(l&&"<"==c)return b(e(">"),r(ba,">"),f,x)}function M(a,c){if("*"==c)return d.marked="keyword",b(M);if("variable"==a)return I(c),b(M);if("("==a)return b(J,e(")"),r(E,")"),f,Ea,z);if(l&&"<"==c)return b(e(">"),r(ba,">"),f,M)}function Aa(a,c){if("keyword"==a||"variable"==a)return d.marked="type",b(Aa);if("<"==c)return b(e(">"),r(ba,">"),f)}function E(a,
c){"@"==c&&b(k,E);return"spread"==a?b(E):l&&X(c)?(d.marked="keyword",b(E)):l&&"this"==a?b(G,C):g(y,G,C)}function Sa(a,c){return"variable"==a?ya(a,c):ca(a,c)}function ya(a,c){if("variable"==a)return I(c),b(ca)}function ca(a,c){if("<"==c)return b(e(">"),r(ba,">"),f,ca);if("extends"==c||"implements"==c||l&&","==a)return"implements"==c&&(d.marked="keyword"),b(l?m:k,ca);if("{"==a)return b(e("}"),A,f)}function A(a,c){if("async"==a||"variable"==a&&("static"==c||"get"==c||"set"==c||l&&X(c))&&d.stream.match(/^\s+[\w$\xa1-\uffff]/,
!1))return d.marked="keyword",b(A);if("variable"==a||"keyword"==d.style)return d.marked="property",b(l?da:x,A);if("number"==a||"string"==a)return b(l?da:x,A);if("["==a)return b(k,G,h("]"),l?da:x,A);if("*"==c)return d.marked="keyword",b(A);if(l&&"("==a)return g(M,A);if(";"==a||","==a)return b(A);if("}"==a)return b();if("@"==c)return b(k,A)}function da(a,c){if("?"==c)return b(da);if(":"==a)return b(m,C);if("="==c)return b(v);a=d.state.lexical.prev;return g(a&&"interface"==a.info?M:x)}function Pa(a,
c){return"*"==c?(d.marked="keyword",b(pa,h(";"))):"default"==c?(d.marked="keyword",b(k,h(";"))):"{"==a?b(r(Ga,"}"),pa,h(";")):g(q)}function Ga(a,c){if("as"==c)return d.marked="keyword",b(h("variable"));if("variable"==a)return g(v,Ga)}function Qa(a){return"string"==a?b():"("==a?g(k):g(ea,Ha,pa)}function ea(a,c){if("{"==a)return S(ea,"}");"variable"==a&&I(c);"*"==c&&(d.marked="keyword");return b(gb)}function Ha(a){if(","==a)return b(ea,Ha)}function gb(a,c){if("as"==c)return d.marked="keyword",b(ea)}
function pa(a,c){if("from"==c)return d.marked="keyword",b(k)}function Ta(a){return"]"==a?b():g(r(v,"]"))}function za(){return g(e("form"),y,h("{"),e("}"),r(hb,"}"),f,f)}function hb(){return g(y,C)}function qa(a,c,b){return c.tokenize==D&&/^(?:operator|sof|keyword [bcd]|case|new|export|default|spread|[\[{}\(,;:]|=>)$/.test(c.lastType)||"quasi"==c.lastType&&/\{\s*$/.test(a.string.slice(0,a.pos-(b||0)))}var O=Ja.indentUnit,Ia=w.statementIndent,W=w.jsonld,H=w.json||W,l=w.typescript,ha=w.wordCharacters||
/[\w$\xa1-\uffff]/,sa=function(){function a(a){return{type:a,style:"keyword"}}var c=a("keyword a"),b=a("keyword b"),d=a("keyword c"),f=a("keyword d"),e=a("operator"),g={type:"atom",style:"atom"};return{"if":a("if"),"while":c,"with":c,"else":b,"do":b,"try":b,"finally":b,"return":f,"break":f,"continue":f,"new":a("new"),"delete":d,"void":d,"throw":d,"debugger":a("debugger"),"var":a("var"),"const":a("var"),let:a("var"),"function":a("function"),"catch":a("catch"),"for":a("for"),"switch":a("switch"),"case":a("case"),
"default":a("default"),"in":e,"typeof":e,"instanceof":e,"true":g,"false":g,"null":g,undefined:g,NaN:g,Infinity:g,"this":a("this"),"class":a("class"),"super":a("atom"),yield:d,"export":a("export"),"import":a("import"),"extends":d,await:d}}(),ra=/[+\-*&%=<>!?|~^@]/,La=/^@(context|id|value|language|type|container|list|set|reverse|index|base|vocab|graph)"/,P,U,Ra={atom:!0,number:!0,variable:!0,string:!0,regexp:!0,"this":!0,"jsonld-keyword":!0},d={state:null,column:null,marked:null,cc:null},Ma=new Q("this",
new Q("arguments",null));z.lex=!0;f.lex=!0;return{startState:function(a){a={tokenize:D,lastType:"sof",cc:[],lexical:new ta((a||0)-O,0,"block",!1),localVars:w.localVars,context:w.localVars&&new R(null,null,!1),indented:a||0};w.globalVars&&"object"==typeof w.globalVars&&(a.globalVars=w.globalVars);return a},token:function(a,c){a.sol()&&(c.lexical.hasOwnProperty("align")||(c.lexical.align=!1),c.indented=a.indentation(),ja(a,c));if(c.tokenize!=V&&a.eatSpace())return null;var b=c.tokenize(a,c);if("comment"==
P)return b;c.lastType="operator"!=P||"++"!=U&&"--"!=U?P:"incdec";a:{var f=P,e=U,g=c.cc;d.state=c;d.stream=a;d.marked=null;d.cc=g;d.style=b;c.lexical.hasOwnProperty("align")||(c.lexical.align=!0);for(;;)if((g.length?g.pop():H?k:q)(f,e)){for(;g.length&&g[g.length-1].lex;)g.pop()();if(d.marked){b=d.marked;break a}if(a="variable"==f)b:{for(a=c.localVars;a;a=a.next)if(a.name==e){a=!0;break b}for(c=c.context;c;c=c.prev)for(a=c.vars;a;a=a.next)if(a.name==e){a=!0;break b}a=void 0}if(a){b="variable-2";break a}break a}}return b},
indent:function(a,b){if(a.tokenize==V)return t.Pass;if(a.tokenize!=D)return 0;var c=b&&b.charAt(0),d=a.lexical,e;if(!/^\s*else\b/.test(b))for(var g=a.cc.length-1;0<=g;--g){var h=a.cc[g];if(h==f)d=d.prev;else if(h!=wa)break}for(;!("stat"!=d.type&&"form"!=d.type||"}"!=c&&(!(e=a.cc[a.cc.length-1])||e!=L&&e!=K||/^[,\.=+\-*:?[\(]/.test(b)));)d=d.prev;Ia&&")"==d.type&&"stat"==d.prev.type&&(d=d.prev);e=d.type;g=c==e;return"vardef"==e?d.indented+("operator"==a.lastType||","==a.lastType?d.info.length+1:0):
"form"==e&&"{"==c?d.indented:"form"==e?d.indented+O:"stat"==e?(c=d.indented,a="operator"==a.lastType||","==a.lastType||ra.test(b.charAt(0))||/[,.]/.test(b.charAt(0)),c+(a?Ia||O:0)):"switch"!=d.info||g||0==w.doubleIndentSwitch?d.align?d.column+(g?0:1):d.indented+(g?0:O):d.indented+(/^(?:case|default)\b/.test(b)?O:2*O)},electricInput:/^\s*(?:case .*?:|default:|\{|\})$/,blockCommentStart:H?null:"/*",blockCommentEnd:H?null:"*/",blockCommentContinue:H?null:" * ",lineComment:H?null:"//",fold:"brace",closeBrackets:"()[]{}''\"\"``",
helperType:H?"json":"javascript",jsonldMode:W,jsonMode:H,expressionAllowed:qa,skipExpression:function(a){var b=a.cc[a.cc.length-1];b!=k&&b!=v||a.cc.pop()}}});t.registerHelper("wordChars","javascript",/[\w$]/);t.defineMIME("text/javascript","javascript");t.defineMIME("text/ecmascript","javascript");t.defineMIME("application/javascript","javascript");t.defineMIME("application/x-javascript","javascript");t.defineMIME("application/ecmascript","javascript");t.defineMIME("application/json",{name:"javascript",
json:!0});t.defineMIME("application/x-json",{name:"javascript",json:!0});t.defineMIME("application/ld+json",{name:"javascript",jsonld:!0});t.defineMIME("text/typescript",{name:"javascript",typescript:!0});t.defineMIME("application/typescript",{name:"javascript",typescript:!0})});
