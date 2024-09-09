# Vue 写法规范

## SFC顺序

### script

- import 导入语句

  - 建议按照以下依赖顺序:

    1. vue
    2. vue-router
    3. pinia
    4. @vueuse/core
    5. UI库
    6. 其他依赖
    7. 项目内部依赖(monorepo)
    8. 别名导入
    9. 相对路径导入

  - 类型单独使用 `import type` 导入，并在相同依赖的下面

    例如：

      ```ts
      import { ref } from 'vue';
      import type { Ref } from 'vue';
      ```

- defineOptions

- Props 类型定义

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

- Emits 类型定义

  ```ts
  interface Emits {
    emit1: (arg1: string) => void;
    emit2: (arg1: number) => void;
  }

  // 或者
  interface Emits {
    emit1: [arg1: string];
    emit2: [arg1: number];
  }
  ```

- defineEmits

  ```ts
  defineEmits();
  const emit = defineEmits(); // 用到emit时
  ```

- 导入的hooks函数

  例如：useRouter, useRoute, 以及自行封装的hooks

  ```ts
  const router = useRouter();
  const route = useRoute();
  const appStore = useAppStore();
  const { loading, startLoading, endLoading } = useLoading();
  ```

- 组件逻辑定义

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

- 必要的`init`函数，所有的初始化逻辑都放在这里

  ```ts
  async function init() {
    await fetchData();
  }
  ```

- watch和watchEffect

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

- 生命周期钩子

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
    increment,
  };

  defineExpose(exposed);
  ```
