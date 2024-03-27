# 系统请求

## 请求配置

### 多个请求环境

开发项目经常会用到多个请求环境地址：如用户开发环境的后台地址、用于测试环境的后台地址、用于预生产环境的后台地址和用于生产环境的地址等

在 `env-config.ts` 文件里面添加不同的请求环境地址

### 创建请求函数

在 src/service/request/index.ts 里面创建请求函数

1. **选择创建请求函数：createRequest 和 createFlatRequest**

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

3. **导出创建的请求函数，在 api 文件夹下的文件里引入创建好的请求函数**

例如：

```typescript
import { BACKEND_ERROR_CODE, NO_PERMISSION, createFlatRequest } from '@sa/axios';
import { localStg } from '@/utils/storage';
import { createProxyPattern, createServiceConfig } from '~/env.config';

const { baseURL, otherBaseURL } = createServiceConfig(import.meta.env);

const isHttpProxy = import.meta.env.VITE_HTTP_PROXY === 'Y';

export const request = createFlatRequest<App.Service.Response>(
  {
    baseURL: isHttpProxy ? createProxyPattern() : baseURL,
    headers: {
      apifoxToken: 'XL299LiMEDZ0H5h3A29PxwQXdMJqWyY2'
    }
  },
  {
    async onRequest(config) {
      const { headers } = config;

      const token = localStg.get('token');
      const Authorization = token ? `Bearer ${token}` : null;
      Object.assign(headers, { Authorization });

      return config;
    },
    isBackendSuccess(response) {
      return response.data.code === '0000';
    },
    async onBackendFail(_response) {
    },
    transformBackendResponse(response) {
      return response.data.data;
    },
    onError(error) {
      let message = error.message;

      if (error.code === BACKEND_ERROR_CODE) {
        message = error.response?.data?.msg || message;
      }

      window.$message?.error(message);
    }
  }
);
```

4. **调用请求函数时，需要传入一个范型，表示该接口请求成功后的数据的类型**

例如：

```typescript
/**
 * 登录
 *
 * @param loginRes 登录参数
 */
export function fetchLogin(loginRes: Api.Auth.UserLogin) {
  return request({
    url: '/auth/accounts/login',
    method: 'post',
    data: loginRes
  });
}
```
