'use strict';(function(p){"object"==typeof exports&&"object"==typeof module?p(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],p):p(CodeMirror)})(function(p){function C(a,b,c,e,g){this.indented=a;this.column=b;this.type=c;this.align=e;this.prev=g}function q(a){return"statement"==a||"switchstatement"==a||"namespace"==a}function y(a,b,c){var e=a.indented;a.context&&q(a.context.type)&&!q(c)&&(e=a.context.indented);return a.context=new C(e,b,c,null,
a.context)}function w(a){var b=a.context.type;if(")"==b||"]"==b||"}"==b)a.indented=a.context.indented;return a.context=a.context.prev}function c(a){var b={};a=a.split(" ");for(var c=0;c<a.length;++c)b[a[c]]=!0;return b}function r(a,b){return"function"===typeof a?a(b):a.propertyIsEnumerable(b)}function n(a,b){if(!b.startOfLine)return!1;for(var c,e=null;c=a.peek();){if("\\"==c&&a.match(/^.$/)){e=n;break}else if("/"==c&&a.match(/^\/[\/\*]/,!1))break;a.next()}b.tokenize=e;return"meta"}function x(a,b){return"variable-3"==
b.prevToken?"variable-3":!1}function l(a){a.eatWhile(/[\w\.']/);return"number"}function t(a,b){a.backUp(1);if(a.match(/(R|u8R|uR|UR|LR)/)){var c=a.match(/"([^\s\\()]{0,16})\(/);if(!c)return!1;b.cpp11RawStringDelim=c[1];b.tokenize=z;return z(a,b)}if(a.match(/(u8|u|U|L)/))return a.match(/["']/,!1)?"string":!1;a.next();return!1}function A(a,b){for(var c;null!=(c=a.next());)if('"'==c&&!a.eat('"')){b.tokenize=null;break}return"string"}function z(a,b){var c=b.cpp11RawStringDelim.replace(/[^\w\s]/g,"\\$&");
a.match(new RegExp(".*?\\)"+c+'"'))?b.tokenize=null:a.skipToEnd();return"string"}function k(a,b){function c(a){if(a)for(var b in a)a.hasOwnProperty(b)&&e.push(b)}"string"==typeof a&&(a=[a]);var e=[];c(b.keywords);c(b.types);c(b.builtin);c(b.atoms);e.length&&(b.helperType=a[0],p.registerHelper("hintWords",a[0],e));for(var g=0;g<a.length;++g)p.defineMIME(a[g],b)}function D(a,b){for(var c=!1;!a.eol();){if(!c&&a.match('"""')){b.tokenize=null;break}c="\\"==a.next()&&!c}return"string"}function E(a){return function(b,
c){for(var e=!1,g,m=!1;!b.eol();){if(!a&&!e&&b.match('"')){m=!0;break}if(a&&b.match('"""')){m=!0;break}g=b.next();!e&&"$"==g&&b.match("{")&&b.skipTo("}");e=!e&&"\\"==g&&!a}if(m||!a)c.tokenize=null;return"string"}}function B(a){return function(b,c){for(var e=!1,g,m=!1;!b.eol();){if(!e&&b.match('"')&&("single"==a||b.match('""'))){m=!0;break}if(!e&&b.match("``")){u=B(a);m=!0;break}g=b.next();e="single"==a&&!e&&"\\"==g}m&&(c.tokenize=null);return"string"}}p.defineMode("clike",function(a,b){function c(a,
b){var d=a.next();if(v[d]){var f=v[d](a,b);if(!1!==f)return f}if('"'==d||"'"==d)return b.tokenize=e(d),b.tokenize(a,b);if(E.test(d))return h=d,null;if(J.test(d)){a.backUp(1);if(a.match(K))return"number";a.next()}if("/"==d){if(a.eat("*"))return b.tokenize=g,g(a,b);if(a.eat("/"))return a.skipToEnd(),"comment"}if(G.test(d)){for(;!a.match(/^\/[\/*]/,!1)&&a.eat(G););return"operator"}a.eatWhile(/[\w\$_\xa1-\uffff]/);if(H)for(;a.match(H);)a.eatWhile(/[\w\$_\xa1-\uffff]/);d=a.current();return r(n,d)?(r(x,
d)&&(h="newstatement"),r(z,d)&&(F=!0),"keyword"):r(t,d)?"variable-3":r(u,d)?(r(x,d)&&(h="newstatement"),"builtin"):r(A,d)?"atom":"variable"}function e(a){return function(b,c){for(var f=!1,e,g=!1;null!=(e=b.next());){if(e==a&&!f){g=!0;break}f=!f&&"\\"==e}if(g||!f&&!B)c.tokenize=null;return"string"}}function g(a,b){for(var c=!1,f;f=a.next();){if("/"==f&&c){b.tokenize=null;break}c="*"==f}return"comment"}var m=a.indentUnit,k=b.statementIndentUnit||m,l=b.dontAlignCalls,n=b.keywords||{},t=b.types||{},u=
b.builtin||{},x=b.blockKeywords||{},z=b.defKeywords||{},A=b.atoms||{},v=b.hooks||{},B=b.multiLineStrings,D=!1!==b.indentStatements,I=!1!==b.indentSwitch,H=b.namespaceSeparator,E=b.isPunctuationChar||/[\[\]{}\(\),;\:\.]/,J=b.numberStart||/[\d\.]/,K=b.number||/^(?:0x[a-f\d]+|0b[01]+|(?:\d+\.?\d*|\.\d+)(?:e[-+]?\d+)?)(u|ll?|l|f)?/i,G=b.isOperatorChar||/[+\-*&%=<>!?|\/]/,L=b.endStatement||/^[;:,]$/,h,F;return{startState:function(a){return{tokenize:null,context:new C((a||0)-m,0,"top",!1),indented:0,startOfLine:!0,
prevToken:null}},token:function(a,e){var d=e.context;a.sol()&&(null==d.align&&(d.align=!1),e.indented=a.indentation(),e.startOfLine=!0);if(a.eatSpace())return null;h=F=null;var f=(e.tokenize||c)(a,e);if("comment"==f||"meta"==f)return f;null==d.align&&(d.align=!0);if(L.test(h))for(;q(e.context.type);)w(e);else if("{"==h)y(e,a.column(),"}");else if("["==h)y(e,a.column(),"]");else if("("==h)y(e,a.column(),")");else if("}"==h){for(;q(d.type);)d=w(e);for("}"==d.type&&(d=w(e));q(d.type);)d=w(e)}else h==
d.type?w(e):D&&(("}"==d.type||"top"==d.type)&&";"!=h||q(d.type)&&"newstatement"==h)&&(d="statement","newstatement"==h&&I&&"switch"==a.current()?d="switchstatement":"keyword"==f&&"namespace"==a.current()&&(d="namespace"),y(e,a.column(),d));if((d="variable"==f)&&!(d="def"==e.prevToken)){if(d=b.typeFirstDefinitions)d="variable"==e.prevToken||"variable-3"==e.prevToken?!0:/\S(?:[^- ]>|[*\]])\s*$|\*$/.test(a.string.slice(0,a.start))?!0:void 0;if(d)a:for(d=e.context;;){if(!d||"top"==d.type){d=!0;break a}if("}"==
d.type&&"namespace"!=d.prev.type){d=!1;break a}d=d.prev}d=d&&a.match(/^\s*\(/,!1)}d&&(f="def");v.token&&(d=v.token(a,e,f),void 0!==d&&(f=d));"def"==f&&!1===b.styleDefs&&(f="variable");e.startOfLine=!1;e.prevToken=F?"def":f||h;return f},indent:function(a,e){if(a.tokenize!=c&&null!=a.tokenize)return p.Pass;var d=a.context,f=e&&e.charAt(0);q(d.type)&&"}"==f&&(d=d.prev);if(v.indent){var g=v.indent(a,d,e);if("number"==typeof g)return g}var g=f==d.type,h=d.prev&&"switchstatement"==d.prev.type;if(b.allmanIndentation&&
/[{(]/.test(f)){for(;"top"!=d.type&&"}"!=d.type;)d=d.prev;return d.indented}return q(d.type)?d.indented+("{"==f?0:k):!d.align||l&&")"==d.type?")"!=d.type||g?d.indented+(g?0:m)+(g||!h||/^(?:case|default)\b/.test(e)?0:m):d.indented+k:d.column+(g?0:1)},electricInput:I?/^\s*(?:case .*?:|default:|\{\}?|\})$/:/^\s*[{}]$/,blockCommentStart:"/*",blockCommentEnd:"*/",lineComment:"//",fold:"brace"}});k(["text/x-csrc","text/x-c","text/x-chdr"],{name:"clike",keywords:c("auto if break case register continue return default do sizeof static else struct switch extern typedef union for goto while enum const volatile"),
types:c("int long char short double float unsigned signed void size_t ptrdiff_t bool _Complex _Bool float_t double_t intptr_t intmax_t int8_t int16_t int32_t int64_t uintptr_t uintmax_t uint8_t uint16_t uint32_t uint64_t"),blockKeywords:c("case do else for if switch while struct"),defKeywords:c("struct"),typeFirstDefinitions:!0,atoms:c("null true false"),hooks:{"#":n,"*":x},modeProps:{fold:["brace","include"]}});k(["text/x-c++src","text/x-c++hdr"],{name:"clike",keywords:c("auto if break case register continue return default do sizeof static else struct switch extern typedef union for goto while enum const volatile asm dynamic_cast namespace reinterpret_cast try explicit new static_cast typeid catch operator template typename class friend private this using const_cast inline public throw virtual delete mutable protected alignas alignof constexpr decltype nullptr noexcept thread_local final static_assert override"),
types:c("int long char short double float unsigned signed void size_t ptrdiff_t bool wchar_t"),blockKeywords:c("catch class do else finally for if struct switch try while"),defKeywords:c("class namespace struct enum union"),typeFirstDefinitions:!0,atoms:c("true false null"),hooks:{"#":n,"*":x,u:t,U:t,L:t,R:t,0:l,1:l,2:l,3:l,4:l,5:l,6:l,7:l,8:l,9:l,token:function(a,b,c){if(b="variable"==c&&"("==a.peek()&&(";"==b.prevToken||null==b.prevToken||"}"==b.prevToken))a=a.current(),b=(a=/(\w+)::(\w+)$/.exec(a))&&
a[1]==a[2];if(b)return"def"}},namespaceSeparator:"::",modeProps:{fold:["brace","include"]}});k("text/x-java",{name:"clike",keywords:c("abstract assert break case catch class const continue default do else enum extends final finally float for goto if implements import instanceof interface native new package private protected public return static strictfp super switch synchronized this throw throws transient try volatile while"),types:c("byte short int long float double boolean char void Boolean Byte Character Double Float Integer Long Number Object Short String StringBuffer StringBuilder Void"),
blockKeywords:c("catch class do else finally for if switch try while"),defKeywords:c("class interface package enum"),typeFirstDefinitions:!0,atoms:c("true false null"),endStatement:/^[;:]$/,hooks:{"@":function(a){a.eatWhile(/[\w\$_]/);return"meta"}},modeProps:{fold:["brace","import"]}});k("text/x-csharp",{name:"clike",keywords:c("abstract as async await base break case catch checked class const continue default delegate do else enum event explicit extern finally fixed for foreach goto if implicit in interface internal is lock namespace new operator out override params private protected public readonly ref return sealed sizeof stackalloc static struct switch this throw try typeof unchecked unsafe using virtual void volatile while add alias ascending descending dynamic from get global group into join let orderby partial remove select set value var yield"),
types:c("Action Boolean Byte Char DateTime DateTimeOffset Decimal Double Func Guid Int16 Int32 Int64 Object SByte Single String Task TimeSpan UInt16 UInt32 UInt64 bool byte char decimal double short int long object sbyte float string ushort uint ulong"),blockKeywords:c("catch class do else finally for foreach if struct switch try while"),defKeywords:c("class interface namespace struct var"),typeFirstDefinitions:!0,atoms:c("true false null"),hooks:{"@":function(a,b){if(a.eat('"'))return b.tokenize=
A,A(a,b);a.eatWhile(/[\w\$_]/);return"meta"}}});k("text/x-scala",{name:"clike",keywords:c("abstract case catch class def do else extends final finally for forSome if implicit import lazy match new null object override package private protected return sealed super this throw trait try type val var while with yield _ : = => <- <: <% >: # @ assert assume require print println printf readLine readBoolean readByte readShort readChar readInt readLong readFloat readDouble :: #:: "),types:c("AnyVal App Application Array BufferedIterator BigDecimal BigInt Char Console Either Enumeration Equiv Error Exception Fractional Function IndexedSeq Int Integral Iterable Iterator List Map Numeric Nil NotNull Option Ordered Ordering PartialFunction PartialOrdering Product Proxy Range Responder Seq Serializable Set Specializable Stream StringBuilder StringContext Symbol Throwable Traversable TraversableOnce Tuple Unit Vector Boolean Byte Character CharSequence Class ClassLoader Cloneable Comparable Compiler Double Exception Float Integer Long Math Number Object Package Pair Process Runtime Runnable SecurityManager Short StackTraceElement StrictMath String StringBuffer System Thread ThreadGroup ThreadLocal Throwable Triple Void"),
multiLineStrings:!0,blockKeywords:c("catch class do else finally for forSome if match switch try while"),defKeywords:c("class def object package trait type val var"),atoms:c("true false null"),indentStatements:!1,indentSwitch:!1,hooks:{"@":function(a){a.eatWhile(/[\w\$_]/);return"meta"},'"':function(a,b){if(!a.match('""'))return!1;b.tokenize=D;return b.tokenize(a,b)},"'":function(a){a.eatWhile(/[\w\$_\xa1-\uffff]/);return"atom"},"=":function(a,b){var c=b.context;return"}"==c.type&&c.align&&a.eat(">")?
(b.context=new C(c.indented,c.column,c.type,null,c.prev),"operator"):!1}},modeProps:{closeBrackets:{triples:'"'}}});k("text/x-kotlin",{name:"clike",keywords:c("package as typealias class interface this super val var fun for is in This throw return break continue object if else while do try when !in !is as? file import where by get set abstract enum open inner override private public internal protected catch finally out final vararg reified dynamic companion constructor init sealed field property receiver param sparam lateinit data inline noinline tailrec external annotation crossinline const operator infix"),
types:c("Boolean Byte Character CharSequence Class ClassLoader Cloneable Comparable Compiler Double Exception Float Integer Long Math Number Object Package Pair Process Runtime Runnable SecurityManager Short StackTraceElement StrictMath String StringBuffer System Thread ThreadGroup ThreadLocal Throwable Triple Void"),intendSwitch:!1,indentStatements:!1,multiLineStrings:!0,blockKeywords:c("catch class do else finally for if where try while enum"),defKeywords:c("class val var object package interface fun"),
atoms:c("true false null this"),hooks:{'"':function(a,b){b.tokenize=E(a.match('""'));return b.tokenize(a,b)}},modeProps:{closeBrackets:{triples:'"'}}});k(["x-shader/x-vertex","x-shader/x-fragment"],{name:"clike",keywords:c("sampler1D sampler2D sampler3D samplerCube sampler1DShadow sampler2DShadow const attribute uniform varying break continue discard return for while do if else struct in out inout"),types:c("float int bool void vec2 vec3 vec4 ivec2 ivec3 ivec4 bvec2 bvec3 bvec4 mat2 mat3 mat4"),blockKeywords:c("for while do if else struct"),
builtin:c("radians degrees sin cos tan asin acos atan pow exp log exp2 sqrt inversesqrt abs sign floor ceil fract mod min max clamp mix step smoothstep length distance dot cross normalize ftransform faceforward reflect refract matrixCompMult lessThan lessThanEqual greaterThan greaterThanEqual equal notEqual any all not texture1D texture1DProj texture1DLod texture1DProjLod texture2D texture2DProj texture2DLod texture2DProjLod texture3D texture3DProj texture3DLod texture3DProjLod textureCube textureCubeLod shadow1D shadow2D shadow1DProj shadow2DProj shadow1DLod shadow2DLod shadow1DProjLod shadow2DProjLod dFdx dFdy fwidth noise1 noise2 noise3 noise4"),
atoms:c("true false gl_FragColor gl_SecondaryColor gl_Normal gl_Vertex gl_MultiTexCoord0 gl_MultiTexCoord1 gl_MultiTexCoord2 gl_MultiTexCoord3 gl_MultiTexCoord4 gl_MultiTexCoord5 gl_MultiTexCoord6 gl_MultiTexCoord7 gl_FogCoord gl_PointCoord gl_Position gl_PointSize gl_ClipVertex gl_FrontColor gl_BackColor gl_FrontSecondaryColor gl_BackSecondaryColor gl_TexCoord gl_FogFragCoord gl_FragCoord gl_FrontFacing gl_FragData gl_FragDepth gl_ModelViewMatrix gl_ProjectionMatrix gl_ModelViewProjectionMatrix gl_TextureMatrix gl_NormalMatrix gl_ModelViewMatrixInverse gl_ProjectionMatrixInverse gl_ModelViewProjectionMatrixInverse gl_TexureMatrixTranspose gl_ModelViewMatrixInverseTranspose gl_ProjectionMatrixInverseTranspose gl_ModelViewProjectionMatrixInverseTranspose gl_TextureMatrixInverseTranspose gl_NormalScale gl_DepthRange gl_ClipPlane gl_Point gl_FrontMaterial gl_BackMaterial gl_LightSource gl_LightModel gl_FrontLightModelProduct gl_BackLightModelProduct gl_TextureColor gl_EyePlaneS gl_EyePlaneT gl_EyePlaneR gl_EyePlaneQ gl_FogParameters gl_MaxLights gl_MaxClipPlanes gl_MaxTextureUnits gl_MaxTextureCoords gl_MaxVertexAttribs gl_MaxVertexUniformComponents gl_MaxVaryingFloats gl_MaxVertexTextureImageUnits gl_MaxTextureImageUnits gl_MaxFragmentUniformComponents gl_MaxCombineTextureImageUnits gl_MaxDrawBuffers"),
indentSwitch:!1,hooks:{"#":n},modeProps:{fold:["brace","include"]}});k("text/x-nesc",{name:"clike",keywords:c("auto if break case register continue return default do sizeof static else struct switch extern typedef union for goto while enum const volatileas atomic async call command component components configuration event generic implementation includes interface module new norace nx_struct nx_union post provides signal task uses abstract extends"),types:c("int long char short double float unsigned signed void size_t ptrdiff_t"),
blockKeywords:c("case do else for if switch while struct"),atoms:c("null true false"),hooks:{"#":n},modeProps:{fold:["brace","include"]}});k("text/x-objectivec",{name:"clike",keywords:c("auto if break case register continue return default do sizeof static else struct switch extern typedef union for goto while enum const volatileinline restrict _Bool _Complex _Imaginery BOOL Class bycopy byref id IMP in inout nil oneway out Protocol SEL self super atomic nonatomic retain copy readwrite readonly"),
types:c("int long char short double float unsigned signed void size_t ptrdiff_t"),atoms:c("YES NO NULL NILL ON OFF true false"),hooks:{"@":function(a){a.eatWhile(/[\w\$]/);return"keyword"},"#":n,indent:function(a,b,c){if("statement"==b.type&&/^@\w/.test(c))return b.indented}},modeProps:{fold:"brace"}});k("text/x-squirrel",{name:"clike",keywords:c("base break clone continue const default delete enum extends function in class foreach local resume return this throw typeof yield constructor instanceof static"),
types:c("int long char short double float unsigned signed void size_t ptrdiff_t"),blockKeywords:c("case catch class else for foreach if switch try while"),defKeywords:c("function local class"),typeFirstDefinitions:!0,atoms:c("true false null"),hooks:{"#":n},modeProps:{fold:["brace","include"]}});var u=null;k("text/x-ceylon",{name:"clike",keywords:c("abstracts alias assembly assert assign break case catch class continue dynamic else exists extends finally for function given if import in interface is let module new nonempty object of out outer package return satisfies super switch then this throw try value void while"),
types:function(a){a=a.charAt(0);return a===a.toUpperCase()&&a!==a.toLowerCase()},blockKeywords:c("case catch class dynamic else finally for function if interface module new object switch try while"),defKeywords:c("class dynamic function interface module object package value"),builtin:c("abstract actual aliased annotation by default deprecated doc final formal late license native optional sealed see serializable shared suppressWarnings tagged throws variable"),isPunctuationChar:/[\[\]{}\(\),;\:\.`]/,
isOperatorChar:/[+\-*&%=<>!?|^~:\/]/,numberStart:/[\d#$]/,number:/^(?:#[\da-fA-F_]+|\$[01_]+|[\d_]+[kMGTPmunpf]?|[\d_]+\.[\d_]+(?:[eE][-+]?\d+|[kMGTPmunpf]|)|)/i,multiLineStrings:!0,typeFirstDefinitions:!0,atoms:c("true false null larger smaller equal empty finished"),indentSwitch:!1,styleDefs:!1,hooks:{"@":function(a){a.eatWhile(/[\w\$_]/);return"meta"},'"':function(a,b){b.tokenize=B(a.match('""')?"triple":"single");return b.tokenize(a,b)},"`":function(a,b){if(!u||!a.match("`"))return!1;b.tokenize=
u;u=null;return b.tokenize(a,b)},"'":function(a){a.eatWhile(/[\w\$_\xa1-\uffff]/);return"atom"},token:function(a,b,c){if(("variable"==c||"variable-3"==c)&&"."==b.prevToken)return"variable-2"}},modeProps:{fold:["brace","import"],closeBrackets:{triples:'"'}}})});
