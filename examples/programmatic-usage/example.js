/* eslint-disable no-console */
console.log("start")
const {
	ChildVisitResult,
	CursorKind,
	Index,
	TranslationUnit,
} = require("../..");

const index = new Index();
//const tu = TranslationUnit.fromSource(index, "mylibrary.h", []);
const tu = TranslationUnit.fromSource(index, "/usr/local/include/rocksdb/c.h", []);
//console.log(tu)
// NOTE: the child visitor is bound to the wrapped libclang AST cursor, so avoid () => {} fat arrow functions.
tu.cursor.visitChildren(function (_parent) {
//	console.log(_parent)
	switch (this.kind) {
		case CursorKind.FunctionDecl:
			console.log(this.spelling);
			break;
		default:
			break;
	}

	return ChildVisitResult.Continue;
});
console.log("end")
// NOTE: remember to clean up.
tu.dispose();
index.dispose();
