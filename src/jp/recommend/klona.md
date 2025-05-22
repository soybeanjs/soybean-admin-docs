# klona

## 関連リンク

- [GitHub](https://github.com/lukeed/klona)

## 紹介

`klona` は、JavaScriptのオブジェクト、配列、日付、正規表現など、さまざまなデータ型をディープコピーするための、非常に小型（240B～501B）で効率的なユーティリティライブラリです。

### 特徴

- 超小型で高性能
- ディープコピー/再帰的なコピー
- `Array`、`Date`、`Map`、`Object`、`RegExp`、`Set`、`TypedArray` など、複雑なデータ型を安全に処理します。

浅いコピー（例：`Object.assign`）とは異なり、ディープコピーはソース入力を再帰的にたどり、その _値_（参照ではなく）を新しいインスタンスにコピーします。その結果、元のソースから独立して動作し、独自の値を制御する、構造的に同等なクローンが得られます。

> **なぜ "klona"?** スウェーデン語で "clone" という意味です。

## インストール

```bash
npm install --save klona
```

## モード

`klona` には複数の「バージョン」があり、必要な機能だけを取り込むことができます！

#### `klona/json`

> **サイズ (gzip):** 240 バイト
> **利用可能性:** CommonJS, ES Module, UMD
> **機能:** JSON データ型

```javascript
import { klona } from 'klona/json';
```

#### `klona/lite`

> **サイズ (gzip):** 354 バイト
> **利用可能性:** CommonJS, ES Module, UMD
> **機能:** `klona/json` を拡張し、カスタムクラス、Date、RegExp のサポートを追加。

```javascript
import { klona } from 'klona/lite';
```

#### `klona` (デフォルト)

> **サイズ (gzip):** 451 バイト
> **利用可能性:** CommonJS, ES Module, UMD
> **機能:** `klona/lite` を拡張し、Map, Set, DataView, ArrayBuffer, TypedArray のサポートを追加。

```javascript
import { klona } from 'klona';
```

#### `klona/full`

> **サイズ (gzip):** 501 バイト
> **利用可能性:** CommonJS, ES Module, UMD
> **機能:** `klona` を拡張し、Symbol プロパティと列挙不可能なプロパティのサポートを追加。

```javascript
import { klona } from 'klona/full';
```

## 使用方法

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

// 元のオブジェクトと完全に同じ
// assert.deepStrictEqual(input, output); // Node.js 環境でのアサーション

// ディープアップデート...
output.bar.bat.hola = 'mundo';
output.bar.baz = 99;

// ...ソースオブジェクトには影響しません！
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

戻り値: `typeof input`

入力値のディープコピー/クローンを返します。
