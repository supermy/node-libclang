<p align="center">
  <a href="https://github.com/node-ffi-packager"><img src="https://raw.githubusercontent.com/node-ffi-packager/resources/master/logotype/node-ffi-packager.svg?sanitize=true" alt="node-ffi-packager logotype, impossible cubes in green" width="256" border="0" /></a>
</p>

<p align="center">
  <a href="https://github.com/node-ffi-packager/node-libclang">README</a> &middot; <a href="./CHANGELOG.md">Changelog</a>
</p>

# [Forked version of `node-libclang`](https://github.com/node-ffi-packager/node-libclang) changelog

Change summaries and notable excerpts from the commit log.

## v2.0.2

- The dynamic Clang header has been regenerated for [clang-9](https://clang.llvm.org/) using [`@ffi-packager/ffi-generate`](https://github.com/node-ffi-packager/node-ffi-generate) v2.0.2.

## v2.0.1

- Minor stylistic changes.

## v2.0.0

### ⚠ Breaking changes

The below list may be incomplete.

- Target Node.js v12, v14, v16.
  - Execution on v14, v16 may fail with `Check failed: result.second` due to bug [#96 in `ffi-napi`](https://github.com/node-ffi-napi/node-ffi-napi/issues/96).
    - One workaround is to ensure there is only a single copy of `ffi-napi` in the `node_modules` tree.
    - Inspect with `npm ls ffi-napi`.
- The package name is now `@ffi-packager/libclang`.
- [Naming conventions](<https://en.wikipedia.org/wiki/Naming_convention_(programming)#Examples_of_multiple-word_identifier_formats>) should be normalized; class names now use Pascal case, methods use camel case.

### Changes

- The dynamic Clang has been regenerated for [clang-9](https://clang.llvm.org/) using [`@ffi-packager/ffi-generate`](https://github.com/node-ffi-packager/node-ffi-generate) v2.0.0.
  - Test coverage in `@ffi-packager/ffi-generate` should make up for the lack of tests in `@ffi-packager/libclang`.
- Examples have been updated.
- 86b4c9c Add `isAnonymous` properties.

## v1.0.0

Forked by [Joel Purra](https://joelpurra.com/) for use in [node-ffi-packager](https://github.com/node-ffi-packager).

- 1968a1f Add information about the [node-ffi-packager](https://github.com/node-ffi-packager) fork
- e56e6c4 Allow checking if a function declaration is inlined
- f42c58f Use [ffi-napi](https://github.com/node-ffi-napi/node-ffi-napi), [ref-napi](https://github.com/node-ffi-napi/ref-napi), and [related Node.js NAPI packages](https://github.com/node-ffi-napi)
- c75b9b1 Regenerate `lib/dynamic_clang.js` for [clang-9](https://clang.llvm.org/)
- e9eee4d Add support for [clang-9](https://clang.llvm.org/)
- bc12b67 Regenerate `lib/dynamic_clang.js` for [clang-6.0](https://clang.llvm.org/)
- 94339ea Add support for [Elaborated type](https://clang.llvm.org/doxygen/classclang_1_1ElaboratedType.html)

## v0.0.11

See commit log.

## v0.0.10

See commit log.

## v0.0.9

See commit log.

## v0.0.8

See commit log.

## v0.0.7

See commit log.

## v0.0.6

See commit log.

## v0.0.5

See commit log.

## v0.0.4

See commit log.

## v0.0.3

See commit log.

## v0.0.2

See commit log.

---

`node-libclang` Copyright &copy; 2011, 2012, 2013, 2014 [Timothy J Fontaine](https://github.com/tjfontaine), &copy; 2020, 2021 [Joel Purra](https://joelpurra.com/). Released under [MIT License](https://opensource.org/licenses/MIT).
