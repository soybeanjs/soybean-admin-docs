# 路由结构

## 一级路由(单级路由)

### 文件夹结构

```
views
├── about
│   └── index.vue
```

### 生成的路由

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

### 转换成的Vue路由

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

## 二级路由

### 文件夹结构

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

### 生成的路由

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

### 转换成的Vue路由

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

## 多级路由（三级路由及以上）

### 文件夹结构

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

### 生成的路由

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

### 转换成的Vue路由

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

## 忽略文件夹的聚合路由

以下划线 `_` 开头的文件夹名称会被忽略，不会出现在路由中，其下的文件会被聚合到上一级的路由中

### 文件夹结构

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

### 生成的路由

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

## 参数路由

### 文件夹结构

```
views
├── user
│   └── [id].vue
```

### 生成的路由

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

### 高级的参数路由

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

## 自定义路由

自定义路由只用于生成路由声明，不会生成路由文件，需要手动创建路由文件

### 自定义路由配置

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

### 自定义路由的component

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
