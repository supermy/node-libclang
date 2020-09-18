// Copyright 2011, 2012, 2013, 2014 Timothy J Fontaine <tjfontaine@gmail.com>
// Copyright 2020 Joel Purra <https://joelpurra.com/>
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

const {
	functions,
} = require("./dynamic-clang");
const {
	cxStringToString,
} = require("./util");

const Cursor = require("./cursor");

class Type {
	constructor(instance) {
		this._instance = instance;
	}

	get kind() {
		return this._instance.kind;
	}

	get spelling() {
		return cxStringToString(() => functions.clang_getTypeKindSpelling(this._instance.kind));
	}

	get result() {
		return new Type(functions.clang_getResultType(this._instance));
	}

	get canonical() {
		return new Type(functions.clang_getCanonicalType(this._instance));
	}

	get argTypes() {
		return functions.clang_getNumArgTypes(this._instance);
	}

	get declaration() {
		const c = functions.clang_getTypeDeclaration(this._instance);
		return new Cursor(c);
	}

	get pointeeType() {
		return new Type(functions.clang_getPointeeType(this._instance));
	}

	get elementType() {
		return new Type(functions.clang_getElementType(this._instance));
	}

	get numElements() {
		return functions.clang_getNumElements(this._instance);
	}

	get arrayElementType() {
		return new Type(functions.clang_getArrayElementType(this._instance));
	}

	get arraySize() {
		return functions.clang_getArraySize(this._instance);
	}

	get namedType() {
		return new Type(functions.clang_Type_getNamedType(this._instance));
	}

	getArg(arg) {
		return new Type(functions.clang_getArgType(this._instance, arg));
	}

	isPOD() {
		return functions.clang_isPODType(this._instance) === 1;
	}
}

module.exports = Type;
