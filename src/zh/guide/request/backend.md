# 对接后端

## 确认后端的返回结果的数据结构类型

默认如下：

`App.Service.Response`:

```ts
type Response<T = unknown> = {
  /** 业务状态码 */
  code: string;
  /** 响应信息 */
  msg: string;
  /** 响应数据 */
  data: T;
};
```


> 请根据自己的后端返回数据类型进行修改

## 配置后端请求成功的 code

更改 `.env` 的配置 `VITE_SERVICE_SUCCESS_CODE`

> 环境文件加载的配置为字符串类型，如果后端返回的 code 为数字类型，对比时需要转换同一类型再比较。

## 配置其他后端请求相关的 code

参考请求介绍中的[配置项](./intro.md#请求相关配置介绍)
