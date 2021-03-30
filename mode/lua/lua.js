'use strict';(function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)})(function(e){e.defineMode("lua",function(n,p){function g(a){return new RegExp("^(?:"+a.join("|")+")$","i")}function l(a){for(var b=0;a.eat("=");)++b;a.eat("[");return b}function k(a,b){var c=a.next();if("-"==c&&a.eat("-")){if(a.eat("[")&&a.eat("["))return(b.cur=m(l(a),"comment"))(a,b);a.skipToEnd();return"comment"}return'"'==
c||"'"==c?(b.cur=q(c))(a,b):"["==c&&/[\[=]/.test(a.peek())?(b.cur=m(l(a),"string"))(a,b):/\d/.test(c)?(a.eatWhile(/[\w.%]/),"number"):/[\w_]/.test(c)?(a.eatWhile(/[\w\\\-_.]/),"variable"):null}function m(a,b){return function(c,f){for(var d=null,h;null!=(h=c.next());)if(null==d)"]"==h&&(d=0);else if("="==h)++d;else if("]"==h&&d==a){f.cur=k;break}else d=null;return b}}function q(a){return function(b,c){for(var f=!1,d;null!=(d=b.next())&&(d!=a||f);)f=!f&&"\\"==d;f||(c.cur=k);return"string"}}var r=n.indentUnit,
t=g(p.specials||[]),u=g("_G _VERSION assert collectgarbage dofile error getfenv getmetatable ipairs load loadfile loadstring module next pairs pcall print rawequal rawget rawset require select setfenv setmetatable tonumber tostring type unpack xpcall coroutine.create coroutine.resume coroutine.running coroutine.status coroutine.wrap coroutine.yield debug.debug debug.getfenv debug.gethook debug.getinfo debug.getlocal debug.getmetatable debug.getregistry debug.getupvalue debug.setfenv debug.sethook debug.setlocal debug.setmetatable debug.setupvalue debug.traceback close flush lines read seek setvbuf write io.close io.flush io.input io.lines io.open io.output io.popen io.read io.stderr io.stdin io.stdout io.tmpfile io.type io.write math.abs math.acos math.asin math.atan math.atan2 math.ceil math.cos math.cosh math.deg math.exp math.floor math.fmod math.frexp math.huge math.ldexp math.log math.log10 math.max math.min math.modf math.pi math.pow math.rad math.random math.randomseed math.sin math.sinh math.sqrt math.tan math.tanh os.clock os.date os.difftime os.execute os.exit os.getenv os.remove os.rename os.setlocale os.time os.tmpname package.cpath package.loaded package.loaders package.loadlib package.path package.preload package.seeall string.byte string.char string.dump string.find string.format string.gmatch string.gsub string.len string.lower string.match string.rep string.reverse string.sub string.upper table.concat table.insert table.maxn table.remove table.sort".split(" ")),
v=g("and break elseif false nil not or return true function end if then else do while repeat until for in local".split(" ")),w=g("function if repeat do \\( {".split(" ")),x=g(["end","until","\\)","}"]),y=/^(?:end|until|\)|}|else|elseif)/i;return{startState:function(a){return{basecol:a||0,indentDepth:0,cur:k}},token:function(a,b){if(a.eatSpace())return null;var c=b.cur(a,b);a=a.current();"variable"==c&&(v.test(a)?c="keyword":u.test(a)?c="builtin":t.test(a)&&(c="variable-2"));"comment"!=c&&"string"!=
c&&(w.test(a)?++b.indentDepth:x.test(a)&&--b.indentDepth);return c},indent:function(a,b){b=y.test(b);return a.basecol+r*(a.indentDepth-(b?1:0))},electricInput:/^\s*(?:end|until|else|\)|\})$/,lineComment:"--",blockCommentStart:"--[[",blockCommentEnd:"]]"}});e.defineMIME("text/x-lua","lua")});
