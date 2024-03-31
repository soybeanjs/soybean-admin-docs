# Request

## Multiple Request Environments

Development projects often use multiple request environment addresses: such as the backend address for the user development environment, the backend address for the test environment, the backend address for the pre-production environment, and the address for the production environment, etc.

Configure multiple request addresses in the environment file, and then determine which request address to use in the request function based on the environment variable.

The current project's environment files are

`.env.prod`, `.env.test`

## Introduction to Request Related Configuration

Configuration items in the `.env` file

- `VITE_SERVICE_SUCCESS_CODE`: The code for successful backend requests
- `VITE_SERVICE_LOGOUT_CODES`: The code for backend request failures that require the user to log out, multiple codes are separated by `,`
- `VITE_SERVICE_MODAL_LOGOUT_CODES`: The code for backend request failures that require the user to log out (reminded by popup), multiple codes are separated by `,`
- `VITE_SERVICE_EXPIRED_TOKEN_CODES`: The code for backend request failures and refresh token, multiple codes are separated by `,`

Configuration items in the `.env.test` or `.env.prod` file

- `VITE_SERVICE_BASE_URL`: The base address for requests
- `VITE_OTHER_SERVICE_BASE_URL`: The base address for other requests

### Introduction to Request Functions

1. **Request functions: createRequest and createFlatRequest**

`createRequest`: The returned request instance directly returns Axios response data (convertible)

`createFlatRequest`: The returned request instance will wrap the response data and error information in a flat object, and return the result in a unified format.


2. **Parameters for createRequest/createFlatRequest**

`axiosConfig`: axios configuration, input baseUrl, define some other configurations: such as: request timeout, request header, etc.

`options`: Configure input validation and other logic (see `RequestOption` below)


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
