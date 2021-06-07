<p align="center">
  <a href="https://github.com/node-ffi-packager"><img src="https://raw.githubusercontent.com/node-ffi-packager/resources/master/logotype/node-ffi-packager.svg?sanitize=true" alt="node-ffi-packager logotype, impossible cubes in green" width="256" border="0" /></a>
</p>

<p align="center">
  <a href="https://github.com/node-ffi-packager/node-libclang">README</a> &middot; <a href="./CHANGELOG.md">Changelog</a>
</p>

# [Forked version of `node-libclang`](https://github.com/node-ffi-packager/node-libclang)

- Used by [node-ffi-packager](https://github.com/node-ffi-packager) to generate [node-ffi-libraries](https://github.com/node-ffi-libraries).
- Used by a similarly forked [node-ffi-generate](https://github.com/node-ffi-packager/node-ffi-generate).
- Use this version by [referencing the repository/branch in `package.json`](https://docs.npmjs.com/configuring-npm/package-json.html#github-urls) instead of the [official version published on npm](https://www.npmjs.com/package/libclang).
- Based on [`libclang`](https://github.com/tjfontaine/node-libclang) ([v0.0.11](https://github.com/tjfontaine/node-libclang/tree/v0.0.11)) by [Timothy J Fontaine](https://github.com/tjfontaine).

---

# node-libclang

[Node.js](https://nodejs.org/en/) module for [`libclang`](https://clang.llvm.org/), used for parsing C language family (C, C++, Objective C/C++, OpenCL, CUDA, and RenderScript) files from javascript.

## Installation

```shell
npm install --save github:node-ffi-packager/node-libclang#semver:^v2.0.1
```

## Requirements

- Selected parts of the [The LLVM Compiler Infrastructure](https://llvm.org/).
  - The [`libclang`](https://clang.llvm.org/) library.
  - Installing using a package manager is strongly recommended.

## AST Traversal

See [`examples/`](./examples/).

## Generate FFI Bindings

See [node-ffi-generate](https://github.com/node-ffi-packager/node-ffi-generate).

## Notes

Not all of libclang is wrapped yet, but there's enough for [node-ffi-generate](https://github.com/node-ffi-packager/node-ffi-generate) to regenerate the dynamic clang bindings. This library is dogfooding with the output of node-ffi-generate.

---

`node-libclang` Copyright &copy; 2011, 2012, 2013, 2014 [Timothy J Fontaine](https://github.com/tjfontaine), &copy; 2020, 2021 [Joel Purra](https://joelpurra.com/). Released under [MIT License](https://opensource.org/licenses/MIT).
