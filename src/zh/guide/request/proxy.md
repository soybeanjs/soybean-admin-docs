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

默认请求的代理匹配字符串为 `/proxy-default/`，假如请求的地址为 `https://api.example.com/v1/user`，则得到的本地代理的地址为 `http://localhost:3000/proxy-default/v1/user`，当该请求发送时，通过 `/proxy-default/` 匹配到代理配置，将请求转发到 `https://api.example.com/v1/user`。
