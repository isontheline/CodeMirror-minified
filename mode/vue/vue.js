'use strict';(function(a){"object"===typeof exports&&"object"===typeof module?a(require("../../lib/codemirror"),require("../../addon/mode/overlay"),require("../xml/xml"),require("../javascript/javascript"),require("../coffeescript/coffeescript"),require("../css/css"),require("../sass/sass"),require("../stylus/stylus"),require("../jade/jade"),require("../handlebars/handlebars")):"function"===typeof define&&define.amd?define("../../lib/codemirror ../../addon/mode/overlay ../xml/xml ../javascript/javascript ../coffeescript/coffeescript ../css/css ../sass/sass ../stylus/stylus ../jade/jade ../handlebars/handlebars".split(" "),
a):a(CodeMirror)})(function(a){var b={script:[["lang",/coffee(script)?/,"coffeescript"],["type",/^(?:text|application)\/(?:x-)?coffee(?:script)?$/,"coffeescript"]],style:[["lang",/^stylus$/i,"stylus"],["lang",/^sass$/i,"sass"],["type",/^(text\/)?(x-)?styl(us)?$/i,"stylus"],["type",/^text\/sass/i,"sass"]],template:[["lang",/^vue-template$/i,"vue"],["lang",/^jade$/i,"jade"],["lang",/^handlebars$/i,"handlebars"],["type",/^(text\/)?(x-)?jade$/i,"jade"],["type",/^text\/x-handlebars-template$/i,"handlebars"],
[null,null,"vue-template"]]};a.defineMode("vue-template",function(c,b){return a.overlayMode(a.getMode(c,b.backdrop||"text/html"),{token:function(a){if(a.match(/^\{\{.*?\}\}/))return"meta mustache";for(;a.next()&&!a.match("{{",!1););return null}})});a.defineMode("vue",function(c){return a.getMode(c,{name:"htmlmixed",tags:b})},"htmlmixed","xml","javascript","coffeescript","css","sass","stylus","jade","handlebars");a.defineMIME("script/x-vue","vue")});
