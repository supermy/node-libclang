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
			// eslint-disable-next-line no-console
			console.log(this.spelling);
			break;
		default:
			break;
	}

	return ChildVisitResult.Continue;
});

index.dispose();
