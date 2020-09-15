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

const d = require("./dynamic_clang");
const lib = d.libclang;
const consts = d.CONSTANTS;
const util = require("./util");

const Cursor = require("./cursor");

const Type = function (instance) {
	if (!(this instanceof Type)) {
		return new Type(instance);
	}

	const self = this;

	this._instance = instance;

	Object.defineProperty(this, "kind", {
		get() {
			return self._instance.kind;
		},
	});

	Object.defineProperty(this, "spelling", {
		get() {
			return util.toString(lib.clang_getTypeKindSpelling(self._instance.kind));
		},
	});

	Object.defineProperty(this, "result", {
		get() {
			return new Type(lib.clang_getResultType(self._instance));
		},
	});

	Object.defineProperty(this, "canonical", {
		get() {
			return new Type(lib.clang_getCanonicalType(self._instance));
		},
	});

	Object.defineProperty(this, "argTypes", {
		get() {
			return lib.clang_getNumArgTypes(self._instance);
		},
	});

	Object.defineProperty(this, "declaration", {
		get() {
			const c = lib.clang_getTypeDeclaration(self._instance);
			return new Cursor(c);
		},
	});

	Object.defineProperty(this, "pointeeType", {
		get() {
			return new Type(lib.clang_getPointeeType(self._instance));
		},
	});

	Object.defineProperty(this, "elementType", {
		get() {
			return new Type(lib.clang_getElementType(self._instance));
		},
	});

	Object.defineProperty(this, "numElements", {
		get() {
			return lib.clang_getNumElements(self._instance);
		},
	});

	Object.defineProperty(this, "arrayElementType", {
		get() {
			return new Type(lib.clang_getArrayElementType(self._instance));
		},
	});

	Object.defineProperty(this, "arraySize", {
		get() {
			return lib.clang_getArraySize(self._instance);
		},
	});

	Object.defineProperty(this, "namedType", {
		get() {
			return new Type(lib.clang_Type_getNamedType(self._instance));
		},
	});

	this.getArg = function (arg) {
		return new Type(lib.clang_getArgType(self._instance, arg));
	};

	this.isPOD = function () {
		return lib.clang_isPODType(self._instance) === 1;
	};
};

Object.keys(consts.CXTypeKind).forEach((key) => {
	const array = key.split("_");
	let k;
	if (array.length > 1) {
		k = array.slice(1).join("_");
		Type[k] = consts.CXTypeKind[key];
	}
});

module.exports = Type;
