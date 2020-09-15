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

const lib = require("./dynamic_clang");
const util = require("./util");
const ref = require("ref-napi");

const Location = function (instance) {
	if (!(this instanceof Location)) {
		return new Location(instance);
	}

	//TODO XXX FIXME clang_getNullLocation
	this._instance = instance;

	Object.defineProperty(this, "presumedLocation", {
		get() {
			const self = this;
			const file = ref.alloc(lib.CXString);
			const line = ref.alloc(ref.types.uint32);
			const column = ref.alloc(ref.types.uint32);
			lib.libclang.clang_getPresumedLocation(
				self._instance,
				file,
				line,
				column,
			);

			return {
				column: column.deref(),
				filename: util.toString(file.deref()),
				line: line.deref(),
			};
		},
	});
};

module.exports = Location;
