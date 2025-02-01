# ルート構造

## 第1レベルルート（単一レベルルート）

### フォルダ構造

```
views
├── about
│   └── index.vue
```

### 生成されるルート

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

### Vueルートへの変換

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

## 第2レベルルート

### フォルダ構造

```
views
├── list
│   ├── home
│   │   └── index.vue
│   ├── detail
│   │   └── index.vue
```

**誤った例**

```
views
├── list
│   ├── index.vue
│   ├── detail
│   │   └── index.vue
```

> 请不要出现上述 index.vue 和文件夹同级的情况，这种情况不在约定的规则中

### 生成されるルート

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

> 第2レベルルートのルートデータも2層になっており、最初のレイヤーはレイアウトコンポーネント、2番目のレイヤーはページコンポーネントです。

### Vueルートへの変換

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

> ルートデータの第1層にはリダイレクトの設定が含まれ、デフォルトで最初の子ルートにリダイレクトされます。

## 多階層ルート（第3レベル以上）

### 文件夹结构

- フォルダ階層が深い

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

- 2階層のフォルダ構造（推奨）

```
views
├── multi-menu
│   ├── first_child
│   │   └── index.vue
│   ├── second_child_home
│   │   └── index.vue
```

> アンダースコア `_` を使用してルート階層を区切ることで、フォルダ階層が深くなりすぎるのを防ぎます。

### 生成されるルート

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

> ルート階層が2を超える場合、生成されるルートデータは再帰的な構造になります。

### Vueルートへの変換

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

> 変換後の Vue ルートは2層のみで、最初のレイヤーはレイアウトコンポーネント、2番目のレイヤーはリダイレクトルートまたはページルートです。

## 無視されるフォルダの集約ルート

アンダースコア `_` で始まるフォルダ名は無視され、ルートには表示されず、そのフォルダ内のファイルは上位のルートに集約されます。

### フォルダ構造

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

### 生成されるルート

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

## パラメータルート

### フォルダ構造

```
views
├── user
│   └── [id].vue
```

### 生成されるルート

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

### 高度なパラメータルート

```ts
import type { RouteKey } from '@elegant-router/types';

ElegantVueRouter({
  routePathTransformer(routeName, routePath) {
    const routeKey = routeName as RouteKey;

    if (routeKey === 'user') {
      return '/user/:id(\\d+)';
    }

    return routePath;
  }
});
```

## カスタムルート

自定义路由只用于生成路由的类型声明，不会生成路由数据，需要手动创建路由数据

### カスタムルート設定

```ts
ElegantVueRouter({
  customRoutes: {
    map: {
      root: '/',
      notFound: '/:pathMatch(.*)*'
    },
    names: ['two-level_route']
  }
});
```

**生成されるルートキー**

```ts
type RouteMap = {
  root: '/';
  notFound: '/:pathMatch(.*)*';
  'two-level': '/two-level';
  'two-level_route': '/two-level/route';
};

type CustomRouteKey = 'root' | 'notFound' | 'two-level' | 'two-level_route';
```

### カスタムルートのコンポーネント

**既存のページルートコンポーネントを再利用**

```ts
import type { CustomRoute } from '@elegant-router/types';

const customRoutes: CustomRoute[] = [
  {
    name: 'root',
    path: '/',
    redirect: {
      name: '403'
    }
  },
  {
    name: 'not-found',
    path: '/:pathMatch(.*)*',
    component: 'layout.base$view.404'
  },
  {
    name: 'two-level',
    path: '/two-level',
    component: 'layout.base',
    children: [
      {
        name: 'two-level_route',
        path: '/two-level/route',
        component: 'view.about'
      }
    ]
  }
];
```
