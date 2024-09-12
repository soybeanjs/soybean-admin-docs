# 代理

## 概述

项目中通过函数 `createServiceConfig` 创建服务的基础路径和匹配代理的字符串

::: tip 代码位置
@/utils/service.ts
:::

然后在函数 `createViteProxy` 中根据上述获取的配置创建代理

## 开启/关闭

通过 `env` 文件的 `VITE_HTTP_PROXY` 开启或关闭代理

::: tip 代码位置
~.env
:::

在 `@/service/request/index.ts` 里，通过给 `getServiceBaseURL` 的第二个参数传入根据代码运行环境与 `VITE_HTTP_PROXY` 共同判断出的 `isHttpProxy` 来决定该URL是否需要处理代理，您可以在这里通过传入不同的参数解构获取所需的请求URL

```
const isHttpProxy = import.meta.env.DEV && import.meta.env.VITE_HTTP_PROXY === 'Y';
const { baseURL } = getServiceBaseURL(import.meta.env, isHttpProxy);
const { otherBaseURL } = getServiceBaseURL(import.meta.env, false);
```

## 原理

SoybeanAdmin 为了简化配置代理的过程，特意将匹配字符串设定为 `/proxy-default/` (其他请求 `proxy-{key}`)，这样在配置代理时，只需要将请求的地址中的 `/proxy-default/` 替换为实际的请求地址即可，这样就可以实现代理的配置。

```ts
{
  '/proxy-default': {
    target: 'https://default.com',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/proxy-default/, ''),
  },
  '/proxy-demo': {
    target: 'https://demo.com',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/proxy-demo/, ''),
  }
}
```

### 注意

这里介绍2种容易混淆的配置：

1. 假设一个请求的路径为 `https://example.com/api/user`, 大多数会这样配置代理

```ts

{
  '/api': {
    target: 'https://example.com',
    changeOrigin: true,
  }
}

```

> 这时候 `/api` 既是作为匹配字符串，也是作为请求的路径。所以这里没有 `rewrite` 的配置，因为请求的路径和匹配字符串是一样的。

2. 假设一个请求的路径为 `https://example.com/user`, 但是配置代理时，匹配字符串为 `/api`

```ts

{
  '/api': {
    target: 'https://example.com',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api/, ''),
  }
}

```

> 这时候 `/api` 是作为匹配字符串，`user` 是作为请求的路径。所以这里需要配置 `rewrite`，将匹配字符串去掉。

在 SoybeanAdmin 中，使用的是第二种包含`rewrite`配置，因为为了支持多个服务的代理，同时避免多个服务包含相同的`/api`路径，所以SoybeanAdmin 选择创建了类似 `/proxy-*` 作为匹配字符串和请求的路径分开。避免冲突。
