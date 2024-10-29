# Route Caching

## Principle

Route caching is implemented through the `keep-alive` component of `vue-router`. The `keep-alive` component caches the state of the component. When the component is visited again, it will directly take the component from the cache, instead of creating a new component.
Since the `keep-alive` component uses the `name` attribute of the component as the key for caching, the page components in the project have been automatically injected with the `name` attribute through the `@elegant-router/vue` plugin, so you only need to set the `keepAlive` field of the `meta` attribute in the route data.
The multi-level route caching of `vue-router` has problems, so the route data in the project has been converted into two-level routes to ensure that each route can be cached normally.


## Usage

By setting the `keepAlive` field in the `meta` attribute of the route data, you can control whether the route is cached.

```js
{
  name: 'about',
  path: '/about',
  component: 'layout.base$view.about',
  meta: {
    title: 'about',
    keepAlive: true
  }
}
```
