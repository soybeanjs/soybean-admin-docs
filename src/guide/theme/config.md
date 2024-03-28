# Theme Config

## Typedef

Reference `App.Theme.ThemeSetting`

::: tip source file
src/typings/app.d.ts
:::

## Initial Config

```ts
export const themeSettings: App.Theme.ThemeSetting = {
  //default config
}
```

::: tip source file
src/theme/settings.ts
:::

## Override Update

When a new version is released, the theme config can be updated by configuring the override update method.

```ts
export const overrideThemeSettings: Partial<App.Theme.ThemeSetting> = {
  //override config
};
```

::: tip source file
src/theme/settings.ts
:::

## About Environment

- When the project is in `dev`, the theme config will not be cached, but you can update the theme config by updating the`themeSettings` in`src/theme/settings.ts`

  > To see the changes in the theme config in real-time during the development stage, the theme config will not be cached.

- When the project is in `prod`,  the theme config will be cached in `localStorage`

  > Each time a new version is released, the theme config can be overridden by updating the `overrideThemeSettings` in `src/theme/settings.ts`.
