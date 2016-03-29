'use strict';(function(f){"object"==typeof exports&&"object"==typeof module?f(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],f):f(CodeMirror)})(function(f){function p(c){m(c,q,"warning",!0);m(c,r,"error");var d;a:{d=c.description;for(var e=0;e<n.length;e++)if(-1!==d.indexOf(n[e])){d=!0;break a}d=!1}return d?null:c}function m(c,d,e,a){var h,b,g;h=c.description;for(var f=0;f<d.length;f++){b=d[f];g="string"===typeof b?b:b[0];b="string"===typeof b?
null:b[1];g=-1!==h.indexOf(g);if(a||g)c.severity=e;g&&b&&(c.description=b)}}function t(c,d){for(var e=0;e<c.length;e++){var a=c[e];if(a){var h;h=[];if(a.evidence){var b=h[a.line];if(!b){var g=a.evidence,b=[];Array.prototype.forEach.call(g,function(a,c){"\t"===a&&b.push(c+1)});h[a.line]=b}if(0<b.length){var l=a.character;b.forEach(function(a){l>a&&--l});a.character=l}}var g=a.character-1,k=g+1;a.evidence&&(h=a.evidence.substring(g).search(/.\b/),-1<h&&(k+=h));a.description=a.reason;a.start=a.character;
a.end=k;(a=p(a))&&d.push({message:a.description,severity:a.severity,from:f.Pos(a.line-1,g),to:f.Pos(a.line-1,k)})}}}var n=["Dangerous comment"],q=[["Expected '{'","Statement body should be inside '{ }' braces."]],r="Missing semicolon;Extra comma;Missing property name;Unmatched ; and instead saw; is not defined;Unclosed string;Stopping, unable to continue".split(";");f.registerHelper("lint","javascript",function(c,d){if(!window.JSHINT)return[];JSHINT(c,d,d.globals);var e=JSHINT.data().errors,a=[];
e&&t(e,a);return a})});
