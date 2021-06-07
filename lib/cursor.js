// Copyright 2011, 2012, 2013, 2014 Timothy J Fontaine <tjfontaine@gmail.com>
// Copyright 2020, 2021 Joel Purra <https://joelpurra.com/>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the 'Software'), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE

const ffi = require("ffi-napi");
const ref = require("ref-napi");

const {
	functions,
	types: {
		CXCursor,
		CXClientData,
	},
} = require("./dynamic-clang");

const ChildVisitResult = require("./child-visit-result");
const Location = require("./location");

const {
	cxStringToString,
} = require("./util");

class Cursor {
	constructor(instance) {
		this._instance = instance;
	}

	get usr() {
		return cxStringToString(() => functions.clang_getCursorUSR(this._instance));
	}

	get spelling() {
		return cxStringToString(() => functions.clang_getCursorSpelling(this._instance));
	}

	get displayName() {
		return cxStringToString(() => functions.clang_getCursorDisplayName(this._instance));
	}

	get kind() {
		return functions.clang_getCursorKind(this._instance);
	}

	get type() {
		return new Type(functions.clang_getCursorType(this._instance));
	}

	get enumType() {
		return new Type(functions.clang_getEnumDeclIntegerType(this._instance));
	}

	get location() {
		return new Location(functions.clang_getCursorLocation(this._instance));
	}

	get enumValue() {
		return functions.clang_getEnumConstantDeclValue(this._instance);
	}

	get enumUValue() {
		return functions.clang_getEnumConstantDeclUnsignedValue(this._instance);
	}

	get canonical() {
		return new Cursor(functions.clang_getCanonicalCursor(this._instance));
	}

	get typedefType() {
		return new Type(functions.clang_getTypedefDeclUnderlyingType(this._instance));
	}

	get referenced() {
		return new Cursor(functions.clang_getCursorReferenced(this._instance));
	}

	get isInlined() {
		return (functions.clang_Cursor_isFunctionInlined(this._instance) === 1);
	}

	get isAnonymous() {
		return (functions.clang_Cursor_isAnonymous(this._instance) === 1);
	}

	get isAnonymousRecordDecl() {
		return (functions.clang_Cursor_isAnonymousRecordDecl(this._instance) === 1);
	}

	getArgument(index) {
		return new Cursor(functions.clang_Cursor_getArgument(this._instance, index));
	}

	visitChildren(cb) {
		const data = {
			cb,
			error: undefined,
			// NOTE: see the CXCursorVisitor type.
			visitorCallback: new ffi.Callback(
				ref.types.uint32,
				[
					CXCursor,
					CXCursor,
					CXClientData,
				],
				Cursor.visitor,
			),
		};
		const dataPtr = ref.alloc("Object", data);
		const dataReferenceIndex = Cursor.dataReferences.length;
		Cursor.dataReferences[dataReferenceIndex] = dataPtr;
		functions.clang_visitChildren(this._instance, data.visitorCallback, dataPtr);
		delete Cursor.dataReferences[dataReferenceIndex];
		if (data.error) {
			throw data.error;
		}
	}

	static visitor(c, p, dataPtr) {
		const data = ref.readObject(dataPtr);
		const {
			cb,
		} = data;
		const s = new Cursor(c);
		const parent = new Cursor(p);
		let returnValue;

		try {
			returnValue = cb.call(s, parent);
			data.error = false;
		} catch (error) {
			data.error = error;
			returnValue = ChildVisitResult.Break;
			// eslint-disable-next-line no-console
			console.error("we have an error", error, error.stack);
		}

		return returnValue;
	}
}

Cursor.dataReferences = [];

process.on("beforeExit", () => {
	const danglingDataReferences = Cursor.dataReferences.filter((dataReference) => Boolean(dataReference));

	if (danglingDataReferences.length > 0) {
		// eslint-disable-next-line no-console
		console.warn(`Still have ${danglingDataReferences.length} non-deleted data references, out of a total of ${Cursor.dataReferences.length}.`);
	}
});

module.exports = Cursor;

// TODO: fix circular dependency.
const Type = require("./type");
