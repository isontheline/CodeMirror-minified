'use strict';(function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)})(function(e){function k(f){var m={};f=f.split(",");for(var g=0;g<f.length;++g){var e=f[g].toUpperCase(),k=f[g].charAt(0).toUpperCase()+f[g].slice(1);m[f[g]]=!0;m[e]=!0;m[k]=!0}return m}function q(f){f.eatWhile(/[\w\$_]/);return"meta"}e.defineMode("vhdl",function(f,e){function g(b,c){var a=b.next();if(r[a]){var d=
r[a](b,c);if(!1!==d)return d}if('"'==a)return c.tokenize=x(a),c.tokenize(b,c);if("'"==a)return c.tokenize=w(a),c.tokenize(b,c);if(/[\[\]{}\(\),;\:\.]/.test(a))return h=a,null;if(/[\d']/.test(a))return b.eatWhile(/[\w\.']/),"number";if("-"==a&&b.eat("-"))return b.skipToEnd(),"comment";if(t.test(a))return b.eatWhile(t),"operator";b.eatWhile(/[\w\$_]/);a=b.current();return y.propertyIsEnumerable(a.toLowerCase())?(z.propertyIsEnumerable(a)&&(h="newstatement"),"keyword"):A.propertyIsEnumerable(a)?"atom":
"variable"}function w(b){return function(c,a){for(var d=!1,e,f=!1;null!=(e=c.next());){if(e==b&&!d){f=!0;break}d=!d&&"--"==e}if(f||!d&&!u)a.tokenize=g;return"string"}}function x(b){return function(c,a){for(var d=!1,e,f=!1;null!=(e=c.next());){if(e==b&&!d){f=!0;break}d=!d&&"--"==e}if(f||!d&&!u)a.tokenize=g;return"string-2"}}function v(b,c,a,d,e){this.indented=b;this.column=c;this.type=a;this.align=d;this.prev=e}function n(b,c,a){return b.context=new v(b.indented,c,a,null,b.context)}function l(b){var c=
b.context.type;if(")"==c||"]"==c||"}"==c)b.indented=b.context.indented;return b.context=b.context.prev}var p=f.indentUnit,A=e.atoms||k("null"),r=e.hooks||{"`":q,$:q},u=e.multiLineStrings,y=k("abs,access,after,alias,all,and,architecture,array,assert,attribute,begin,block,body,buffer,bus,case,component,configuration,constant,disconnent,downto,else,elsif,end,end block,end case,end component,end for,end generate,end if,end loop,end process,end record,end units,entity,exit,file,for,function,generate,generic,generic map,group,guarded,if,impure,in,inertial,inout,is,label,library,linkage,literal,loop,map,mod,nand,new,next,nor,null,of,on,open,or,others,out,package,package body,port,port map,postponed,procedure,process,pure,range,record,register,reject,rem,report,return,rol,ror,select,severity,signal,sla,sll,sra,srl,subtype,then,to,transport,type,unaffected,units,until,use,variable,wait,when,while,with,xnor,xor"),
z=k("architecture,entity,begin,case,port,else,elsif,end,for,function,if"),t=/[&|~><!\)\(*#%@+\/=?\:;}{,\.\^\-\[\]]/,h;return{startState:function(b){return{tokenize:null,context:new v((b||0)-p,0,"top",!1),indented:0,startOfLine:!0}},token:function(b,c){var a=c.context;b.sol()&&(null==a.align&&(a.align=!1),c.indented=b.indentation(),c.startOfLine=!0);if(b.eatSpace())return null;h=null;var d=(c.tokenize||g)(b,c);if("comment"==d||"meta"==d)return d;null==a.align&&(a.align=!0);if(";"!=h&&":"!=h||"statement"!=
a.type)if("{"==h)n(c,b.column(),"}");else if("["==h)n(c,b.column(),"]");else if("("==h)n(c,b.column(),")");else if("}"==h){for(;"statement"==a.type;)a=l(c);for("}"==a.type&&(a=l(c));"statement"==a.type;)a=l(c)}else h==a.type?l(c):("}"==a.type||"top"==a.type||"statement"==a.type&&"newstatement"==h)&&n(c,b.column(),"statement");else l(c);c.startOfLine=!1;return d},indent:function(b,c){if(b.tokenize!=g&&null!=b.tokenize)return 0;var a=c&&c.charAt(0),d=b.context,e=a==d.type;return"statement"==d.type?
d.indented+("{"==a?0:p):d.align?d.column+(e?0:1):d.indented+(e?0:p)},electricChars:"{}"}});e.defineMIME("text/x-vhdl","vhdl")});
