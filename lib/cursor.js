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

const ffi = require("ffi-napi");
const ref = require("ref-napi");

const d = require("./dynamic_clang");
const lib = d.libclang;
const consts = d.CONSTANTS;
const {
	CXCursor,
} = d;
const {
	CXCursorVisitor,
} = d;
const {
	CXClientData,
} = d;

const Location = require("./location");

const util = require("./util");

var Cursor = function (instance) {
	if (!(this instanceof Cursor)) {
		return new Cursor(instance);
	}

	const self = this;

	this._instance = instance;

	Object.defineProperty(this, "usr", {
		get() {
			return util.toString(lib.clang_getCursorUSR(self._instance));
		},
	});

	Object.defineProperty(this, "spelling", {
		get() {
			return util.toString(lib.clang_getCursorSpelling(self._instance));
		},
	});

	Object.defineProperty(this, "displayname", {
		get() {
			return util.toString(lib.clang_getCursorDisplayName(self._instance));
		},
	});

	Object.defineProperty(this, "kind", {
		get() {
			return lib.clang_getCursorKind(self._instance);
		},
	});

	Object.defineProperty(this, "type", {
		get() {
			return new Type(lib.clang_getCursorType(self._instance));
		},
	});

	Object.defineProperty(this, "enumType", {
		get() {
			return new Type(lib.clang_getEnumDeclIntegerType(self._instance));
		},
	});

	Object.defineProperty(this, "location", {
		get() {
			return new Location(lib.clang_getCursorLocation(self._instance));
		},
	});

	Object.defineProperty(this, "enumValue", {
		get() {
			return lib.clang_getEnumConstantDeclValue(self._instance);
		},
	});

	Object.defineProperty(this, "enumUValue", {
		get() {
			return lib.clang_getEnumConstantDeclUnsignedValue(self._instance);
		},
	});

	Object.defineProperty(this, "canonical", {
		get() {
			return new Cursor(lib.clang_getCanonicalCursor(self._instance));
		},
	});

	Object.defineProperty(this, "typedefType", {
		get() {
			return new Type(lib.clang_getTypedefDeclUnderlyingType(self._instance));
		},
	});

	Object.defineProperty(this, "referenced", {
		get() {
			return new Cursor(lib.clang_getCursorReferenced(self._instance));
		},
	});

	Object.defineProperty(this, "isInlined", {
		get() {
			return lib.clang_Cursor_isFunctionInlined(self._instance) === 1;
		},
	});

	this.getArgument = function (index) {
		return new Cursor(lib.clang_Cursor_getArgument(self._instance, index));
	};
};

Cursor.Break = 0;
Cursor.Continue = 1;
Cursor.Recurse = 2;

Object.keys(consts.CXCursorKind).forEach((key) => {
	const array = key.split("_");
	if (array.length === 2) {
		Cursor[array[1]] = consts.CXCursorKind[key];
	}
});

function visitor(c, p, dataPtr) {
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
		returnValue = Cursor.Break; // CXChildVisit_Break
		console.log("we have an error", error, error.stack);
	} finally {
		return returnValue;
	}
}

const visitorCallback = ffi.Callback(
	ref.types.uint32,
	[
		CXCursor,
		CXCursor,
		CXClientData,
	],
	visitor,
);

Cursor.prototype.visitChildren = function (cb) {
	const data = {
		cb,
		error: undefined,
	};
	const dataPtr = ref.alloc("Object", data);
	lib.clang_visitChildren(this._instance, visitorCallback, dataPtr);
	if (data.error) {
		throw data.error;
	}
};

module.exports = Cursor;

var Type = require("./type");
