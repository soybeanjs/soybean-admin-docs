# 使用

## 获取请求的基础路径

```ts
const isHttpProxy = import.meta.env.DEV && import.meta.env.VITE_HTTP_PROXY === 'Y';

const { baseURL, otherBaseURL } = getServiceBaseURL(import.meta.env, isHttpProxy);
```
> `isHttpProxy` 用于判断是否使用代理，`baseURL` 表示环境文件中 `VITE_SERVICE_BASE_URL` 的值，`otherBaseURL` 用于其他请求，通过 `VITE_OTHER_SERVICE_BASE_URL` 配置。

> `getServiceBaseURL` 方法用于获取请求的基础路径，根据环境变量 `import.meta.env` 和 `isHttpProxy` 判断是否使用代理。

## 导入请求实例创建函数

可以选择 `createRequest` 或者 `createFlatRequest` 创建请求实例。

```ts
import { createFlatRequest, createRequest } from '@sa/axios';
```

具体见下方的案例

## 确认创建请求实例函数的范型参数

- 请求结果的数据类型: `App.Service.Response`，默认请求用该类型，请根据自己的后端返回数据类型进行修改
  > 因为不同的类型会影响到 `RequestOption` 中的 `isBackendSuccess` 和 `transformBackendResponse` 以及错误信息的字段的参数类型

  > 其他请求实例的数据类型请自行再定义新的类型声明

- 请求实例的状态类型: `InstanceState`，用于存储请求实例的一些状态，例如：表示是否正在刷新 token, 是否有错误弹窗展示等，根据自己的业务需求自行定义状态类型

## 创建请求实例 `request`

示例

```ts
import type { AxiosResponse } from 'axios';
import { BACKEND_ERROR_CODE, createFlatRequest, createRequest } from '@sa/axios';
import { useAuthStore } from '@/store/modules/auth';
import { localStg } from '@/utils/storage';
import { getServiceBaseURL } from '@/utils/service';
import { $t } from '@/locales';
import { handleRefreshToken } from './shared';

const isHttpProxy = import.meta.env.DEV && import.meta.env.VITE_HTTP_PROXY === 'Y';
const { baseURL, otherBaseURL } = getServiceBaseURL(import.meta.env, isHttpProxy);

interface InstanceState {
  /** 是否有请求正在执行刷新token */
  isRefreshingToken: boolean;
}

export const request = createFlatRequest<App.Service.Response, InstanceState>(
  {
    baseURL,
    headers: {
      apifoxToken: 'XL299LiMEDZ0H5h3A29PxwQXdMJqWyY2'
    }
  },
  {
    async onRequest(config) {
      const { headers } = config;

      // 添加 token 到请求头
      const token = localStg.get('token');
      const Authorization = token ? `Bearer ${token}` : null;
      Object.assign(headers, { Authorization });

      return config;
    },
    isBackendSuccess(response) {
      // 当后端返回的 code 为 "0000"(默认) 时，表示请求成功
      // 如果需要修改这个逻辑，可以在 `.env` 文件中修改 `VITE_SERVICE_SUCCESS_CODE`
      return response.data.code === import.meta.env.VITE_SERVICE_SUCCESS_CODE;
    },
    async onBackendFail(response, instance) {
      const authStore = useAuthStore();

      function handleLogout() {
        authStore.resetStore();
      }

      function logoutAndCleanup() {
        handleLogout();
        window.removeEventListener('beforeunload', handleLogout);
      }

      // 当后端返回的 code 在 `logoutCodes` 中时，表示用户需要退出登录
      const logoutCodes = import.meta.env.VITE_SERVICE_LOGOUT_CODES?.split(',') || [];
      if (logoutCodes.includes(response.data.code)) {
        handleLogout();
        return null;
      }

      // 当后端返回的 code 在 `modalLogoutCodes` 中时，表示用户需要退出登录，通过弹窗形式提醒
      const modalLogoutCodes = import.meta.env.VITE_SERVICE_MODAL_LOGOUT_CODES?.split(',') || [];
      if (modalLogoutCodes.includes(response.data.code)) {
        // 防止用户刷新页面
        window.addEventListener('beforeunload', handleLogout);

        window.$dialog?.error({
          title: 'Error',
          content: response.data.msg,
          positiveText: $t('common.confirm'),
          maskClosable: false,
          onPositiveClick() {
            logoutAndCleanup();
          },
          onClose() {
            logoutAndCleanup();
          }
        });

        return null;
      }

      // 当后端返回的 code 在 `expiredTokenCodes` 中时，表示 token 过期，需要刷新 token
      // `refreshToken` 接口不能返回 `expiredTokenCodes` 中的错误码，否则会死循环，应该返回 `logoutCodes` 或 `modalLogoutCodes`
      const expiredTokenCodes = import.meta.env.VITE_SERVICE_EXPIRED_TOKEN_CODES?.split(',') || [];
      if (expiredTokenCodes.includes(response.data.code) && !request.state.isRefreshingToken) {
        request.state.isRefreshingToken = true;

        const refreshConfig = await handleRefreshToken(response.config);

        request.state.isRefreshingToken = false;

        if (refreshConfig) {
          return instance.request(refreshConfig) as Promise<AxiosResponse>;
        }
      }

      return null;
    },
    transformBackendResponse(response) {
      return response.data.data;
    },
    onError(error) {
      // 当请求失败时，可以在这里处理显示错误信息的逻辑

      let message = error.message;
      let backendErrorCode = '';

      // 获取后端返回的错误信息和错误码
      if (error.code === BACKEND_ERROR_CODE) {
        message = error.response?.data?.msg || message;
        backendErrorCode = error.response?.data?.code || '';
      }

      // 错误信息通过弹窗形式显示
      const modalLogoutCodes = import.meta.env.VITE_SERVICE_MODAL_LOGOUT_CODES?.split(',') || [];
      if (modalLogoutCodes.includes(backendErrorCode)) {
        return;
      }

      // 当 token 过期时，刷新 token 并重试请求，所以不需要显示错误信息
      const expiredTokenCodes = import.meta.env.VITE_SERVICE_EXPIRED_TOKEN_CODES?.split(',') || [];
      if (expiredTokenCodes.includes(backendErrorCode)) {
        return;
      }

      window.$message?.error?.(message);
    }
  }
);
```

## 使用请求实例

```ts
/**
 * 登录
 *
 * @param loginRes 登录参数
 */
export function fetchLogin(loginRes: Api.Auth.LoginReq) {
  return request<Api.Auth.LoginToken>({
    url: '/auth/accounts/login',
    method: 'post',
    data: loginRes
  });
}
```

需要定义请求成功后的数据类型，例如：`Api.Auth.LoginToken`，并传入 `request` 函数中。

- 如果 request 函数是通过 `createFlatRequest` 创建的，请求成功后的数据类型会被包装在一个对象中，可以通过 `data` 字段获取。

```ts

async function login() {
  const { error, data } = await fetchLogin({ username: 'admin', password: 'admin' });

  if(!error) {
    // 请求成功
  }
}

```
- 如果 request 函数是通过 `createRequest` 创建的，请求成功后的数据类型会直接返回，不会被包装在对象中。

```ts
async function login() {
  const data = await fetchLogin({ username: 'admin', password: 'admin' });

  if(data) {
    // 请求成功
  }
}
```
