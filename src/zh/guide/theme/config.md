# 主题配置

## 类型定义

见 App.Theme.ThemeSetting

::: tip 代码位置
src/typings/app.d.ts
:::

## 初始化配置

```ts
export const themeSettings: App.Theme.ThemeSetting = {
  //默认配置
}
```

::: tip 代码位置
src/theme/settings.ts
:::

## 配置覆盖更新

当发布新的版本时，可以通过配置覆盖更新的方式，来更新主题配置

```ts
export const overrideThemeSettings: Partial<App.Theme.ThemeSetting> = {
  //覆盖配置
};
```

::: tip 代码位置
src/theme/settings.ts
:::

## 环境说明

- 当项目处于`开发模式`时，主题配置不会被缓存，可以通过更新 `src/theme/settings.ts` 中的 `themeSettings` 来更新主题配置
  > 开发阶段为了能够实时看到主题配置的变化，所以不会缓存主题配置

- 当项目处于`生产模式`时，主题配置会被缓存到 localStorage 中
  > 每次发布新版本，可以通过更新 `src/theme/settings.ts` 中的 `overrideThemeSettings` 来覆盖更新主题配置
