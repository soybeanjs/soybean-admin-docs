# klona

## Related Links

- [GitHub](https://github.com/lukeed/klona)

## Introduction

`klona` is a tiny (240B to 501B) and fast utility to "deep clone" Objects, Arrays, Dates, RegExps, and more!

### Features

- Super tiny and performant
- Deep clone / recursive copies
- Safely handles complex data types: `Array`, `Date`, `Map`, `Object`, `RegExp`, `Set`, `TypedArray`, and more.

Unlike a "shallow copy" (eg, `Object.assign`), a "deep clone" recursively traverses a source input and copies its _values_ — instead of _references_ to its values — into a new instance of that input. The result is a structurally equivalent clone that operates independently of the original source and controls its own values.

> **Why "klona"?** It's "clone" in Swedish.

## Install

```bash
npm install --save klona
```

## Modes

There are multiple "versions" of `klona` available, which allows you to bring only the functionality you need!

#### `klona/json`

> **Size (gzip):** 240 bytes
> **Availability:** CommonJS, ES Module, UMD
> **Ability:** JSON data types

```javascript
import { klona } from 'klona/json';
```

#### `klona/lite`

> **Size (gzip):** 354 bytes
> **Availability:** CommonJS, ES Module, UMD
> **Ability:** extends `klona/json` with support for custom class, Date, and RegExp

```javascript
import { klona } from 'klona/lite';
```

#### `klona` (default)

> **Size (gzip):** 451 bytes
> **Availability:** CommonJS, ES Module, UMD
> **Ability:** extends `klona/lite` with support for Map, Set, DataView, ArrayBuffer, TypedArray

```javascript
import { klona } from 'klona';
```

#### `klona/full`

> **Size (gzip):** 501 bytes
> **Availability:** CommonJS, ES Module, UMD
> **Ability:** extends `klona` with support for Symbol properties and non-enumerable properties

```javascript
import { klona } from 'klona/full';
```

## Usage

```javascript
import { klona } from 'klona';

const input = {
  foo: 1,
  bar: {
    baz: 2,
    bat: {
      hello: 'world'
    }
  }
};

const output = klona(input);

// exact copy of original
// assert.deepStrictEqual(input, output); // For assertion in Node.js environment

// applying deep updates...
output.bar.bat.hola = 'mundo';
output.bar.baz = 99;

// ...doesn't affect source!
console.log(JSON.stringify(input, null, 2));
// {
//   "foo": 1,
//   "bar": {
//     "baz": 2,
//     "bat": {
//       "hello": "world"
//     }
//   }
// }
```

## API

### `klona(input)`

Returns: `typeof input`

Returns a deep copy/clone of the input.
