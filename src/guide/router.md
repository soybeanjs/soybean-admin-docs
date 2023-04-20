# 系统路由方案

## 说明

### 1. type RouteKey

**解释：**

联合类型 RouteKey 声明所有的路由 key，方便统一管理路由， 该类型由插件@soybeanjs/vite-plugin-vue-page-route 根据 views 下面的页面文件自动生成

::: tip 代码位置
./src/typings/page-route.d.ts
:::

### 2. type RoutePath

**解释：**

路由的路径 path，该类型会根据定义好的 RouteKey 推断出来

### 3. type RouteMeta

```typescript
/** 路由描述 */
interface RouteMeta {
	/** 路由标题(可用来作document.title或者菜单的名称) */
	title: string;
	/** 路由的动态路径(需要动态路径的页面需要将path添加进范型参数) */
	dynamicPath?: AuthRouteUtils.GetDynamicPath<"/login">;
	/** 作为单级路由的父级路由布局组件 */
	singleLayout?: Extract<RouteComponentType, "basic" | "blank">;
	/** 需要登录权限 */
	requiresAuth?: boolean;
	/**
	 * 哪些类型的用户有权限才能访问的路由(空的话则表示不需要权限)
	 * @description 后端动态路由数据不需要该属性，直接由后端根据用户角色返回对应权限的路由数据
	 */
	permissions?: Auth.RoleType[];
	/** 缓存页面 */
	keepAlive?: boolean;
	/** 菜单和面包屑对应的图标 */
	icon?: string;
	/** 使用本地svg作为的菜单和面包屑对应的图标(assets/svg-icon文件夹的的svg文件名) */
	localIcon?: string;
	/** 是否在菜单中隐藏(一些列表、表格的详情页面需要通过参数跳转，所以不能显示在菜单中) */
	hide?: boolean;
	/** 外链链接 */
	href?: string;
	/** 是否支持多个tab页签(默认一个，即相同name的路由会被替换) */
	multiTab?: boolean;
	/** 路由顺序，可用于菜单的排序 */
	order?: number;
	/** 当前路由需要选中的菜单项(用于跳转至不在左侧菜单显示的路由且需要高亮某个菜单的情况) */
	activeMenu?: RouteKey;
	/** 表示是否是多级路由的中间级路由(用于转换路由数据时筛选多级路由的标识，定义路由时不用填写) */
	multi?: boolean;
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
- **multi** - 多级路由布局(三级路由或三级以上时，除第一级路由和最后一级路由，其余的采用该布局)
- **self** - 作为子路由，使用自身的布局(作为最后一级路由，没有子路由)

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
const about = {
	name: "about",
	path: "/about",
	component: "self",
	meta: {
		title: "关于",
		requiresAuth: true,
		singleLayout: "basic",
		permissions: ["super", "admin", "test"],
		icon: "fluent:book-information-24-regular",
		order: 7,
	},
};
```

#### (2)二级路由

```typescript
const dashboard = {
	name: "dashboard",
	path: "/dashboard",
	component: "basic",
	children: [
		{
			name: "dashboard_analysis",
			path: "/dashboard/analysis",
			component: "self",
			meta: {
				title: "分析页",
				requiresAuth: true,
			},
		},
		{
			name: "dashboard_workbench",
			path: "/dashboard/workbench",
			component: "self",
			meta: {
				title: "工作台",
				requiresAuth: true,
				permissions: ["super", "admin"],
			},
		},
	],
	meta: {
		title: "仪表盘",
		icon: "carbon:dashboard",
		order: 1,
	},
};
```

#### (3)三级及三级以上路由

```typescript
const multiMenu = {
	name: "multi-menu",
	path: "/multi-menu",
	component: "basic",
	children: [
		{
			name: "multi-menu_first",
			path: "/multi-menu/first",
			component: "multi",
			children: [
				{
					name: "multi-menu_first_second",
					path: "/multi-menu/first/second",
					component: "self",
					meta: {
						title: "二级菜单",
						requiresAuth: true,
					},
				},
				{
					name: "multi-menu_first_second-new",
					path: "/multi-menu/first/second-new",
					component: "multi",
					children: [
						{
							name: "multi-menu_first_second-new_third",
							path: "/multi-menu/first/second-new/third",
							component: "self",
							meta: {
								title: "三级菜单",
								requiresAuth: true,
							},
						},
					],
					meta: {
						title: "二级菜单(有子菜单)",
					},
				},
			],
			meta: {
				title: "一级菜单",
			},
		},
	],
	meta: {
		title: "多级菜单",
		icon: "carbon:menu",
		order: 6,
	},
};
```

### 3.前端路由 modules 添加

路由数据等同于上面的 mock 数据

::: info
后期等插件实现了根据文件自动生成 modules 数据，即可省略该步骤
:::
