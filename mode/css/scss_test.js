'use strict';(function(){function a(a){test.mode(a,b,Array.prototype.slice.call(arguments,1),"scss")}var b=CodeMirror.getMode({indentUnit:2},"text/x-scss");a("url_with_quotation","[tag foo] { [property background]:[atom url]([string test.jpg]) }");a("url_with_double_quotes",'[tag foo] { [property background]:[atom url]([string "test.jpg"]) }');a("url_with_single_quotes","[tag foo] { [property background]:[atom url]([string 'test.jpg']) }");a("string",'[def @import] [string "compass/css3"]');a("important_keyword",
"[tag foo] { [property background]:[atom url]([string 'test.jpg']) [keyword !important] }");a("variable","[variable-2 $blue]:[atom #333]");a("variable_as_attribute","[tag foo] { [property color]:[variable-2 $blue] }");a("numbers","[tag foo] { [property padding]:[number 10px] [number 10] [number 10em] [number 8in] }");a("number_percentage","[tag foo] { [property width]:[number 80%] }");a("selector","[builtin #hello][qualifier .world]{}");a("singleline_comment","[comment // this is a comment]");a("multiline_comment",
"[comment /*foobar*/]");a("attribute_with_hyphen","[tag foo] { [property font-size]:[number 10px] }");a("string_after_attribute",'[tag foo] { [property content]:[string "::"] }');a("directives","[def @include] [qualifier .mixin]");a("basic_structure","[tag p] { [property background]:[keyword red]; }");a("nested_structure","[tag p] { [tag a] { [property color]:[keyword red]; } }");a("mixin","[def @mixin] [tag table-base] {}");a("number_without_semicolon","[tag p] {[property width]:[number 12]}","[tag a] {[property color]:[keyword red];}");
a("atom_in_nested_block","[tag p] { [tag a] { [property color]:[atom #000]; } }");a("interpolation_in_property","[tag foo] { #{[variable-2 $hello]}:[number 2]; }");a("interpolation_in_selector","[tag foo]#{[variable-2 $hello]} { [property color]:[atom #000]; }");a("interpolation_error","[tag foo]#{[variable foo]} { [property color]:[atom #000]; }");a("divide_operator","[tag foo] { [property width]:[number 4] [operator /] [number 2] }");a("nested_structure_with_id_selector","[tag p] { [builtin #hello] { [property color]:[keyword red]; } }");
a("indent_mixin","[def @mixin] [tag container] (","  [variable-2 $a]: [number 10],","  [variable-2 $b]: [number 10])","{}");a("indent_nested","[tag foo] {","  [tag bar] {","  }","}");a("indent_parentheses","[tag foo] {","  [property color]: [atom darken]([variable-2 $blue],","    [number 9%]);","}");a("indent_vardef","[variable-2 $name]:","  [string 'val'];","[tag tag] {","  [tag inner] {","    [property margin]: [number 3px];","  }","}")})();
