# 系统路由

本系统的路由基于插件 [Elegant Router](https://github.com/soybeanjs/elegant-router)，详细用法请查看插件文档。

## 自动生成

启动项目后，插件会自动生成 src/router/elegant 目录，该目录下的文件为自动生成的路由导入、路由定义和路由转换的文件


## 配置属性

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
  /** 路由查询参数，如果设置的话，点击菜单进入该路由时会自动携带的query参数 */
  query?: Record<string, string>;
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
