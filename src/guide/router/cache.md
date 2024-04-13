# Route Caching

## Principle

Route caching is implemented through the `keep-alive` component of `vue-router`. The `keep-alive` component caches the state of the component. When the component is visited again, it will directly take the component from the cache, instead of creating a new component.
Since the `keep-alive` component uses the `name` attribute of the component as the key for caching, the page components in the project have been automatically injected with the `name` attribute through the `@elegant-router/vue` plugin, so you only need to set the `keepAlive` field of the `meta` attribute in the route data.
The multi-level route caching of `vue-router` has problems, so the route data in the project has been converted into two-level routes to ensure that each route can be cached normally.

::: danger
Since the `<Transition>` tag is used to support page transition animations, there can only be one root element in the `template` of the `.vue` file of a page with caching turned on, and neither annotations nor plain text can be used, there must be only one root element.
Related Documents： [Transition | Vue.js (vuejs.org)](https://cn.vuejs.org/guide/built-ins/transition.html#the-transition-component)
:::

## Usage

By setting the `keepAlive` field in the `meta` attribute of the route data, you can control whether the route is cached.


{
  name: 'about',
  path: '/about',
  component: 'layout.base$view.about',
  meta: {
    title: 'about',
    keepAlive: true
  }
}

