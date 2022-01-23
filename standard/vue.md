## script-setup写法

### 第一部分

#### template

### 第二部分

#### script

#### 一、import的顺序, 依次按照下面的顺序。
::: info 提示

已经通过eslint规则规范

:::


#### 二、TS类型声明

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

1. 定义属性，如：

```typescript
const props = withDefaults(defineProps<Props>(), {
  age: 24
});
```

其中name是必须的属性，age是可选属性，通过withDefaults添加默认值

2. 定义emit事件

```typescript
const emit = defineEmits<Emits>();
```

#### 四、响应式use函数

有些use函数需要传入响应式的变量参数时，则书写在声明的变量下面。

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

#### 六、watch、nextTick、vue生命周期函数

<br />

#### 七、defineExpose
