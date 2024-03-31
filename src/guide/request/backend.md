# Backend Integration

## Confirm the data structure type of the backend return result

The default is as follows:

`App.Service.Response`:

```ts
type Response<T = unknown> = {
  /** Business status code */
  code: string;
  /** Response message */
  msg: string;
  /** Response data */
  data: T;
};
```

> Please modify according to the data type returned by your own backend

## Configure the success code of backend request

Change the configuration `VITE_SERVICE_SUCCESS_CODE` in `.env`

> The configuration loaded by the environment file is of string type. If the code returned by the backend is of numeric type, it needs to be converted to the same type for comparison.

## Configure other codes related to backend requests

Refer to the [configuration items](./intro.md#request-related-configuration-introduction) in the request introduction
