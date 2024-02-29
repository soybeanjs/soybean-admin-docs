# 系统路由

本系统的路由基于插件 [Elegant Router](https://github.com/soybeanjs/elegant-router)，详细用法请查看插件文档。

## 自动生成

启动项目后，插件会自动生成 src/router/elegant 目录，该目录下的文件为自动生成的路由导入、路由定义和路由转换的文件

## 路由创建

### 命令创建

通过执行 `pnpm gen-route` 命令，可以快速创建路由文件

**路由名称的命名规则**

- 一级路由: `demo`, `demo-page`, `route1`
  > 名称为小写加连字符`-`的形式
- 二级路由: `demo2_child`, `demo2-page_child`, `route2_child`
  > 路由的层级用下划线`_`分隔，两边仍然遵守一级路由的命名规则
- 三级及三级以上路由: `demo3_child_child`, `demo3-page_child_child_child`

### 手动创建

**手动创建路由文件，需要遵循以下规则：**
每层路由的文件夹名称为路由名称，文件夹下的 index.vue 或者 [id].vue 为路由组件

## 路由详解

### 一级路由(单级路由)

#### 文件夹结构

```
views
├── about
│   └── index.vue
```

#### 生成的路由

```ts
{
  name: 'about',
  path: '/about',
  component: 'layout.base$view.about',
  meta: {
    title: 'about'
  }
},
```

> 它是一个单级路由，为了添加布局，组件属性将布局和视图组件组合在一起，用美元符号“$”分割

#### 转换成的Vue路由

```ts
{
  path: '/about',
  component: BaseLayout,
  children: [
    {
      name: 'about',
      path: '',
      component: () => import('@/views/about/index.vue'),
      meta: {
        title: 'about'
      }
    }
  ]
},
```

### 二级路由

#### 文件夹结构

```
views
├── list
│   ├── home
│   │   └── index.vue
│   ├── detail
│   │   └── index.vue
```

**错误示例**

```
views
├── list
│   ├── index.vue
│   ├── detail
│   │   └── index.vue
```
> 请不要出现上述 index.vue 和文件夹同级的情况，这种情况不在约定的规则中

#### 生成的路由

```ts
{
  name: 'list',
  path: '/list',
  component: 'layout.base',
  meta: {
    title: 'list'
  },
  children: [
    {
      name: 'list_home',
      path: '/list/home',
      component: 'view.list_home',
      meta: {
        title: 'list_home'
      }
    },
    {
      name: 'list_detail',
      path: '/list/detail',
      component: 'view.list_detail',
      meta: {
        title: 'list_detail'
      }
    }
  ]
}
```

> 二级路由的路由数据也是有两层的，第一层路由是布局组件，第二层路由是页面组件

#### 转换成的Vue路由

```ts
{
  name: 'list',
  path: '/list',
  component: BaseLayout,
  redirect: {
    name: 'list_home'
  },
  meta: {
    title: 'list'
  },
  children: [
    {
      name: 'list_home',
      path: '/list/home',
      component: () => import('@/views/list/home/index.vue'),
      meta: {
        title: 'list_home'
      }
    },
    {
      name: 'list_detail',
      path: '/list/detail',
      component: () => import('@/views/list/detail/index.vue'),
      meta: {
        title: 'list_detail'
      }
    }
  ]
},
```

> 路由数据的第一层包含重定向的配置，默认重定向到第一个子路由

### 多级路由（三级路由及以上）

#### 文件夹结构

- 文件夹层级深

```
views
├── multi-menu
│   ├── first
│   │   ├── child
│   │   │   └── index.vue
│   ├── second
│   │   ├── child
│   │   │   ├── home
│   │   │   │   └── index.vue
```

- 两层文件夹层级（推荐）

```
views
├── multi-menu
│   ├── first_child
│   │   └── index.vue
│   ├── second_child_home
│   │   └── index.vue
```

> 通过下划线符号 `_` 来分割路由层级，这样可以避免文件夹层级过深

#### 生成的路由

```ts
{
  name: 'multi-menu',
  path: '/multi-menu',
  component: 'layout.base',
  meta: {
    title: 'multi-menu'
  },
  children: [
    {
      name: 'multi-menu_first',
      path: '/multi-menu/first',
      meta: {
        title: 'multi-menu_first'
      },
      children: [
        {
          name: 'multi-menu_first_child',
          path: '/multi-menu/first/child',
          component: 'view.multi-menu_first_child',
          meta: {
            title: 'multi-menu_first_child'
          }
        }
      ]
    },
    {
      name: 'multi-menu_second',
      path: '/multi-menu/second',
      meta: {
        title: 'multi-menu_second'
      },
      children: [
        {
          name: 'multi-menu_second_child',
          path: '/multi-menu/second/child',
          meta: {
            title: 'multi-menu_second_child'
          },
          children: [
            {
              name: 'multi-menu_second_child_home',
              path: '/multi-menu/second/child/home',
              component: 'view.multi-menu_second_child_home',
              meta: {
                title: 'multi-menu_second_child_home'
              }
            }
          ]
        }
      ]
    }
  ]
}
```

> 如果路由层级大于 2，生成的路由数据是一个递归结构

#### 转换成的Vue路由

```ts
{
  name: 'multi-menu',
  path: '/multi-menu',
  component: BaseLayout,
  redirect: {
    name: 'multi-menu_first'
  },
  meta: {
    title: 'multi-menu'
  },
  children: [
    {
      name: 'multi-menu_first',
      path: '/multi-menu/first',
      redirect: {
        name: 'multi-menu_first_child'
      },
      meta: {
        title: 'multi-menu_first'
      }
    },
    {
      name: 'multi-menu_first_child',
      path: '/multi-menu/first/child',
      component: () => import('@/views/multi-menu/first_child/index.vue'),
      meta: {
        title: 'multi-menu_first_child'
      }
    },
    {
      name: 'multi-menu_second',
      path: '/multi-menu/second',
      redirect: {
        name: 'multi-menu_second_child'
      },
      meta: {
        title: 'multi-menu_second'
      },
    },
    {
      name: 'multi-menu_second_child',
      path: '/multi-menu/second/child',
      redirect: {
        name: 'multi-menu_second_child_home'
      },
      meta: {
        title: 'multi-menu_second_child'
      },
    },
    {
      name: 'multi-menu_second_child_home',
      path: '/multi-menu/second/child/home',
      component: () => import('@/views/multi-menu/second_child_home/index.vue'),
      meta: {
        title: 'multi-menu_second_child_home'
      }
    }
  ]
},
```

> 转换的 Vue 路由只有两层，第一层是布局组件，第二层是重定向路由或者页面路由

### 忽略文件夹的聚合路由

以下划线 `_` 开头的文件夹名称会被忽略，不会出现在路由中，其下的文件会被聚合到上一级的路由中

#### 文件夹结构

```
views
├── _error
│   ├── 403
│   │   └── index.vue
│   ├── 404
│   │   └── index.vue
│   ├── 500
│   │   └── index.vue
```

#### 生成的路由

```ts
{
  name: '403',
  path: '/403',
  component: 'layout.base$view.403',
  meta: {
    title: '403'
  }
},
{
  name: '404',
  path: '/404',
  component: 'layout.base$view.404',
  meta: {
    title: '404'
  }
},
{
  name: '500',
  path: '/500',
  component: 'layout.base$view.500',
  meta: {
    title: '500'
  }
},
```

### 参数路由

#### 文件夹结构

```
views
├── user
│   └── [id].vue
```

#### 生成的路由

```ts
{
  name: 'user',
  path: '/user/:id',
  component: 'layout.base$view.user',
  props: true,
  meta: {
    title: 'user'
  }
}
```

#### 高级的参数路由

```ts
import type { RouteKey } from "@elegant-router/types";

ElegantVueRouter({
  routePathTransformer(routeName, routePath) {
    const routeKey = routeName as RouteKey;

    if (routeKey === "user") {
      return "/user/:id(\\d+)";
    }

    return routePath;
  },
});
```

### 自定义路由

自定义路由只用于生成路由声明，不会生成路由文件，需要手动创建路由文件

#### 自定义路由配置

```ts
ElegantVueRouter({
  customRoutes: {
    map: {
      root: "/",
      notFound: "/:pathMatch(.*)*",
    },
    names: ["two-level_route"],
  },
});
```

**生成的路由key**

```ts
type RouteMap = {
  root: "/";
  notFound: "/:pathMatch(.*)*";
  "two-level": "/two-level";
  "two-level_route": "/two-level/route";
};

type CustomRouteKey = "root" | "notFound" | "two-level" | "two-level_route";
```

#### 自定义路由的component

**复用已经存在的页面路由component**

```ts
import type { CustomRoute } from "@elegant-router/types";

const customRoutes: CustomRoute[] = [
  {
    name: "root",
    path: "/",
    redirect: {
      name: "403",
    },
  },
  {
    name: "not-found",
    path: "/:pathMatch(.*)*",
    component: "layout.base$view.404",
  },
  {
    name: "two-level",
    path: "/two-level",
    component: "layout.base",
    children: [
      {
        name: "two-level_route",
        path: "/two-level/route",
        component: "view.about",
      },
    ],
  },
];
```

## 路由 component

### 布局组件

- **layout.base**: 具有公共部分的布局，如全局头部、侧边栏、底部等

- **layout.blank**: 空白布局

### 页面组件

- **view.[RouteKey]**: 页面组件
  > 例如：`view.home`, `view.multi-menu_first_child`

### 布局和页面的混合组件

- **layout.base$view.[RouteKey]**: 布局和页面的混合组件
  > 例如：`layout.base$view.home`, `layout.base$view.multi-menu_first_child`

::: tip 提示
该类型组件表示单级路由
:::

## 类型说明

### 1. type RouteKey

**解释：**

联合类型 RouteKey 声明所有的路由 key，方便统一管理路由， 该类型由插件 [Elegant Router](https://github.com/soybeanjs/elegant-router) 根据 views 下面的页面文件自动生成

::: tip 代码位置
src/typings/elegant-router.d.ts
:::

### 2. type RoutePath

**解释：**

路由的路径 path，该类型与 RouteKey 一一对应

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
   * 当前用户拥有至少一个角色时，允许访问该路由，角色列表为空时，表示无需权限
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
  activeMenu?: import('@elegant-router/types').RouteKey;
  /** 默认情况下，相同路径的路由会共享一个标签页，若设置为true，则使用多个标签页 */
  multiTab?: boolean;
  /** 若设置，路由将在标签页中固定显示，其值表示固定标签页的顺序 */
  fixedIndexInTab?: number;
}
```

::: tip 提示
icon 图标值从这里获取：[https://icones.js.org/](https://icones.js.org/)
:::

## 注意

如果在 views 中创建了一个路由页面，在别的地方调用但不在菜单那边显示,那么需要设置 meta 中的 `hideInMenu: true`

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
