# 路由权限

## 指引

### 固定路由(无需权限即可进入的路由)

在静态路由模式下，路由权限是通过 `meta.constant` 来控制的, `constant` 为 `true` 的路由无需登录即可访问；
<br>
而在动态路由模式下，无需登录即可访问的路由需要在 `fetchGetConstantRoutes` 接口中返回，也就是说，在 `fetchGetUserRoutes` 中返回`constant` 为 `true` 的路由是不会生效的，仍需登录才能访问；

### 权限路由

在静态路由模式下默认的路由都需要登录才能访问，需要配置权限可以添加 `meta.roles` 字段，该字段类型为 `string[]` ，在 `UserInfo` 中配置，若能匹配到该角色则允许进入，否则不允许进入，匹配发生在前置路由守卫阶段；
<br>
在动态路由模式下仍可沿用 `meta.roles` ，但是一般可直接让后端根据角色权限控制路由表的返回，不返回无权的路由即可；

## 动态路由

修改路由的来源，静态路由的路由表来源于 `./src/router/elegant/routes.ts` ，动态路由的路由表来源于 `fetchGetConstantRoutes` 与 `fetchGetUserRoutes` 接口。

> [!WARNING] 注意
> 接口返回的路由表的类型必须与前端静态的路由表类型一致，在尝试修改前建议先熟悉本项目的特色路由插件与路由表结构

### 开启/关闭

通过在 `env` 文件中配置 `VITE_AUTH_ROUTE_MODE` 变量来开启/关闭动态路由模式。

::: tip 代码位置
.env
:::

```dotenv:line-numbers=14
# auth route mode: static ｜ dynamic
VITE_AUTH_ROUTE_MODE=dynamic
```
