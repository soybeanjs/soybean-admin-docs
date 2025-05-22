# klona

## 相关链接

- [GitHub](https://github.com/lukeed/klona)

## 介绍

`klona` 是一个非常小巧（240B 到 501B）且高效的工具库，用于深拷贝 JavaScript 对象、数组、日期、正则表达式等多种数据类型。

### 特性

- 超小体积和高性能
- 深拷贝/递归复制
- 安全处理复杂数据类型，包括：`Array`, `Date`, `Map`, `Object`, `RegExp`, `Set`, `TypedArray` 等。

与浅拷贝（例如 `Object.assign`）不同，深拷贝会递归地遍历源输入并复制其 _值_ —— 而不是其值的 _引用_ —— 到该输入的一个新实例中。结果是一个结构上相同的克隆，它独立于原始源进行操作并控制自己的值。

> **为什么叫 "klona"?** 这是瑞典语中的 "clone"。

## 安装

```bash
npm install --save klona
```

## 不同模式

`klona` 提供了多种"版本"，让你可以只引入你需要的功能！

#### `klona/json`

> **大小 (gzip):** 240 字节
> **可用性:** CommonJS, ES Module, UMD
> **能力:** JSON 数据类型

```javascript
import { klona } from 'klona/json';
```

#### `klona/lite`

> **大小 (gzip):** 354 字节
> **可用性:** CommonJS, ES Module, UMD
> **能力:** 扩展了 `klona/json`，增加了对自定义类、Date 和 RegExp 的支持。

```javascript
import { klona } from 'klona/lite';
```

#### `klona` (默认)

> **大小 (gzip):** 451 字节
> **可用性:** CommonJS, ES Module, UMD
> **能力:** 扩展了 `klona/lite`，增加了对 Map, Set, DataView, ArrayBuffer, TypedArray 的支持。

```javascript
import { klona } from 'klona';
```

#### `klona/full`

> **大小 (gzip):** 501 字节
> **可用性:** CommonJS, ES Module, UMD
> **能力:** 扩展了 `klona`，增加了对 Symbol 属性和不可枚举属性的支持。

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

// 与原始对象完全相同
// assert.deepStrictEqual(input, output); // 在 Node.js 环境中断言

// 深层更新...
output.bar.bat.hola = 'mundo';
output.bar.baz = 99;

// ...不会影响源对象!
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

返回: `typeof input`

返回输入值的深拷贝/克隆。
