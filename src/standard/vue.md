# Vue Writing Standards

## SFC Order

### script

- import statements
  - Recommended dependency order:
    1. vue
    2. vue-router
    3. pinia
    4. @vueuse/core
    5. UI libraries
    6. Other dependencies
    7. Internal project dependencies (monorepo)
    8. Alias imports
    9. Relative path imports

  - Types should be imported separately using `import type` and placed below the same dependency

    Example:

    ```ts
    import { ref } from 'vue';
    import type { Ref } from 'vue';
    ```

- defineOptions

- Props type definition

  ```ts
  interface Props {
    prop1: string;
    prop2: number;
  }
  ```

- defineProps

  ```ts
  defineProps<Props>();
  const props = defineProps<Props>(); // When using props
  ```

- Emits type definition

  ```ts
  interface Emits {
    emit1: (arg1: string) => void;
    emit2: (arg1: number) => void;
  }

  // Or
  interface Emits {
    emit1: [arg1: string];
    emit2: [arg1: number];
  }
  ```

- defineEmits

  ```ts
  defineEmits();
  const emit = defineEmits(); // When using emit
  ```

- Imported hooks functions

  Example: useRouter, useRoute, and custom hooks

  ```ts
  const router = useRouter();
  const route = useRoute();
  const appStore = useAppStore();
  const { loading, startLoading, endLoading } = useLoading();
  ```

- Component logic definition

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

- Necessary `init` function, all initialization logic is placed here

  ```ts
  async function init() {
    await fetchData();
  }
  ```

- watch and watchEffect

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

- Lifecycle hooks

  ```ts
  // Equivalent to executing in the `created` hook
  init();

  onMounted(() => {
    console.log('mounted');
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
