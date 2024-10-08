# Router Push

::: tip
This document was generated by machine translation. If there are any errors, please inform us
:::

In the project, you can use normal `router.push` and other conventional ways to route jump, you can also use the project provides `useRouterPush` to jump (recommended), this article mainly introduces `useRouterPush`.

## Introduce

This hook encapsulates `router.push` and is intended to be used in place of `router.push` to make jumping easier. `useRouterPush` returns an object containing the following properties and methods:

- routerPush: The push method of the Vue Router.
- routerBack: The back method of the Vue Router.
- routerPushByKey: The method to push based on the route key.
- toLogin: method to jump to the login page.
- toggleLoginModule: Method to toggle the login module.
- redirectFromLogin: method to redirect from login page.

::: warning
Pass `false` to `useRouterPush` when used outside of `setup`.
:::

## explanation

`routerPush` and `routerBack` are all original attributes, so I won't go into them again, but I'll focus on the latter ones here.

### routerPushByKey

The `key` here refers to the `name` attribute of the route, e.g. a route configured as:

```json
{
  "name": "soybean",
  "path": "/soybean-page",
  "component": "layout.base$view.soybean-page"
}
```

Then the code to jump to that route is:

```ts
import { useRouterPush } from '@/hooks/common/router';

const { routerPushByKey } = useRouterPush();

routerPushByKey('soybean');
```

It supports passing optional parameters `query` or `params`.

### toLogin

Literally, quickly jump to the login page, note that before jumping to clear the login information, otherwise in the route guard will be intercepted back to the home page of the same.

### toggleLoginModule

The method passes in parameters of type is:

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

The function is to change the login module mounted on the login page based on the `LoginModule` passed in, you can remove or extend it yourself, just make sure it's of the right type.

### redirectFromLogin

In the case of a successful login, it's better to see the name than to manually `push` it to the homepage.
It will decide which route to redirect to based on the `redirect` query parameter of the login page, if there is no `redirect` parameter, it will jump to the home page by default.

## Use

```vue
<!-- xx.vue -->
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
<!-- xx.ts -->
import { useRouterPush } from '@/hooks/common/router';

// Note that passing in false
const { routerPushByKey } = useRouterPush(false);

function backToRoot() {
  routerPushByKey('root')
}
```
