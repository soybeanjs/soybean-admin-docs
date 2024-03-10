# System Routing

The routing of this system is based on the plugin [Elegant Router](https://github.com/soybeanjs/elegant-router). For detailed usage, please refer to the plugin documentation.

## Auto-generation

After starting the project, the plugin will automatically generate the src/router/elegant directory. The files in this directory are automatically generated files for route import, route definition, and route conversion.

## Route Creation

### Command Creation

By executing the `pnpm gen-route` command, you can quickly create route files.

**Naming rules for route names**

- First-level route: `demo`, `demo-page`, `route1`
  > The name is in the form of lowercase with hyphen `-`
- Second-level route: `demo2_child`, `demo2-page_child`, `route2_child`
  > The level of the route is separated by an underscore `_`, and both sides still follow the naming rules of the first-level route
- Third-level and above routes: `demo3_child_child`, `demo3-page_child_child_child`

### Manual Creation

**When manually creating route files, the following rules need to be followed:**
The name of the folder for each level of route is the route name, and the index.vue or [id].vue under the folder is the route component.

## Route Details

### One-level route (single-level route)

#### Folder structure

```
views
├── about
│   └── index.vue
```

#### Generated routes

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

> it is a single level route, to add layout, the component props combines the layout and view component, split by the dollar sign "$"

#### Transformed Vue routes

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

### Secondary route

#### Folder structure

```
views
├── list
│   ├── home
│   │   └── index.vue
│   ├── detail
│   │   └── index.vue
```

> Please don't have the following index.vue on the same level as the folder, this is not part of the agreed upon rules

**Error example**

```
views
├── list
│   ├── index.vue
│   ├── detail
│   │   └── index.vue
```

#### Generated routes

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
    },
  ]
}
```

> There are two layers of route data for secondary routes, the first layer of route is the layout component and the second layer of route is the page component

#### Transformed Vue routes

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

> the first layer of route data contains the redirection configuration, which by default redirects to the first sub-route

### Multi-level route (level 3 route and above)

#### Folder structure

- The folder hierarchy is deep

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

- Two-tier folder hierarchy (recommended)

```
views
├── multi-menu
│   ├── first_child
│   │   └── index.vue
│   ├── second_child_home
│   │   └── index.vue
```

> The route hierarchy is split by the underscore symbol "\_", which prevents the folder hierarchy from being too deep.

#### Generated routes

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

> if the route level is greater than 2, the generated route data is a recursive structure

#### Transformed Vue routes

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

> the transformed Vue routes only has two levels, the first level is the layout component, and the second level is the redirect routes or the page routes

### Ignore folder aggregation routes

Folder names that begin with an underscore "\_" will be ignored

#### Folder structure

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

#### Generated routes

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

### Parameter Route

#### Folder structure

```
views
├── user
│   └── [id].vue
```

#### Generated routes

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

#### Advanced parameter route

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

### Custom Route

the custom route is only used to generate the route declaration, and the route file is not generated, you should create the route file manually.

#### Config custom routes

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

**Generated CustomRouteKey**

```ts
type RouteMap = {
  root: "/";
  notFound: "/:pathMatch(.*)*";
  "two-level": "/two-level";
  "two-level_route": "/two-level/route";
};

type CustomRouteKey = "root" | "notFound" | "two-level" | "two-level_route";
```

#### Custom routes's component

**it can use existing page components as the route component**

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

## Routing component

### Layout components

- **layout.base**: Layout with common parts, such as global header, sidebar, footer, etc.

- **layout.blank**: Blank layout

### Page components

- **view.[RouteKey]**: Page components
  > For example: `view.home`, `view.multi-menu_first_child`

### Mixed components of layout and page

- **layout.base$view.[RouteKey]**: Mixed components of layout and page
  > For example: `layout.base$view.home`, `layout.base$view.multi-menu_first_child`

::: tip Tip
This type of component represents a single-level route
:::

## Type description

### 1. type RouteKey

**Explanation:**

The union type RouteKey declares all route keys for easy unified management of routes. This type is automatically generated by the plugin [Elegant Router](https://github.com/soybeanjs/elegant-router) based on the page files under views.

::: tip Code location
src/typings/elegant-router.d.ts
:::

### 2. type RoutePath

**Explanation:**

The path of the route, this type corresponds one-to-one with RouteKey

### 3. type RouteMeta

```typescript
// Route meta information interface
interface RouteMeta {
  /**
   * Route title
   *
   * Can be used in the document title
   */
  title: string;
  /**
   * The internationalization key of the route
   *
   * If set, it will be used for i18n, and the title will be ignored at this time
   */
  i18nKey?: App.I18n.I18nKey;
  /**
   * The role list of the route
   *
   * When the current user has at least one role, the route is allowed to be accessed. When the role list is empty, it means no permission is required
   */
  roles?: string[];
  /** Whether to cache this route */
  keepAlive?: boolean;
  /**
   * Whether it is a constant route
   *
   * No login is required, and the route is defined on the front end
   */
  constant?: boolean;
  /**
   * Iconify icon
   *
   * Can be used in the menu or breadcrumbs
   */
  icon?: string;
  /**
   * Local icon
   *
   * Located in the "src/assets/svg-icon" directory, if set, the icon property will be ignored
   */
  localIcon?: string;
  /** Route sorting order */
  order?: number;
  /** The external link of the route */
  href?: string;
  /** Whether to hide this route in the menu */
  hideInMenu?: boolean;
  /**
   * The menu key activated when entering this route
   *
   * This route is not in the menu
   *
   * @example
   *   Suppose the route is "user_detail", if set to "user_list", the "User List" menu item will be activated
   */
  activeMenu?: import('@elegant-router/types').RouteKey;
  /** By default, routes with the same path share a tab. If set to true, multiple tabs are used */
  multiTab?: boolean;
  /** If set, the route will be displayed fixed in the tab, and its value represents the order of the fixed tab */
  fixedIndexInTab?: number;
  /** if set query parameters, it will be automatically carried when entering the route */
  query?: Record<string, string>;
}
```

::: tip Tip
Get the icon value from here: [https://icones.js.org/](https://icones.js.org/)
:::

## Note

If you create a route page in views, call it elsewhere but do not show it in the menu, then you need to set `hideInMenu: true` in meta

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
