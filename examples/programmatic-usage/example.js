/* eslint-disable no-console */
const {
	ChildVisitResult,
	CursorKind,
	Index,
	TranslationUnit,
} = require("../..");

const index = new Index();
const tu = TranslationUnit.fromSource(index, "mylibrary.h", []);

// NOTE: the child visitor is bound to the wrapped libclang AST cursor, so avoid () => {} fat arrow functions.
tu.cursor.visitChildren(function (_parent) {
	switch (this.kind) {
		case CursorKind.FunctionDecl:
			console.log(this.spelling);
			break;
		default:
			break;
	}

	return ChildVisitResult.Continue;
});

// NOTE: remember to clean up.
tu.dispose();
index.dispose();
