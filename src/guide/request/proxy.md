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

SoybeanAdmin simplifies the process of configuring proxies by setting the matching string to `/proxy-default/` (other requests use `proxy-{key}`). This way, when configuring the proxy, you only need to replace `/proxy-default/` in the request address with the actual request address, thus achieving the proxy configuration.

```ts
{
  '/proxy-default': {
    target: 'https://default.com',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/proxy-default/, ''),
  },
  '/proxy-demo': {
    target: 'https://demo.com',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/proxy-demo/, ''),
  }
}
```

### Note

Here are 2 configurations that are easily confused:

1. Suppose the path of a request is `https://example.com/api/user`, most would configure the proxy like this:

```ts

{
  '/api': {
    target: 'https://example.com',
    changeOrigin: true,
  }
}

```

> In this case, `/api` serves both as the matching string and the request path. Therefore, there is no rewrite configuration needed because the request path and the matching string are the same.

2. Suppose the path of a request is `https://example.com/user`, but the matching string for the proxy configuration is `/api`

```ts
{
  '/api': {
    target: 'https://example.com',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api/, ''),
  }
}
```

> In this case, `/api` serves as the matching string, and user serves as the request path. Therefore, a rewrite configuration is needed to remove the matching string.

In SoybeanAdmin, the second configuration with `rewrite` is used. This is to support proxies for multiple services and avoid conflicts where multiple services contain the same `/api` path. Therefore, SoybeanAdmin chooses to create matching strings like `/proxy-*` to separate the matching string from the request path, avoiding conflicts.
