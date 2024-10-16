# 图标教程

## 一、静态用法：直接写在 template 中

- **iconify**

  - 安装 vscode 智能提示的插件: [Iconify IntelliSense](https://marketplace.visualstudio.com/items?itemName=antfu.iconify)

  - 找图标：网址 [https://icones.js.org/](https://icones.js.org/) 或者 vscode 安装 - [Icônes](https://marketplace.visualstudio.com/items?itemName=afzalsayed96.icones)

  - 确定图标名字：找到图标后复制名字 如：'mdi:emoticon' 或者 'mdi-emoticon'，则对应的 vue 的 template 为

    ```html
    <div>
      <icon-mdi-emoticon class="text-24px text-red" />
      <icon-mdi:emoticon style="font-size:24px;color:#f00;" />
    </div>
    ```

    ::: tip 提示
    'icon-' 为预设的前缀, 在.env 里面设置变量 VITE_ICON_PREFIX
    :::

  - 设置样式：同 html 标签一样直接应用 style 属性或者 class 属性; 通过设置 color 和 font-size 属性设置对应的颜色和大小

- **本地 svg 图标**

  - 在 src/assets/svg-icon 目录下选择一个 svg，取它的文件名，例如: 'custom-icon.svg'

  - 则对应的 vue 的 template 为

    ```html
    <icon-local-custom-icon class="text-24px text-red" />
    ```

    ::: tip 提示
    'icon-local' 为预设的前缀, 在.env 里面设置变量 VITE_ICON_LOCAL_PREFIX
    :::

## 二、动态渲染: 根据图标名称渲染对应图标

- **iconify**

  - 确定图标名字，如：'mdi-emoticon'

  - 动态渲染

    ```html
    <svg-icon icon="mdi-emoticon" />
    ```

  - 多个图标动态渲染

    ```html
    <svg-icon v-for="icon in icons" :key="icon" :icon="icon" class="text-24px text-red" />
    ```

- **本地 svg 图标**

  - 确定 svg 文件名，例如: 'custom-icon.svg'

  - 动态渲染

    ```html
    <svg-icon local-icon="custom-icon" style="font-size:24px;color:#f00;" />
    ```

    ::: tip 提示
    svg-icon 为全局组件，已经注册过了，直接在 template 中应用，icon 属性为 iconify 图标名称, local-icon 为本地 svg 图标的文件名
    :::

## 三、通过 render 函数渲染: 适用于 NaiveUI 的图标渲染

- 确定图标名字，如：iconify: **'mdi-emoticon'**, 或者本地 svg 图标 'custom-icon.svg'

  - 使用 `useSvgIcon`

    ```typescript
    import { useSvgIcon } from '@/hooks/common/icon';

    const { SvgIconVNode } = useSvgIcon();

    SvgIconVNode({ icon: 'ant-design:close-outlined', fontSize: 18 }); // iconify

    SvgIconVNode({ localIcon: 'custom-icon' }); // 本地svg图标
    ```

## 四、离线加载：添加指定的离线 iconify 图标集合

- **使用步骤**

  - 安装依赖

    ```bash
    ## 包含图标组件数据
    pnpm add @iconify/vue

    ## 包含离线图标数据
    pnpm add @iconify/json
    ```

  ::: tip 提示
  项目中已经引入相关依赖，直接在组件内引用即可
  :::

  - 准备离线图标集合数据

    如：我们需要在项目中使用 `Ant Design` 图标库，则可以按照以下方式引入离线图标

    ```typescript
    import AntDesign from '@iconify/json/json/ant-design.json';
    ```

  - 在页面中使用 `addCollection` 方法添加离线图标

    ```typescript
    import { addCollection } from '@iconify/vue';
    ```

- **代码示例**

  ```vue
  <script lang="ts" setup>
  import { Icon, addCollection } from '@iconify/vue';
  import AntDesign from '@iconify/json/json/ant-design.json';

  addCollection(AntDesign);
  </script>

  <template>
    <Icon icon="ant-design:search" class="text-40px text-success" />
  </template>
  ```
