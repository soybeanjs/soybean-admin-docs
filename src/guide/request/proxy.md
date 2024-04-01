# Proxy

## Outlined

The project creates the base path of the service and a string to match the proxy through the `createServiceConfig` function.

::: tip Code Location
@/utils/service.ts
:::

The proxy is then created in the `createViteProxy` function based on the configuration obtained above.

## Enable/disable

Enable or disable proxies via `VITE_HTTP_PROXY` in the `env` file.

::: tip Code Location
~.env
:::

In `@/service/request/index.ts`, you decide whether the URL needs to handle proxies by passing `isHttpProxy` to the second parameter of `getServiceBaseURL`, which is determined based on the environment in which the code is running in conjunction with `VITE_HTTP_PROXY`. You can deconstruct the request URL here by passing different parameters.

```
const isHttpProxy = import.meta.env.DEV && import.meta.env.VITE_HTTP_PROXY === 'Y';
const { baseURL } = getServiceBaseURL(import.meta.env, isHttpProxy);
const { otherBaseURL } = getServiceBaseURL(import.meta.env, false);
```

## Principle

The default requested proxy match string is `/proxy-default/`，Suppose the address of the request is `https://api.example.com/v1/user`，Then the address of the local proxy obtained is `http://localhost:3000/proxy-default/v1/user`，When this request is sent, it matches to the proxy configuration via `/proxy-default/` and forwards the request to `https://api.example.com/v1/user`.
