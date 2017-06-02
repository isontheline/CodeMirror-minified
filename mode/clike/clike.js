'use strict';(function(q){"object"==typeof exports&&"object"==typeof module?q(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],q):q(CodeMirror)})(function(q){function D(a,b,e,c,g,m){this.indented=a;this.column=b;this.type=e;this.info=c;this.align=g;this.prev=m}function z(a,b,c,r){var e=a.indented;a.context&&"statement"==a.context.type&&"statement"!=c&&(e=a.context.indented);return a.context=new D(e,b,c,r,null,a.context)}function x(a){var b=a.context.type;
if(")"==b||"]"==b||"}"==b)a.indented=a.context.indented;return a.context=a.context.prev}function H(a,b,c){if("variable"==b.prevToken||"variable-3"==b.prevToken||/\S(?:[^- ]>|[*\]])\s*$|\*$/.test(a.string.slice(0,c))||b.typeAtEndOfLine&&a.column()==a.indentation())return!0}function I(a){for(;;){if(!a||"top"==a.type)return!0;if("}"==a.type&&"namespace"!=a.prev.info)return!1;a=a.prev}}function c(a){var b={};a=a.split(" ");for(var c=0;c<a.length;++c)b[a[c]]=!0;return b}function t(a,b){return"function"===
typeof a?a(b):a.propertyIsEnumerable(b)}function n(a,b){if(!b.startOfLine)return!1;for(var c,r=null;c=a.peek();){if("\\"==c&&a.match(/^.$/)){r=n;break}else if("/"==c&&a.match(/^\/[\/\*]/,!1))break;a.next()}b.tokenize=r;return"meta"}function A(a,b){return"variable-3"==b.prevToken?"variable-3":!1}function h(a){a.eatWhile(/[\w\.']/);return"number"}function u(a,b){a.backUp(1);if(a.match(/(R|u8R|uR|UR|LR)/)){var c=a.match(/"([^\s\\()]{0,16})\(/);if(!c)return!1;b.cpp11RawStringDelim=c[1];b.tokenize=B;return B(a,
b)}if(a.match(/(u8|u|U|L)/))return a.match(/["']/,!1)?"string":!1;a.next();return!1}function y(a,b){for(var c;null!=(c=a.next());)if('"'==c&&!a.eat('"')){b.tokenize=null;break}return"string"}function B(a,b){var c=b.cpp11RawStringDelim.replace(/[^\w\s]/g,"\\$&");a.match(new RegExp(".*?\\)"+c+'"'))?b.tokenize=null:a.skipToEnd();return"string"}function l(a,b){function c(a){if(a)for(var b in a)a.hasOwnProperty(b)&&r.push(b)}"string"==typeof a&&(a=[a]);var r=[];c(b.keywords);c(b.types);c(b.builtin);c(b.atoms);
r.length&&(b.helperType=a[0],q.registerHelper("hintWords",a[0],r));for(var g=0;g<a.length;++g)q.defineMIME(a[g],b)}function E(a,b){for(var c=!1;!a.eol();){if(!c&&a.match('"""')){b.tokenize=null;break}c="\\"==a.next()&&!c}return"string"}function F(a){return function(b,c){for(var e=!1,g,m=!1;!b.eol();){if(!a&&!e&&b.match('"')){m=!0;break}if(a&&b.match('"""')){m=!0;break}g=b.next();!e&&"$"==g&&b.match("{")&&b.skipTo("}");e=!e&&"\\"==g&&!a}if(m||!a)c.tokenize=null;return"string"}}function C(a){return function(b,
c){for(var e=!1,g,m=!1;!b.eol();){if(!e&&b.match('"')&&("single"==a||b.match('""'))){m=!0;break}if(!e&&b.match("``")){v=C(a);m=!0;break}g=b.next();e="single"==a&&!e&&"\\"==g}m&&(c.tokenize=null);return"string"}}q.defineMode("clike",function(a,b){function c(a,b){var c=a.next();if(w[c]){var p=w[c](a,b);if(!1!==p)return p}if('"'==c||"'"==c)return b.tokenize=l(c),b.tokenize(a,b);if(M.test(c))return k=c,null;if(N.test(c)){a.backUp(1);if(a.match(O))return"number";a.next()}if("/"==c){if(a.eat("*"))return b.tokenize=
g,g(a,b);if(a.eat("/"))return a.skipToEnd(),"comment"}if(J.test(c)){for(;!a.match(/^\/[\/*]/,!1)&&a.eat(J););return"operator"}a.eatWhile(K);if(L)for(;a.match(L);)a.eatWhile(K);a=a.current();return t(v,a)?(t(y,a)&&(k="newstatement"),t(C,a)&&(G=!0),"keyword"):t(A,a)?"variable-3":t(B,a)?(t(y,a)&&(k="newstatement"),"builtin"):t(E,a)?"atom":"variable"}function l(a){return function(b,c){for(var d=!1,p,f=!1;null!=(p=b.next());){if(p==a&&!d){f=!0;break}d=!d&&"\\"==p}if(f||!d&&!F)c.tokenize=null;return"string"}}
function g(a,b){for(var c=!1,p;p=a.next();){if("/"==p&&c){b.tokenize=null;break}c="*"==p}return"comment"}function m(a,c){b.typeFirstDefinitions&&a.eol()&&I(c.context)&&(c.typeAtEndOfLine=H(a,c,a.pos))}var h=a.indentUnit,n=b.statementIndentUnit||h,u=b.dontAlignCalls,v=b.keywords||{},A=b.types||{},B=b.builtin||{},y=b.blockKeywords||{},C=b.defKeywords||{},E=b.atoms||{},w=b.hooks||{},F=b.multiLineStrings,P=!1!==b.indentStatements,L=b.namespaceSeparator,M=b.isPunctuationChar||/[\[\]{}\(\),;\:\.]/,N=b.numberStart||
/[\d\.]/,O=b.number||/^(?:0x[a-f\d]+|0b[01]+|(?:\d+\.?\d*|\.\d+)(?:e[-+]?\d+)?)(u|ll?|l|f)?/i,J=b.isOperatorChar||/[+\-*&%=<>!?|\/]/,K=b.isIdentifierChar||/[\w\$_\xa1-\uffff]/,k,G;return{startState:function(a){return{tokenize:null,context:new D((a||0)-h,0,"top",null,!1),indented:0,startOfLine:!0,prevToken:null}},token:function(a,f){var d=f.context;a.sol()&&(null==d.align&&(d.align=!1),f.indented=a.indentation(),f.startOfLine=!0);if(a.eatSpace())return m(a,f),null;k=G=null;var e=(f.tokenize||c)(a,
f);if("comment"==e||"meta"==e)return e;null==d.align&&(d.align=!0);if(";"==k||":"==k||","==k&&a.match(/^\s*(?:\/\/.*)?$/,!1))for(;"statement"==f.context.type;)x(f);else if("{"==k)z(f,a.column(),"}");else if("["==k)z(f,a.column(),"]");else if("("==k)z(f,a.column(),")");else if("}"==k){for(;"statement"==d.type;)d=x(f);for("}"==d.type&&(d=x(f));"statement"==d.type;)d=x(f)}else k==d.type?x(f):P&&(("}"==d.type||"top"==d.type)&&";"!=k||"statement"==d.type&&"newstatement"==k)&&z(f,a.column(),"statement",
a.current());"variable"==e&&("def"==f.prevToken||b.typeFirstDefinitions&&H(a,f,a.start)&&I(f.context)&&a.match(/^\s*\(/,!1))&&(e="def");w.token&&(d=w.token(a,f,e),void 0!==d&&(e=d));"def"==e&&!1===b.styleDefs&&(e="variable");f.startOfLine=!1;f.prevToken=G?"def":e||k;m(a,f);return e},indent:function(a,e){if(a.tokenize!=c&&null!=a.tokenize||a.typeAtEndOfLine)return q.Pass;var d=a.context,f=e&&e.charAt(0);"statement"==d.type&&"}"==f&&(d=d.prev);if(b.dontIndentStatements)for(;"statement"==d.type&&b.dontIndentStatements.test(d.info);)d=
d.prev;if(w.indent&&(a=w.indent(a,d,e),"number"==typeof a))return a;a=f==d.type;var g=d.prev&&"switch"==d.prev.info;if(b.allmanIndentation&&/[{(]/.test(f)){for(;"top"!=d.type&&"}"!=d.type;)d=d.prev;return d.indented}return"statement"==d.type?d.indented+("{"==f?0:n):!d.align||u&&")"==d.type?")"!=d.type||a?d.indented+(a?0:h)+(a||!g||/^(?:case|default)\b/.test(e)?0:h):d.indented+n:d.column+(a?0:1)},electricInput:!1!==b.indentSwitch?/^\s*(?:case .*?:|default:|\{\}?|\})$/:/^\s*[{}]$/,blockCommentStart:"/*",
blockCommentEnd:"*/",lineComment:"//",fold:"brace"}});l(["text/x-csrc","text/x-c","text/x-chdr"],{name:"clike",keywords:c("auto if break case register continue return default do sizeof static else struct switch extern typedef union for goto while enum const volatile"),types:c("int long char short double float unsigned signed void size_t ptrdiff_t bool _Complex _Bool float_t double_t intptr_t intmax_t int8_t int16_t int32_t int64_t uintptr_t uintmax_t uint8_t uint16_t uint32_t uint64_t"),blockKeywords:c("case do else for if switch while struct"),
defKeywords:c("struct"),typeFirstDefinitions:!0,atoms:c("null true false"),hooks:{"#":n,"*":A},modeProps:{fold:["brace","include"]}});l(["text/x-c++src","text/x-c++hdr"],{name:"clike",keywords:c("auto if break case register continue return default do sizeof static else struct switch extern typedef union for goto while enum const volatile asm dynamic_cast namespace reinterpret_cast try explicit new static_cast typeid catch operator template typename class friend private this using const_cast inline public throw virtual delete mutable protected alignas alignof constexpr decltype nullptr noexcept thread_local final static_assert override"),
types:c("int long char short double float unsigned signed void size_t ptrdiff_t bool wchar_t"),blockKeywords:c("catch class do else finally for if struct switch try while"),defKeywords:c("class namespace struct enum union"),typeFirstDefinitions:!0,atoms:c("true false null"),dontIndentStatements:/^template$/,isIdentifierChar:/[\w\$_~\xa1-\uffff]/,hooks:{"#":n,"*":A,u:u,U:u,L:u,R:u,0:h,1:h,2:h,3:h,4:h,5:h,6:h,7:h,8:h,9:h,token:function(a,b,c){if(b="variable"==c&&"("==a.peek()&&(";"==b.prevToken||null==
b.prevToken||"}"==b.prevToken))a=a.current(),b=(a=/(\w+)::~?(\w+)$/.exec(a))&&a[1]==a[2];if(b)return"def"}},namespaceSeparator:"::",modeProps:{fold:["brace","include"]}});l("text/x-java",{name:"clike",keywords:c("abstract assert break case catch class const continue default do else enum extends final finally float for goto if implements import instanceof interface native new package private protected public return static strictfp super switch synchronized this throw throws transient try volatile while @interface"),
types:c("byte short int long float double boolean char void Boolean Byte Character Double Float Integer Long Number Object Short String StringBuffer StringBuilder Void"),blockKeywords:c("catch class do else finally for if switch try while"),defKeywords:c("class interface package enum @interface"),typeFirstDefinitions:!0,atoms:c("true false null"),number:/^(?:0x[a-f\d_]+|0b[01_]+|(?:[\d_]+\.?\d*|\.\d+)(?:e[-+]?[\d_]+)?)(u|ll?|l|f)?/i,hooks:{"@":function(a){if(a.match("interface",!1))return!1;a.eatWhile(/[\w\$_]/);
return"meta"}},modeProps:{fold:["brace","import"]}});l("text/x-csharp",{name:"clike",keywords:c("abstract as async await base break case catch checked class const continue default delegate do else enum event explicit extern finally fixed for foreach goto if implicit in interface internal is lock namespace new operator out override params private protected public readonly ref return sealed sizeof stackalloc static struct switch this throw try typeof unchecked unsafe using virtual void volatile while add alias ascending descending dynamic from get global group into join let orderby partial remove select set value var yield"),
types:c("Action Boolean Byte Char DateTime DateTimeOffset Decimal Double Func Guid Int16 Int32 Int64 Object SByte Single String Task TimeSpan UInt16 UInt32 UInt64 bool byte char decimal double short int long object sbyte float string ushort uint ulong"),blockKeywords:c("catch class do else finally for foreach if struct switch try while"),defKeywords:c("class interface namespace struct var"),typeFirstDefinitions:!0,atoms:c("true false null"),hooks:{"@":function(a,b){if(a.eat('"'))return b.tokenize=
y,y(a,b);a.eatWhile(/[\w\$_]/);return"meta"}}});l("text/x-scala",{name:"clike",keywords:c("abstract case catch class def do else extends final finally for forSome if implicit import lazy match new null object override package private protected return sealed super this throw trait try type val var while with yield _ assert assume require print println printf readLine readBoolean readByte readShort readChar readInt readLong readFloat readDouble"),types:c("AnyVal App Application Array BufferedIterator BigDecimal BigInt Char Console Either Enumeration Equiv Error Exception Fractional Function IndexedSeq Int Integral Iterable Iterator List Map Numeric Nil NotNull Option Ordered Ordering PartialFunction PartialOrdering Product Proxy Range Responder Seq Serializable Set Specializable Stream StringBuilder StringContext Symbol Throwable Traversable TraversableOnce Tuple Unit Vector Boolean Byte Character CharSequence Class ClassLoader Cloneable Comparable Compiler Double Exception Float Integer Long Math Number Object Package Pair Process Runtime Runnable SecurityManager Short StackTraceElement StrictMath String StringBuffer System Thread ThreadGroup ThreadLocal Throwable Triple Void"),
multiLineStrings:!0,blockKeywords:c("catch class do else finally for forSome if match switch try while"),defKeywords:c("class def object package trait type val var"),atoms:c("true false null"),indentStatements:!1,indentSwitch:!1,isOperatorChar:/[+\-*&%=<>!?|\/#:@]/,hooks:{"@":function(a){a.eatWhile(/[\w\$_]/);return"meta"},'"':function(a,b){if(!a.match('""'))return!1;b.tokenize=E;return b.tokenize(a,b)},"'":function(a){a.eatWhile(/[\w\$_\xa1-\uffff]/);return"atom"},"=":function(a,b){var c=b.context;
return"}"==c.type&&c.align&&a.eat(">")?(b.context=new D(c.indented,c.column,c.type,c.info,null,c.prev),"operator"):!1}},modeProps:{closeBrackets:{triples:'"'}}});l("text/x-kotlin",{name:"clike",keywords:c("package as typealias class interface this super val var fun for is in This throw return break continue object if else while do try when !in !is as? file import where by get set abstract enum open inner override private public internal protected catch finally out final vararg reified dynamic companion constructor init sealed field property receiver param sparam lateinit data inline noinline tailrec external annotation crossinline const operator infix suspend"),
types:c("Boolean Byte Character CharSequence Class ClassLoader Cloneable Comparable Compiler Double Exception Float Integer Long Math Number Object Package Pair Process Runtime Runnable SecurityManager Short StackTraceElement StrictMath String StringBuffer System Thread ThreadGroup ThreadLocal Throwable Triple Void"),intendSwitch:!1,indentStatements:!1,multiLineStrings:!0,number:/^(?:0x[a-f\d_]+|0b[01_]+|(?:[\d_]+\.?\d*|\.\d+)(?:e[-+]?[\d_]+)?)(u|ll?|l|f)?/i,blockKeywords:c("catch class do else finally for if where try while enum"),
defKeywords:c("class val var object package interface fun"),atoms:c("true false null this"),hooks:{'"':function(a,b){b.tokenize=F(a.match('""'));return b.tokenize(a,b)}},modeProps:{closeBrackets:{triples:'"'}}});l(["x-shader/x-vertex","x-shader/x-fragment"],{name:"clike",keywords:c("sampler1D sampler2D sampler3D samplerCube sampler1DShadow sampler2DShadow const attribute uniform varying break continue discard return for while do if else struct in out inout"),types:c("float int bool void vec2 vec3 vec4 ivec2 ivec3 ivec4 bvec2 bvec3 bvec4 mat2 mat3 mat4"),
blockKeywords:c("for while do if else struct"),builtin:c("radians degrees sin cos tan asin acos atan pow exp log exp2 sqrt inversesqrt abs sign floor ceil fract mod min max clamp mix step smoothstep length distance dot cross normalize ftransform faceforward reflect refract matrixCompMult lessThan lessThanEqual greaterThan greaterThanEqual equal notEqual any all not texture1D texture1DProj texture1DLod texture1DProjLod texture2D texture2DProj texture2DLod texture2DProjLod texture3D texture3DProj texture3DLod texture3DProjLod textureCube textureCubeLod shadow1D shadow2D shadow1DProj shadow2DProj shadow1DLod shadow2DLod shadow1DProjLod shadow2DProjLod dFdx dFdy fwidth noise1 noise2 noise3 noise4"),
atoms:c("true false gl_FragColor gl_SecondaryColor gl_Normal gl_Vertex gl_MultiTexCoord0 gl_MultiTexCoord1 gl_MultiTexCoord2 gl_MultiTexCoord3 gl_MultiTexCoord4 gl_MultiTexCoord5 gl_MultiTexCoord6 gl_MultiTexCoord7 gl_FogCoord gl_PointCoord gl_Position gl_PointSize gl_ClipVertex gl_FrontColor gl_BackColor gl_FrontSecondaryColor gl_BackSecondaryColor gl_TexCoord gl_FogFragCoord gl_FragCoord gl_FrontFacing gl_FragData gl_FragDepth gl_ModelViewMatrix gl_ProjectionMatrix gl_ModelViewProjectionMatrix gl_TextureMatrix gl_NormalMatrix gl_ModelViewMatrixInverse gl_ProjectionMatrixInverse gl_ModelViewProjectionMatrixInverse gl_TexureMatrixTranspose gl_ModelViewMatrixInverseTranspose gl_ProjectionMatrixInverseTranspose gl_ModelViewProjectionMatrixInverseTranspose gl_TextureMatrixInverseTranspose gl_NormalScale gl_DepthRange gl_ClipPlane gl_Point gl_FrontMaterial gl_BackMaterial gl_LightSource gl_LightModel gl_FrontLightModelProduct gl_BackLightModelProduct gl_TextureColor gl_EyePlaneS gl_EyePlaneT gl_EyePlaneR gl_EyePlaneQ gl_FogParameters gl_MaxLights gl_MaxClipPlanes gl_MaxTextureUnits gl_MaxTextureCoords gl_MaxVertexAttribs gl_MaxVertexUniformComponents gl_MaxVaryingFloats gl_MaxVertexTextureImageUnits gl_MaxTextureImageUnits gl_MaxFragmentUniformComponents gl_MaxCombineTextureImageUnits gl_MaxDrawBuffers"),
indentSwitch:!1,hooks:{"#":n},modeProps:{fold:["brace","include"]}});l("text/x-nesc",{name:"clike",keywords:c("auto if break case register continue return default do sizeof static else struct switch extern typedef union for goto while enum const volatileas atomic async call command component components configuration event generic implementation includes interface module new norace nx_struct nx_union post provides signal task uses abstract extends"),types:c("int long char short double float unsigned signed void size_t ptrdiff_t"),
blockKeywords:c("case do else for if switch while struct"),atoms:c("null true false"),hooks:{"#":n},modeProps:{fold:["brace","include"]}});l("text/x-objectivec",{name:"clike",keywords:c("auto if break case register continue return default do sizeof static else struct switch extern typedef union for goto while enum const volatileinline restrict _Bool _Complex _Imaginary BOOL Class bycopy byref id IMP in inout nil oneway out Protocol SEL self super atomic nonatomic retain copy readwrite readonly"),
types:c("int long char short double float unsigned signed void size_t ptrdiff_t"),atoms:c("YES NO NULL NILL ON OFF true false"),hooks:{"@":function(a){a.eatWhile(/[\w\$]/);return"keyword"},"#":n,indent:function(a,b,c){if("statement"==b.type&&/^@\w/.test(c))return b.indented}},modeProps:{fold:"brace"}});l("text/x-squirrel",{name:"clike",keywords:c("base break clone continue const default delete enum extends function in class foreach local resume return this throw typeof yield constructor instanceof static"),
types:c("int long char short double float unsigned signed void size_t ptrdiff_t"),blockKeywords:c("case catch class else for foreach if switch try while"),defKeywords:c("function local class"),typeFirstDefinitions:!0,atoms:c("true false null"),hooks:{"#":n},modeProps:{fold:["brace","include"]}});var v=null;l("text/x-ceylon",{name:"clike",keywords:c("abstracts alias assembly assert assign break case catch class continue dynamic else exists extends finally for function given if import in interface is let module new nonempty object of out outer package return satisfies super switch then this throw try value void while"),
types:function(a){a=a.charAt(0);return a===a.toUpperCase()&&a!==a.toLowerCase()},blockKeywords:c("case catch class dynamic else finally for function if interface module new object switch try while"),defKeywords:c("class dynamic function interface module object package value"),builtin:c("abstract actual aliased annotation by default deprecated doc final formal late license native optional sealed see serializable shared suppressWarnings tagged throws variable"),isPunctuationChar:/[\[\]{}\(\),;\:\.`]/,
isOperatorChar:/[+\-*&%=<>!?|^~:\/]/,numberStart:/[\d#$]/,number:/^(?:#[\da-fA-F_]+|\$[01_]+|[\d_]+[kMGTPmunpf]?|[\d_]+\.[\d_]+(?:[eE][-+]?\d+|[kMGTPmunpf]|)|)/i,multiLineStrings:!0,typeFirstDefinitions:!0,atoms:c("true false null larger smaller equal empty finished"),indentSwitch:!1,styleDefs:!1,hooks:{"@":function(a){a.eatWhile(/[\w\$_]/);return"meta"},'"':function(a,b){b.tokenize=C(a.match('""')?"triple":"single");return b.tokenize(a,b)},"`":function(a,b){if(!v||!a.match("`"))return!1;b.tokenize=
v;v=null;return b.tokenize(a,b)},"'":function(a){a.eatWhile(/[\w\$_\xa1-\uffff]/);return"atom"},token:function(a,b,c){if(("variable"==c||"variable-3"==c)&&"."==b.prevToken)return"variable-2"}},modeProps:{fold:["brace","import"],closeBrackets:{triples:'"'}}})});
