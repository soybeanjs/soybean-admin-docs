# 系统路由方案

## 说明

### 1. type RouteKey

**解释：**

联合类型 RouteKey 声明所有的路由 key，方便统一管理路由， 该类型由插件@soybeanjs/elegant-router 根据 views 下面的页面文件自动生成

::: tip 代码位置
./src/typings/elegant-router.d.ts
:::

### 2. type RoutePath

**解释：**

路由的路径 path，该类型会根据定义好的 RouteKey 推断出来

### 3. type RouteMeta

```typescript
// 路由元信息接口
interface RouteMeta {
  /**
   * 路由标题
   *
   * 可用于文档标题中
   */
  title: string;
  /**
   * 路由的国际化键值
   *
   * 如果设置，将用于i18n，此时title将被忽略
   */
  i18nKey?: App.I18n.I18nKey;
  /**
   * 路由的角色列表
   *
   * 当前用户拥有至少一个角色时，允许访问该路由
   */
  roles?: string[];
  /** 是否缓存该路由 */
  keepAlive?: boolean;
  /**
   * 是否为常量路由
   *
   * 无需登录，并且该路由在前端定义
   */
  constant?: boolean;
  /**
   * Iconify 图标
   *
   * 可用于菜单或面包屑中
   */
  icon?: string;
  /**
   * 本地图标
   *
   * 存在于 "src/assets/svg-icon" 目录下，如果设置，将忽略icon属性
   */
  localIcon?: string;
  /** 路由排序顺序 */
  order?: number;
  /** 路由的外部链接 */
  href?: string;
  /** 是否在菜单中隐藏该路由 */
  hideInMenu?: boolean;
  /**
   * 进入该路由时激活的菜单键
   *
   * 该路由不在菜单中
   *
   * @example
   *   假设路由是"user_detail"，如果设置为"user_list"，则会激活"用户列表"菜单项
   */
  activeMenu?: import('@elegant-router/types').LastLevelRouteKey;
  /** 默认情况下，相同路径的路由会共享一个标签页，若设置为true，则使用多个标签页 */
  multiTab?: boolean;
  /** 若设置，路由将在标签页中固定显示，其值表示固定标签页的顺序 */
  fixedIndexInTab?: number;
}
```

::: tip 提示
icon 图标值从这里获取：[https://icones.js.org/](https://icones.js.org/)
:::

## 路由布局

### 1. 布局组件

#### BasicLayout：

具有公共部分的布局，如全局头部、侧边栏、底部等

#### BlankLayout：

空白布局

### 2. 路由组件

- **basic** - 基础布局，具有公共部分的布局
- **blank** - 空白布局

## 路由声明

### 1. 创建页面文件

<br />

#### (1) 单级路由

例如:

```
views
├── about
│   └── index.vue

```

#### (2) 二级路由

例如：

```
views
├── dashboard
│   ├── analysis
│   │   └── index.vue
│   ├── workbench
│   │   └── index.vue


```

#### (3) 三级及三级以上路由

例如：

```
views
├── multi-menu
│   ├── first
│   │   ├── second
│   │   │   └── index.vue
│   │   └── second-new
│   │       └── third
│   │           └── index.vue

```

### 2.mock 声明路由

::: tip 提示

对接后端的，后端直接添加同样结构的数据

:::

#### (1)单级路由

```typescript
{
  name: 'about',
  path: '/about',
  component: 'layout.base$view.about',
  meta: {
    title: 'about',
    i18nKey: 'route.about',
    icon: 'fluent:book-information-24-regular',
    order: 10
  }
}
```

#### (2)二级路由

```typescript
{
  name: 'manage',
    path: '/manage',
    component: 'layout.base',
    meta: {
      title: 'manage',
      i18nKey: 'route.manage',
      icon: 'carbon:cloud-service-management',
      order: 9,
      roles: ['R_ADMIN']
  },
  children: [
    {
      name: 'manage_menu',
      path: '/manage/menu',
      component: 'view.manage_menu',
      meta: {
        title: 'manage_menu',
        i18nKey: 'route.manage_menu',
        icon: 'material-symbols:route',
        order: 3,
        roles: ['R_ADMIN'],
        keepAlive: true
      }
    },
  ]
}
```

#### (3)三级及三级以上路由

```typescript
{
  name: 'multi-menu',
  path: '/multi-menu',
  component: 'layout.base',
  meta: {
    title: 'multi-menu',
    i18nKey: 'route.multi-menu',
    order: 8
  },
  children: [
    {
      name: 'multi-menu_first',
      path: '/multi-menu/first',
      meta: {
        title: 'multi-menu_first',
        i18nKey: 'route.multi-menu_first',
        order: 1
      },
      children: [
        {
          name: 'multi-menu_first_child',
          path: '/multi-menu/first/child',
          component: 'view.multi-menu_first_child',
          meta: {
            title: 'multi-menu_first_child',
            i18nKey: 'route.multi-menu_first_child'
          }
        }
      ]
    }
  ]
},
```

### 3.前端路由自动生成

路由数据等同于上面的 mock 数据

::: tip 代码位置
./src/router/elegant/routes.ts
:::

::: info
插件实现了根据文件路径自动生成，编写路径和页面, 运行之后就会生成路由到 上面位置
:::

## 注意

如果在 views 中创建了一个路由页面,在别的地方调用但不在菜单那边显示,那么需要设置 meta 中的 `hideInMenu: true`

```typescript
{
    name: '403',
    path: '/403',
    component: 'layout.blank$view.403',
    meta: {
      title: '403',
      i18nKey: 'route.403',
      hideInMenu: true
    }
}
```

::: tip 提示
 具体使用插件文档：[https://github.com/soybeanjs/elegant-router.git](https://github.com/soybeanjs/elegant-router.git)
:::
