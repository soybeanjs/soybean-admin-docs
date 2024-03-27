# 命名规范

- 文件和文件夹命名: 统一用小写加连字符`-`命名，多个单词用连字符连接
```
views
├── home
│   └── index.vue

```

- Vue 组件名称
  - 组件名称统一用 PascalCase 法命名，多个单词首字母大写
  ```vue
  <template>
    <AppProvider>
      <RouterView class="bg-layout" />
    </AppProvider>
  </template>
  ```
  - iconify 图标组件名称统一用 kebab-case 法命名，多个单词用中划线连接
  ```vue
  <template>
    <icon-mdi-emoticon />
  </template>
  ```
  > 方便iconify插件直接展示图标


- 构造函数、class 类、TS 类型命名：统一用 PascalCase 法命名，多个单词首字母大写

```ts
function Person() {}

class Person {}

type Person = {
  name: string;
};

interface Person {
  name: string;
}
```

- 变量、普通函数命名：统一用 camelCase 法命名，多个单词首字母小写

```ts
let num: number = 1;

function getNum() {}
```

- 常量命名：统一用大写字母命名，多个单词用下划线连接

```ts
const MAX_COUNT = 10;
```

- 样式的命名：统一用小写字母命名，多个单词用中划线连接

```css
.container {
}

.container-item {
}
```

- 请求函数命名：统一以`fetch`开头，后面跟请求的资源名称

```ts
function fetchUser() {}
```

