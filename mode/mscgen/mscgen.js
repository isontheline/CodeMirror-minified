'use strict';(function(c){"object"==typeof exports&&"object"==typeof module?c(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],c):c(CodeMirror)})(function(c){function f(a){return new RegExp("^\\b(?:"+a.join("|")+")\\b","i")}function e(a){return new RegExp("^(?:"+a.join("|")+")","i")}function g(){return{inComment:!1,inString:!1,inAttributeList:!1,inScript:!1}}function h(a){return{inComment:a.inComment,inString:a.inString,inAttributeList:a.inAttributeList,
inScript:a.inScript}}function k(a){return function(b,d){if(b.match(e(a.brackets),!0,!0))return"bracket";if(!d.inComment){if(b.match(/\/\*[^\*\/]*/,!0,!0))return d.inComment=!0,"comment";if(b.match(e(a.singlecomment),!0,!0))return b.skipToEnd(),"comment"}if(d.inComment)return b.match(/[^\*\/]*\*\//,!0,!0)?d.inComment=!1:b.skipToEnd(),"comment";if(!d.inString&&b.match(/"(\\"|[^"])*/,!0,!0))return d.inString=!0,"string";if(d.inString)return b.match(/[^"]*"/,!0,!0)?d.inString=!1:b.skipToEnd(),"string";
if(a.keywords&&b.match(f(a.keywords),!0,!0)||b.match(f(a.options),!0,!0)||b.match(f(a.arcsWords),!0,!0)||b.match(e(a.arcsOthers),!0,!0))return"keyword";if(a.operators&&b.match(e(a.operators),!0,!0))return"operator";if(a.constants&&b.match(e(a.constants),!0,!0))return"variable";if(!a.inAttributeList&&a.attributes&&b.match("[",!0,!0))return a.inAttributeList=!0,"bracket";if(a.inAttributeList){if(null!==a.attributes&&b.match(f(a.attributes),!0,!0))return"attribute";if(b.match("]",!0,!0))return a.inAttributeList=
!1,"bracket"}b.next();return"base"}}var l={mscgen:{keywords:["msc"],options:["hscale","width","arcgradient","wordwraparcs"],constants:["true","false","on","off"],attributes:"label idurl id url linecolor linecolour textcolor textcolour textbgcolor textbgcolour arclinecolor arclinecolour arctextcolor arctextcolour arctextbgcolor arctextbgcolour arcskip".split(" "),brackets:["\\{","\\}"],arcsWords:["note","abox","rbox","box"],arcsOthers:"\\|\\|\\| \\.\\.\\. --- -- <-> == <<=>> <=> \\.\\. <<>> :: <:> -> =>> => >> :> <- <<= <= << <: x- -x".split(" "),
singlecomment:["//","#"],operators:["="]},xu:{keywords:["msc","xu"],options:"hscale width arcgradient wordwraparcs wordwrapentities watermark".split(" "),constants:["true","false","on","off","auto"],attributes:"label idurl id url linecolor linecolour textcolor textcolour textbgcolor textbgcolour arclinecolor arclinecolour arctextcolor arctextcolour arctextbgcolor arctextbgcolour arcskip title deactivate activate activation".split(" "),brackets:["\\{","\\}"],arcsWords:"note abox rbox box alt else opt break par seq strict neg critical ignore consider assert loop ref exc".split(" "),
arcsOthers:"\\|\\|\\| \\.\\.\\. --- -- <-> == <<=>> <=> \\.\\. <<>> :: <:> -> =>> => >> :> <- <<= <= << <: x- -x".split(" "),singlecomment:["//","#"],operators:["="]},msgenny:{keywords:null,options:"hscale width arcgradient wordwraparcs wordwrapentities watermark".split(" "),constants:["true","false","on","off","auto"],attributes:null,brackets:["\\{","\\}"],arcsWords:"note abox rbox box alt else opt break par seq strict neg critical ignore consider assert loop ref exc".split(" "),arcsOthers:"\\|\\|\\| \\.\\.\\. --- -- <-> == <<=>> <=> \\.\\. <<>> :: <:> -> =>> => >> :> <- <<= <= << <: x- -x".split(" "),
singlecomment:["//","#"],operators:["="]}};c.defineMode("mscgen",function(a,b){return{startState:g,copyState:h,token:k(l[b&&b.language||"mscgen"]),lineComment:"#",blockCommentStart:"/*",blockCommentEnd:"*/"}});c.defineMIME("text/x-mscgen","mscgen");c.defineMIME("text/x-xu",{name:"mscgen",language:"xu"});c.defineMIME("text/x-msgenny",{name:"mscgen",language:"msgenny"})});
