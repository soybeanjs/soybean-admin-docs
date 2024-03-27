# 请求

## 多个请求环境

开发项目经常会用到多个请求环境地址：如用户开发环境的后台地址、用于测试环境的后台地址、用于预生产环境的后台地址和用于生产环境的地址等

在环境文件中配置多个请求地址，然后在请求函数中根据环境变量来判断使用哪个请求地址

目前项目的环境文件有

`.env.prod`, `.env.test`

## 请求相关配置介绍

`.env` 文件中的配置项

- `VITE_SERVICE_SUCCESS_CODE`: 后端请求成功的 code
- `VITE_SERVICE_LOGOUT_CODES`: 后端请求失败并需要用户退出登录的 code，多个 code 用 `,` 分隔
- `VITE_SERVICE_MODAL_LOGOUT_CODES`: 后端请求失败并需要用户退出登录的 code（通过弹窗形式提醒），多个 code 用 `,` 分隔
- `VITE_SERVICE_EXPIRED_TOKEN_CODES`: 后端请求失败并刷新 token 的 code，多个 code 用 `,` 分隔

`.env.test` 或 `.env.prod` 文件中的配置项

- `VITE_SERVICE_BASE_URL`: 请求的基础地址
- `VITE_OTHER_SERVICE_BASE_URL`: 其他请求的基础地址

### 请求函数介绍

1. **请求函数：createRequest 和 createFlatRequest**

`createRequest`: 返回的请求实例直接返回 Axios 响应数据（可转换)

`createFlatRequest`: 返回的请求实例会将响应数据和错误信息包装在一个扁平的对象中，以统一的格式返回结果。


2. **createRequest/createFlatRequest 参数**

`axiosConfig`: axios 配置，传入 baseUrl，定义一些其他配置：如：请求的超时时间、请求头等

`options`: 配置入参校验等逻辑(见下方的`RequestOption`)

```ts
interface RequestOption<ResponseData = any> {
  /**
   * 请求发送之前执行，用来修改请求配置，例如：添加请求头 token
   */
  onRequest: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>;
  /**
   * 判断后端响应是否成功，通过对比后端返回的 code 来判断
   */
  isBackendSuccess: (response: AxiosResponse<ResponseData>) => boolean;
  /**
   * 后端请求在业务上表示失败时调用的异步函数，例如：处理 token 过期
   */
  onBackendFail: (
    response: AxiosResponse<ResponseData>,
    instance: AxiosInstance
  ) => Promise<AxiosResponse> | Promise<void>;
  /**
   * 当 responseType 为 json 时，转换后端响应的数据
   */
  transformBackendResponse(response: AxiosResponse<ResponseData>): any | Promise<any>;
  /**
   * 当请求失败时调用的函数(包括请求失败和后端业务上的失败请求)，例如：处理错误信息
   */
  onError: (error: AxiosError<ResponseData>) => void | Promise<void>;
}
```
