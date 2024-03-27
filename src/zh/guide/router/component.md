# 路由组件

## 布局组件

- **layout.base**: 具有公共部分的布局，如全局头部、侧边栏、底部等

- **layout.blank**: 空白布局

## 页面组件

- **view.[RouteKey]**: 页面组件
  > 例如：`view.home`, `view.multi-menu_first_child`

## 布局和页面的混合组件

- **layout.base$view.[RouteKey]**: 布局和页面的混合组件
  > 例如：`layout.base$view.home`, `layout.base$view.multi-menu_first_child`

::: tip 提示
该类型组件表示单级路由
:::
