# TS 写法规范

TypeScript 是 SoybeanAdmin 的开发基石，良好的类型约束能在编译阶段发现错误、提升代码的可读性与可维护性。本章节汇总了在严格模式下编写 TypeScript 的常见约定，帮助你写出类型安全、风格统一的代码。

## 开启严格模式

始终在 `tsconfig.json` 中开启 `strict` 模式，它会一并启用 `strictNullChecks`、`noImplicitAny` 等一系列检查，是类型安全的基础。

```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

## 优先类型推断

让编译器自动推断类型，避免冗余的类型注解。只在编译器无法推断、或需要明确约束意图时才显式标注。

```ts
// 推荐：编译器可推断为 number
const count = 1;
const list = [1, 2, 3];

// 不推荐：多余的注解
const count: number = 1;
```

函数的返回值通常也可以推断，但对外暴露的公共 API 建议显式标注返回类型，以稳定接口契约。

## interface 与 type 的取舍

两者在多数场景可以互换，约定如下：

- 描述对象结构、需要被继承或合并时，优先使用 `interface`。
- 表达联合类型、交叉类型、元组或工具类型时，使用 `type`。

```ts
// 对象结构用 interface
interface User {
  id: number;
  name: string;
}

// 联合 / 工具类型用 type
type Status = 'pending' | 'success' | 'failed';
type Nullable<T> = T | null;
```

## 避免 any

`any` 会关闭类型检查，应尽量避免。当类型确实未知时，使用 `unknown`，并在使用前通过类型收窄缩小范围。

```ts
function parse(input: unknown) {
  if (typeof input === 'string') {
    // 此处 input 被收窄为 string
    return input.trim();
  }
  return '';
}
```

## 善用泛型与工具类型

用泛型抽象可复用的逻辑，用内置工具类型（`Partial`、`Required`、`Pick`、`Omit`、`Record` 等）从已有类型派生新类型，避免重复定义。

```ts
interface User {
  id: number;
  name: string;
  email: string;
}

type UserPreview = Pick<User, 'id' | 'name'>;
type UserPatch = Partial<User>;
type UserMap = Record<number, User>;

function identity<T>(value: T): T {
  return value;
}
```

## 命名约定

类型、接口、枚举统一使用 PascalCase；泛型参数通常用单个大写字母，如 `T`（Type）、`K`（Key）、`V`（Value）。变量与函数的命名详见[命名规范](./naming)。

```ts
interface MenuItem {}
type RequestResult<T> = Promise<{ data: T }>;
function pluck<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
```

## 用常量对象替代部分枚举

对于简单的字面量集合，推荐用 `const` 对象配合 `as const`，或直接用字面量联合类型，它们更轻量，且不会生成额外的运行时代码。

```ts
// 字面量联合
type Theme = 'light' | 'dark';

// const 对象 + as const
const ROLE = {
  Admin: 'admin',
  User: 'user'
} as const;

type Role = (typeof ROLE)[keyof typeof ROLE]; // 'admin' | 'user'
```

## 函数与空值处理

为函数参数标注类型；可选参数用 `?`，并优先用默认值替代手动判空。开启 `strictNullChecks` 后，配合可选链 `?.` 与空值合并 `??` 处理可能为空的值。

```ts
function greet(name: string, greeting = 'Hello'): string {
  return `${greeting}, ${name}`;
}

// 可选链 + 空值合并
const len = user?.name?.length ?? 0;
```

注意 `??` 仅在值为 `null` 或 `undefined` 时取右侧，而 `||` 会把 `0`、`''`、`false` 也视为假值，二者语义不同。

## 使用 import type 导入类型

仅导入类型时使用 `import type`，明确区分类型导入与值导入，有助于编译器擦除类型、避免不必要的副作用。

```ts
import { ref } from 'vue';
import type { Ref } from 'vue';

import type { User } from './types';
```
