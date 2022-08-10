## iconify 用法

### 一、静态用法：直接用图标的组件名称

- 安装 vscode 智能提示的插件: [Iconify IntelliSense](https://marketplace.visualstudio.com/items?itemName=antfu.iconify)

- 找图标：网址 [https://icones.js.org/](https://icones.js.org/) 或者 vscode 安装 - [Icônes](https://marketplace.visualstudio.com/items?itemName=afzalsayed96.icones)

- 确定图标名字：找到图标后复制名字 如：'mdi:emoticon'，则对应的 vue 的 template 为

  ```vue
  <icon-mdi:emoticon />
  ```

  ::: info

  icon-为预设的前缀

  :::

- 设置样式：同 html 标签一样直接应用 style 属性或者 class 属性; 通过设置 color 和 font-size 属性设置对应的颜色和大小

### 二、多个图标动态渲染

- 确定图标名字，如：'mdi:emoticon'

- 引入 Icon 组件：

  ```typescript
  import { Icon } from "@iconify/vue";
  ```

- 动态渲染

  ```vue
  <Icon icon="mdi:emoticon" />
  ```

::: info

Icon 组件属性 [https://docs.iconify.design/icon-components/vue/](https://docs.iconify.design/icon-components/vue/)

:::

### 三、结合 naiveUI 组件动态渲染

- 确定图标名字，如：**'mdi:emoticon'**

- 引入 vue 的 h 函数：

  ```typescript
  import { h } from "vue";
  ```

- 引入 Icon 组件

  ```typescript
  import { Icon } from "@iconify/vue";
  ```

- 动态渲染

  ```typescript
  () =>
  	h(Icon, {
  		icon: "mdi:emoticon",
  		style: { color: "#f00", fontSize: "16px" },
  	});
  ```

::: info

@/uitls 已封装好了函数：iconifyRender

:::
