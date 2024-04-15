# 路由跳转

项目内可使用普通的 `router.push` 等常规方式进行路由跳转，亦可使用项目内提供的 `useRouterPush` 进行跳转（推荐），本篇主要介绍 `useRouterPush` 。

## 介绍

该hook对 `router.push` 进行二次封装，主要目的是代替 `router.push` 使用，通过该hook可更便捷得进行跳转， `useRouterPush` 返回一个对象，包含以下属性和方法：
 - routerPush: Vue Router 的 push 方法。
 - routerBack: Vue Router 的 back 方法。
 - routerPushByKey: 根据路由key跳转的方法。
 - toLogin: 跳转到登录页的方法。
 - toggleLoginModule: 切换登录模块的方法。
 - redirectFromLogin: 从登录页重定向的方法。

::: warning 注意
在 `setup` 外使用时需要给 `useRouterPush` 传入 `false`。
:::

## 详细说明

`routerPush` 和 `routerBack` 都是原有属性，就不再赘述了，这里主要介绍一下后面几个。

### routerPushByKey

这里的 `key` 指的是路由的 `name` 属性，例如某个路由的配置为：

```json
{
  "name": "soybean",
  "path": "/soybean-page",
  "component": "layout.base$view.soybean-page"
}
```

则跳转到该路由的代码为：

```ts
import { useRouterPush } from '@/hooks/common/router';

const { routerPushByKey } = useRouterPush();

routerPushByKey('soybean')
```

它支持传入可选参数 `query` 或是 `params`。

### toLogin

字面意思，快速跳转到登录页，注意跳转前要清除登录信息，否则在路由守卫一样会被拦截回首页的。


### toggleLoginModule

该方法传入参数类型为

```ts
/**
   * The login module
   *
   * - pwd-login: password login
   * - code-login: phone code login
   * - register: register
   * - reset-pwd: reset password
   * - bind-wechat: bind wechat
   */
  type LoginModule = 'pwd-login' | 'code-login' | 'register' | 'reset-pwd' | 'bind-wechat';
```

作用是根据传入的 `LoginModule` 改变登录页挂载的登录功能模块，您可以自行删除或是扩展更多的模块，只需要确保类型是正确的就可以了。

### redirectFromLogin

在登录成功选用，相比手动push到首页，它更见名知意。
它会根据登录页的 `redirect` 查询参数来决定重定向到哪个路由，如果没有 `redirect` 参数，则默认跳转到首页。

## 使用

```vue
<!-- 某个.vue文件 -->
<script lang="ts" setup>
import { useRouterPush } from '@/hooks/common/router';

const { routerPushByKey } = useRouterPush();
</script>

<template>
  <div>
    <NButton type="primary" @click="routerPushByKey('root')">返回首页</NButton>
  </div>
</template>
```

```ts
<!-- 某个.ts文件 -->
import { useRouterPush } from '@/hooks/common/router';

// 注意传入false
const { routerPushByKey } = useRouterPush(false);

function backToRoot() {
  routerPushByKey('root')
}
```
