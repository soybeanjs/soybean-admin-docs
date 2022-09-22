## script-setup 写法

### 第一部分

#### template

### 第二部分

#### script

#### 一、import 的顺序, 依次按照下面的顺序。

::: tip 提示

已经通过 eslint 规则规范

:::

#### 二、属性类型 Props、withDefaults、defineProps

```typescript
interface Props {
	/** 姓名 */
  name: string;
	/** 年龄 */
  age?: number;
}

const props = withDefaults(defineProps<Props>(), {
  age: 24
});
// 其中 name 是必须的属性，age 是可选属性，通过 withDefaults 添加默认值
```

#### 三、类型 Emit、defineEmits

- 定义属性，如：

```typescript
interface Emits {
  /**
   * 删除事件
   * @param id - 删除项的id
   */
	(e: 'delete', id: number): void;
}

const emit = defineEmits<Emits>();
```

#### 四、响应式 use 函数

```typescript
const router = useRouter();
const route = useRoute();
```

有些 use 函数需要传入响应式的变量参数时，则书写在声明的变量下面

```ts
/** dom引用, 该部分放到下面 */
const domRef = ref<HTMLElement | null>(null);
const { height: domRefHeight } = useElementSize(domRef);
```

#### 五、按照业务逻辑的变量、函数声明

```ts
const count = ref(0);
const setCount = (val: number) => {
  count.value = val;
}

const visible = ref(false);
const setVisible = (val: boolean) => {
  visible.value = val;
}
```

<br />

#### 六、init 函数、 watch、函数调用、vue 生命周期函数

```ts
function init() {
  //
}

watch(visible, newValue => {
  //
})

// init初始化调用
init();

onMounted(() => {
  //
});

onBeforeMount(() => {
  //
});
```

<br />

#### 七、defineExpose
