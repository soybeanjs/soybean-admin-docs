# 代理

## 概述

项目中通过函数 `createServiceConfig` 创建服务的基础路径和匹配代理的字符串

::: tip 代码位置
@/utils/service.ts
:::

然后在函数 `createViteProxy` 中根据上述获取的配置创建代理

## 原理

默认请求的代理匹配字符串为 `/proxy-default/`，假如请求的地址为 `https://api.example.com/v1/user`，则得到的本地代理的地址为 `http://localhost:3000/proxy-default/v1/user`，当该请求发送时，通过 `/proxy-default/` 匹配到代理配置，将请求转发到 `https://api.example.com/v1/user`。
