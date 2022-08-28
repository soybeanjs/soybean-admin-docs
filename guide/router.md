# 路由

## 说明

### 1. type RouteKey

**解释：**

联合类型 RouteKey 声明所有的路由 key，方便统一管理路由

**位置：**

```bash
src/typings/route.d.ts
```

**写法：**

- 小写加连字符表示一个层级的路由

```text
| 'login'
| 'not-found'
```

- 多层级的路由通过下划线隔开

```text
| 'document'
| 'document_vue'
| 'document_vite'
| 'document_naive'
| 'multi-menu'
| 'multi-menu_first'
| 'multi-menu_first_second'
```

### 2. type RoutePath

**解释：**

路由的路径 path，该类型会根据定义好的 RouteKey 推断出来

### 3. type RouteMeta

  ```typescript
		/** 路由描述 */
  	type RouteMeta = {
    	/** 路由标题(可用来作document.title或者菜单的名称) */
    	title: string;
    	/** 路由的动态路径 */
    	dynamicPath?: PathToDynamicPath<'/login'>;
    	/** 作为单级路由的父级路由布局组件 */
    	singleLayout?: Extract<RouteComponent, 'basic' | 'blank'>;
    	/** 需要登录权限 */
    	requiresAuth?: boolean;
    	/**
    	 * 哪些类型的用户有权限才能访问的路由(空的话则表示不需要权限)
    	 * @description 后端动态路由数据不需要该属性，直接由后端根据用户角色返回对应权限的路由数据
    	 */
    	permissions?: Auth.RoleType[];
    	/** 缓存页面(开启缓存只需要对最后一级的路由添加该属性) */
    	keepAlive?: boolean;
    	/** 菜单和面包屑对应的图标 */
    	icon?: string;
    	/** 是否在菜单中隐藏 */
    	hide?: boolean;
    	/** 外链链接 */
    	href?: string;
    	/** 路由顺序，可用于菜单的排序 */
    	order?: number;
    	/** 表示是否是多级路由的中间级路由(用于转换路由数据时筛选多级路由的标识，定义路由时不用填写) */
    	multi?: boolean;
 		};
  ```

::: info 提示

icon 图标值从这里获取：[https://icones.js.org/](https://icones.js.org/)

:::

## 路由布局

### 1. 布局组件

<br />

#### BasicLayout：

具有公共部分的布局，如全局头部、侧边栏、底部等

#### BlankLayout：

空白布局

### 2. 路由组件

- **basic** - 基础布局，具有公共部分的布局
- **blank** - 空白布局
- **multi** - 多级路由布局(三级路由或三级以上时，除第一级路由和最后一级路由，其余的采用该布局)
- **self** - 作为子路由，使用自身的布局(作为最后一级路由，没有子路由)

## 路由声明

### 1. 创建页面文件

<br />

#### (1) 单级路由

例如：

```text
views
├── about
│   └── index.vue

```

#### (2) 二级路由

例如：

```text
views
├── dashboard
│   ├── analysis
│   │   └── index.vue
│   ├── workbench
│   │   └── index.vue


```

#### (3) 三级及三级以上路由

例如：

```text
views
├── multi-menu
│   ├── first
│   │   ├── second
│   │   │   └── index.vue
│   │   └── second-new
│   │       └── third
│   │           └── index.vue

```

### 2. 添加路由 key

在**RouteKey**类型中添加新增的页面的路由 key（src/typings/route.d.ts）

::: warning 注意

RouteKey 必须和 views 下面的文件夹名称一一对应，否则无法加载到对应的 vue 文件

:::

示例：

```typescript
type RouteKey =
| 'about' // 一级路由
| 'dashboard' // 二级路由
| 'dashboard_analysis'
| 'dashboard_workbench'
| 'multi-menu' // 三级及三级以上路由
| 'multi-menu_first'
| 'multi-menu_first_second'
| 'multi-menu_first_second-new'
| 'multi-menu_first_second-new_third'
```

### 3.mock 声明路由

::: tip 提示

对接后端的，后端直接添加同样结构的数据

:::

#### (1)单级路由

```json
{
  "name": "about",
  "path": "/about",
  "component": "self",
  "meta": {
	  "title": "关于",
	  "requiresAuth": true,
	  "singleLayout": "basic",
	  "permissions": ["super", "admin", "test"],
	  "icon": "fluent:book-information-24-regular",
	  "order": 7
  }
}
```

#### (2)二级路由

```typescript
const dashboard = {
  name: 'dashboard',
  path: '/dashboard',
  component: 'basic',
  children: [
    {
      name: 'dashboard_analysis',
      path: '/dashboard/analysis',
      component: 'self',
      meta: {
        title: '分析页',
        requiresAuth: true
      }
    },
    {
      name: 'dashboard_workbench',
      path: '/dashboard/workbench',
      component: 'self',
      meta: {
        title: '工作台',
        requiresAuth: true,
        permissions: ['super', 'admin']
      }
    }
  ],
  meta: {
  	title: '仪表盘',
  	icon: 'carbon:dashboard',
    order: 1
  }
}
```

#### (3)三级及三级以上路由

```typescript
const multiMenu = {
  name: 'multi-menu',
  path: '/multi-menu',
  component: 'basic',
  children: [
    {
      name: 'multi-menu_first',
      path: '/multi-menu/first',
      component: 'multi',
      children: [
        {
          name: 'multi-menu_first_second',
          path: '/multi-menu/first/second',
          component: 'self',
          meta: {
            title: '二级菜单',
            requiresAuth: true
          }
        },
        {
          name: 'multi-menu_first_second-new',
          path: '/multi-menu/first/second-new',
          component: 'multi',
          children: [
            {
              name: 'multi-menu_first_second-new_third',
              path: '/multi-menu/first/second-new/third',
              component: 'self',
              meta: {
                title: '三级菜单',
                requiresAuth: true
              }
            }
          ],
          meta: {
            title: '二级菜单(有子菜单)'
          }
        }
      ],
      meta: {
        title: '一级菜单'
      }
    }
  ],
  meta: {
    title: '多级菜单',
    icon: 'carbon:menu',
    order: 6
  }
}
```
