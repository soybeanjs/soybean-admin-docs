# 路由缓存

## 原理

路由缓存是通过 `vue-router` 的 `keep-alive` 组件实现的。`keep-alive` 组件会缓存组件的状态，当组件再次被访问时，会直接从缓存中取出组件，而不是重新创建一个新的组件。
由于 `keep-alive` 组件使用的是组件的 `name` 属性来作为缓存的 key，项目中的页面组件都已经通过 `@elegant-router/vue` 插件自动注入了 `name` 属性，所以只需要在路由数据中设置 `meta` 属性的 `keepAlive` 字段即可。
`vue-router` 的多级路由缓存是有问题的，因次项目中的路由数据都被转换成了二级路由，保证每个路由都能正常缓存。

## 用法

通过设置路由数据的 `meta` 属性中的 `keepAlive` 字段，可以控制路由是否缓存。

```ts
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
