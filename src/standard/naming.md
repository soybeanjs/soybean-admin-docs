# Naming Conventions

- File and folder naming: Use lowercase with hyphen `-` for naming, connect multiple words with hyphens
```
views
├── home
│   └── index.vue

```

- Vue component names
  - Component names are uniformly named in PascalCase, with the first letter of multiple words capitalized
  ```vue
  <template>
    <AppProvider>
      <RouterView class="bg-layout" />
    </AppProvider>
  </template>
  ```
  - Iconify icon component names are uniformly named in kebab-case, with multiple words connected by hyphens
  ```vue
  <template>
    <icon-mdi-emoticon />
  </template>
  ```
  > To facilitate the direct display of icons by the Iconify plugin


- Constructor, class, TS type naming: Uniformly named in PascalCase, with the first letter of multiple words capitalized

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

- Variable, ordinary function naming: Uniformly named in camelCase, with the first letter of multiple words lowercase

```ts
let num: number = 1;

function getNum() {}
```

- Constant naming: Uniformly named in uppercase, with multiple words connected by underscores

```ts
const MAX_COUNT = 10;
```

- Style naming: Uniformly named in lowercase, with multiple words connected by hyphens


```css
.container {
}

.container-item {
}
```

- Request function naming: uniformly start with `fetch`, followed by the name of the requested resource

```ts
function fetchUser() {}
```

