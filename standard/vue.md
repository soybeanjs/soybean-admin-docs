## script-setup 写法

### 第一部分

#### template

### 第二部分

#### script

#### 一、import 的顺序, 依次按照下面的顺序。

::: info 提示

已经通过 eslint 规则规范

:::

#### 二、TS 类型声明

```typescript
interface Props {
	/**姓名 */
  name: string;
	/**年龄 */
  age?: number;
}

interface Emits {
  /**
   * 删除事件
   * @param id - 删除项的id
   */
	(e: 'delete', id: number): void;
}
```

#### 三、defineProps、defineEmits、withDefaults

- 定义属性，如：

```typescript
const props = withDefaults(defineProps<Props>(), {
  age: 24
});
```

其中 name 是必须的属性，age 是可选属性，通过 withDefaults 添加默认值

- 定义 emit 事件

```typescript
const emit = defineEmits<Emits>();
```

#### 四、响应式 use 函数

有些 use 函数需要传入响应式的变量参数时，则书写在声明的变量下面。

```typescript
const router = useRouter();
const route = useRoute();
```

```typescript
/**dom引用 */
const domRef = ref<HTMLElement | null>(null);
const { height: domRefHeight } = useElementSize(domRef); //获取domRef的响应式高度
```

#### 五、变量、函数声明

<br />

#### 六、watch、nextTick、vue 生命周期函数

<br />

#### 七、defineExpose
