# Vue の記述規約

## SFC の順序

### script

- import の記述順序
  - 以下の依存関係の順序に従うことを推奨:
    1. vue
    2. vue-router
    3. pinia
    4. @vueuse/core
    5. UI ライブラリ
    6. その他の依存関係
    7. プロジェクト内部の依存関係（monorepo）
    8. エイリアスのインポート
    9. 相対パスのインポート

  - 型のインポートは `import type` を使用し、同じ依存関係のインポートの下に記述する

    例：

    ```ts
    import { ref } from 'vue';
    import type { Ref } from 'vue';
    ```

- defineOptions

- Props の型定義

  ```ts
  interface Props {
    prop1: string;
    prop2: number;
  }
  ```

- defineProps

  ```ts
  defineProps<Props>();
  const props = defineProps<Props>(); // 用到props时
  ```

- Emits の型定義

  ```ts
  interface Emits {
    emit1: (arg1: string) => void;
    emit2: (arg1: number) => void;
  }

  // または
  interface Emits {
    emit1: [arg1: string];
    emit2: [arg1: number];
  }
  ```

- defineEmits

  ```ts
  defineEmits();
  const emit = defineEmits(); //  emit を使用する場合
  ```

- インポートした hooks 関数

例: useRouter、useRoute、および独自の hooks

```ts
const router = useRouter();
const route = useRoute();
const appStore = useAppStore();
const { loading, startLoading, endLoading } = useLoading();
```

- コンポーネントのロジック定義

  ```ts
  const count = ref(0);
  const increment = () => {
    count.value++;
  };

  const visible = ref(false);
  const toggleVisible = () => {
    visible.value = !visible.value;
  };
  ```

- 必要な `init` 関数（すべての初期化処理をここにまとめる）

  ```ts
  async function init() {
    await fetchData();
  }
  ```

- watch と watchEffect

  ```ts
  watchEffect(() => {
    console.log(count.value);
  });

  watch(
    () => count.value,
    (newValue, oldValue) => {
      console.log(newValue, oldValue);
    }
  );
  ```

- ライフサイクルフック

  ```ts
  // 相当于在`created`钩子中执行
  init();

  // 或者
  onMounted(() => {
    init();
  });
  ```

- defineExpose

  ```ts
  const exposed = {
    count,
    increment
  };

  defineExpose(exposed);
  ```
