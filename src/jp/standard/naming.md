# 命名規約

- ファイルおよびフォルダの命名：小文字とハイフン`-`を使用して統一し、複数の単語はハイフンでつなぐ

```
views
├── home
│   └── index.vue

```

- Vue コンポーネントの命名

  - コンポーネント名は PascalCase（単語の先頭を大文字）で統一

  ```vue
  <template>
    <AppProvider>
      <RouterView class="bg-layout" />
    </AppProvider>
  </template>
  ```

  - iconify のアイコンコンポーネント名は kebab-case（小文字＋ハイフン）で統一

  ```vue
  <template>
    <icon-mdi-emoticon />
  </template>
  ```

  > iconify プラグインが直接アイコンを表示できるようにするため

- コンストラクタ、クラス、TS の型の命名：PascalCase（単語の先頭を大文字）で統一

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

- 変数・通常の関数の命名：camelCase（単語の先頭は小文字）で統一

```ts
let num: number = 1;

function getNum() {}
```

- 定数の命名：すべて大文字で統一し、単語はアンダースコア`_`でつなぐ

```ts
const MAX_COUNT = 10;
```

- スタイルの命名：すべて小文字で統一し、単語はハイフンでつなぐ

```css
.container {
}

.container-item {
}
```

- リクエスト関数の命名：`fetch` で始め、後ろにリソース名をつける

```ts
function fetchUser() {}
```
