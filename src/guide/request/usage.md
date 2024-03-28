# use

## Get the base path of the request

```ts
const isHttpProxy = import.meta.env.DEV && import.meta.env.VITE_HTTP_PROXY === 'Y';

const { baseURL, otherBaseURL } = getServiceBaseURL(import.meta.env, isHttpProxy);
```
> `isHttpProxy` Used to determine if a proxy is being used.`baseURL` indicates the value of `VITE_SERVICE_BASE_URL` in the environment file.`otherBaseURL` is used for other requests, configured via `VITE_OTHER_SERVICE_BASE_URL`.

> The `getServiceBaseURL` method is used to get the base path of the request, and determine if a proxy is used based on the environment variables `import.meta.env` and `isHttpProxy`.

## Import request instance creation function

Request instances can be created with either `createRequest` or `createFlatRequest`.

```ts
import { createFlatRequest, createRequest } from '@sa/axios';
```

See below for examples

## Confirmation of Paradigm Parameters for the Create Request Instance Function

- Data type of the request result: `App.Service.Response` The default request uses this type, please modify it according to your own back-end return data type
  > This is because the different types affect the parameter types of the `isBackendSuccess` and `transformBackendResponse` fields in `RequestOption`, as well as the error message fields.

  > Please define new type declarations for other request instances.

- The state type of the request instance: `InstanceState`，Used to store some state of the request instance, e.g. whether the token is being refreshed, whether there is an error pop-up window display, etc. Define the state type according to your business needs.

## Creating a Request Instance `request`

Typical example

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
  /** Whether there is a request being executed to refresh the token */
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

      // Add `token` to request header
      const token = localStg.get('token');
      const Authorization = token ? `Bearer ${token}` : null;
      Object.assign(headers, { Authorization });

      return config;
    },
    isBackendSuccess(response) {
      // When the code returned by the backend is "0000" (default), it means the request is successful.
      // If you need to change this logic, you can change the `VITE_SERVICE_SUCCESS_CODE` in the `.env` file.
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

      // When the code returned by the backend is in `logoutCodes`, it means that the user needs to log out.
      const logoutCodes = import.meta.env.VITE_SERVICE_LOGOUT_CODES?.split(',') || [];
      if (logoutCodes.includes(response.data.code)) {
        handleLogout();
        return null;
      }

      // When the code returned by the backend is in `modalLogoutCodes`, it means that the user needs to log out, which is reminded by a popup window.
      const modalLogoutCodes = import.meta.env.VITE_SERVICE_MODAL_LOGOUT_CODES?.split(',') || [];
      if (modalLogoutCodes.includes(response.data.code)) {
        // Prevent users from refreshing the page
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

      // When the code returned by the backend is in `expiredTokenCodes`, the token is expired and needs to be refreshed.
      // The `refreshToken` interface can't return error codes in `expiredTokenCodes`, otherwise it will die, it should return `logoutCodes` or `modalLogoutCodes`.
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
      // When a request fails, the logic to display an error message can be handled here

      let message = error.message;
      let backendErrorCode = '';

      // Get the error message and error code returned by the backend
      if (error.code === BACKEND_ERROR_CODE) {
        message = error.response?.data?.msg || message;
        backendErrorCode = error.response?.data?.code || '';
      }

      // Error messages are displayed in a pop-up window
      const modalLogoutCodes = import.meta.env.VITE_SERVICE_MODAL_LOGOUT_CODES?.split(',') || [];
      if (modalLogoutCodes.includes(backendErrorCode)) {
        return;
      }

      // When the token expires, refresh the token and retry the request, so there's no need for an error message.
      const expiredTokenCodes = import.meta.env.VITE_SERVICE_EXPIRED_TOKEN_CODES?.split(',') || [];
      if (expiredTokenCodes.includes(backendErrorCode)) {
        return;
      }

      window.$message?.error?.(message);
    }
  }
);
```

## Example of using a request

```ts
/**
 * Login
 *
 * @param loginRes Login parameters
 */
export function fetchLogin(loginRes: Api.Auth.LoginReq) {
  return request<Api.Auth.LoginToken>({
    url: '/auth/accounts/login',
    method: 'post',
    data: loginRes
  });
}
```

You need to define the type of data that will be used after a successful request, e.g. `Api.Auth.LoginToken`, and pass it into the `request` function.

- If the request function was created with `createFlatRequest`, the data type of a successful request is wrapped in an object that can be retrieved from the `data` field.

```ts

async function login() {
  const { error, data } = await fetchLogin({ username: 'admin', password: 'admin' });

  if(!error) {
    // Request successful
  }
}

```
- If the request function was created with `createRequest`, the data type of a successful request is returned directly and is not wrapped in an object.

```ts
async function login() {
  const data = await fetchLogin({ username: 'admin', password: 'admin' });

  if(data) {
    // Request successful
  }
}
```
