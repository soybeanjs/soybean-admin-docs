# System Request

## Request Configuration

### Multiple Request Environments

Development projects often use multiple request environment addresses: such as the backend address for the user development environment, the backend address for the test environment, the backend address for the pre-production environment, and the address for the production environment, etc.

Add different request environment addresses in the `env-config.ts` file.

### Create Request Function

Create request functions in src/service/request/index.ts.

1. **Choose to create request function: createRequest and createFlatRequest**

`createRequest`: The returned request instance directly returns Axios response data (convertible).

`createFlatRequest`: The returned request instance will wrap the response data and error information in a flat object, returning the result in a unified format.


2. **createRequest/createFlatRequest Parameters**

`axiosConfig`: axios configuration, input baseUrl, define some other configurations: such as: request timeout, request header, etc.

`options`: Configure input verification and other logic (see `RequestOption` below).

```ts
interface RequestOption<ResponseData = any> {
  /**
   * Execute before sending the request to modify the request configuration, for example: add request header token
   */
  onRequest: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>;
  /**
   * Determine whether the backend response is successful by comparing the code returned by the backend
   */
  isBackendSuccess: (response: AxiosResponse<ResponseData>) => boolean;
  /**
   * The asynchronous function called when the backend request indicates failure in business, for example: handle token expiration
   */
  onBackendFail: (
    response: AxiosResponse<ResponseData>,
    instance: AxiosInstance
  ) => Promise<AxiosResponse> | Promise<void>;
  /**
   * When responseType is json, convert the backend response data
   */
  transformBackendResponse(response: AxiosResponse<ResponseData>): any | Promise<any>;
  /**
   * The function called when the request fails (including request failure and backend business failure request), for example: handle error information
   */
  onError: (error: AxiosError<ResponseData>) => void | Promise<void>;
}
```

3. **Export the created request function, and import the created request function in the file under the api folder**

For example:

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

4. **When calling the request function, you need to pass in a generic, which represents the type of data after the interface request is successful**

For example:

```typescript
/**
 * Login
 *
 * @param loginRes Login parameters
 */
export function fetchLogin(loginRes: Api.Auth.UserLogin) {
  return request({
    url: '/auth/accounts/login',
    method: 'post',
    data: loginRes
  });
}
```
