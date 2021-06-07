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

const engineCheck = require("engine-check");

engineCheck({
	// NOTE: read engine range from the current directory rather than the application entry point (main) module. The application can enforce their own range if they want to.
	searchRoot: __dirname,
});

exports.ChildVisitResult = require("./lib/child-visit-result");
exports.Cursor = require("./lib/cursor");
exports.CursorKind = require("./lib/cursor-kind");
exports.Index = require("./lib");
exports.TranslationUnit = require("./lib/translationunit");
exports.Type = require("./lib/type");
exports.TypeKind = require("./lib/type-kind");
exports.Location = require("./lib/location");

exports.libclang = require("./lib/dynamic-clang");
exports.util = require("./lib/util");
