# 系统图标

## iconify 图标渲染原理

基于 iconify 的 svg 的 json 数据，通过 unplugin-icons 插件，将 svg 数据转换成 vue 组件

- [unplugin-icons](https://github.com/antfu/unplugin-icons)
- [iconify](https://github.com/iconify/iconify)
- [Journey with Icons Continues](https://antfu.me/posts/journey-with-icons-continues)


## 本地 svg 图标渲染原理

通过 `unplugin-icons` 插件 与 `vite-plugin-svg-icons` 插件，将本地 svg 文件转换成 vue 组件

> 本地 svg 图标需要放在 src/assets/svg-icon 目录下

## 相关配置

**.env 配置文件**

- VITE_ICON_PREFIX: iconify 图标前缀
- VITE_ICON_LOCAL_PREFIX: 本地 svg 图标前缀，格式遵循 {VITE_ICON_PREFIX}-{local icon name}

## 请注意

>根据 svg 图标渲染原理，已被转换为静态资源，这意味着一旦 svg 文件被加载并转换为组件，它们将成为您项目的一部分，不会自动检测和更新源文件的更改。因此，如果您修改了 svg 文件并希望在项目中看到更改的效果，您需要重新启动项目。
