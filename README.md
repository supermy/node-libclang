<p align="center">
  <a href="https://github.com/node-ffi-packager"><img src="https://raw.githubusercontent.com/node-ffi-packager/resources/master/logotype/node-ffi-packager.svg?sanitize=true" alt="node-ffi-packager logotype, impossible cubes in green" width="256" border="0" /></a>
</p>

# [Forked version of `node-libclang`](https://github.com/node-ffi-packager/node-node-libclang)

- Used by [node-ffi-packager](https://github.com/node-ffi-packager) to generate [node-ffi-libraries](https://github.com/node-ffi-libraries).
- Used by a similarly forked [node-ffi-generate](https://github.com/node-ffi-packager/node-ffi-generate).
- Use this version by [referencing the repository/branch in `package.json`](https://docs.npmjs.com/configuring-npm/package-json.html#github-urls) instead of the [official version published on npm](https://www.npmjs.com/package/libclang).
- Based on [`libclang`](https://github.com/tjfontaine/node-libclang) ([v0.0.11](https://github.com/tjfontaine/node-libclang/tree/v0.0.11)) by [Timothy J Fontaine](https://github.com/tjfontaine).

---





node-libclang
=============
node.js module for libclang and parsing c-style source from javascript

AST Traversal
-------------
```javascript
var libclang = require('libclang');

var index = new libclang.index();
var tu = new libclang.translationunit();

tu.fromSource(idx, 'myLibrary.h', ['-I/path/to/my/project']);

tu.cursor().visitChildren(function (parent) {
  switch (this.kind) {
    case libclang.KINDS.CXCursor_FunctionDecl:
      console.log(this.spelling);
      break;
  }
  return libclang.CXChildVisit_Continue;
});

index.dispose();
tu.dispose();
````

Generate FFI Bindings
---------------------
This has been moved to its own library `npm install -g ffi-generate`

See also https://github.com/tjfontaine/node-ffi-generate

Notes
-----
Not all of libclang is wrapped yet, but there's enough for
[ffi-generate](https://github.com/tjfontaine/node-ffi-generate) to regenerate
the dynamic clang bindings.

The native wrapper isn't completely fleshed out or free of errors. Enough is
wrapped to allow for C modules to be successfully generated by `lib/generateffi.js`.
