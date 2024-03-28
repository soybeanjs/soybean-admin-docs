# Proxy

## Outlined

The project creates the base path of the service and a string to match the proxy through the `createServiceConfig` function.

::: tip Code Location
@/utils/service.ts
:::

The proxy is then created in the `createViteProxy` function based on the configuration obtained above.

## Principle

The default requested proxy match string is `/proxy-default/`，Suppose the address of the request is `https://api.example.com/v1/user`，Then the address of the local proxy obtained is `http://localhost:3000/proxy-default/v1/user`，When this request is sent, it matches to the proxy configuration via `/proxy-default/` and forwards the request to `https://api.example.com/v1/user`.
