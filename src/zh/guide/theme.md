# 系统主题

系统主题的实现分为两个部分，一部分是组件库的主题配置，另一部分是 UnoCSS 的主题配置。为了统一两个部分的主题配置，在这之上维护了一些主题配置，通过这些主题配置分别控制组件库和 UnoCSS 的主题配置。

## 原理

- 定义一些主题配置的变量，包括各种主题颜色，布局的参数配置等
- 通过这些配置产出符合组件库的主题变量
- 通过这些配置产出一些主题 tokens 并衍生出对应的 css 变量，再将这些 css 变量传递给 UnoCSS

## 主题配置

### 类型定义

见 App.Theme.ThemeSetting

::: tip 代码位置
src/typings/app.d.ts
:::

### 初始化配置

```ts
export const themeSettings: App.Theme.ThemeSetting = {
  //默认配置
}
```

::: tip 代码位置
src/theme/settings.ts
:::

### 配置覆盖更新

当发布新的版本时，可以通过配置覆盖更新的方式，来更新主题配置

```ts
export const overrideThemeSettings: Partial<App.Theme.ThemeSetting> = {
  //覆盖配置
};
```

::: tip 代码位置
src/theme/settings.ts
:::

### 环境说明

- 当项目处于`开发模式`时，主题配置不会被缓存，可以通过更新 `src/theme/settings.ts` 中的 `themeSettings` 来更新主题配置
  > 开发阶段为了能够实时看到主题配置的变化，所以不会缓存主题配置

- 当项目处于`生产模式`时，主题配置会被缓存到 localStorage 中
  > 每次发布新版本，可以通过更新 `src/theme/settings.ts` 中的 `overrideThemeSettings` 来覆盖更新主题配置

## 组件库主题

### NaiveUI 主题配置

**根据主题颜色产出组件库的主题变量**

```ts
/**
 * Get naive theme
 *
 * @param colors Theme colors
 */
function getNaiveTheme(colors: App.Theme.ThemeColor) {
  const { primary: colorLoading } = colors;

  const theme: GlobalThemeOverrides = {
    common: {
      ...getNaiveThemeColors(colors)
    },
    LoadingBar: {
      colorLoading
    }
  };

  return theme;
}

/** Naive theme */
const naiveTheme = computed(() => getNaiveTheme(themeColors.value));

```
::: tip 代码位置
src/store/modules/theme/shared.ts

src/store/modules/theme/index.ts
:::

**应用主题变量**

```vue
<template>
  <NConfigProvider
    :theme="naiveDarkTheme"
    :theme-overrides="themeStore.naiveTheme"
    :locale="naiveLocale"
    :date-locale="naiveDateLocale"
    class="h-full"
  >
    <AppProvider>
      <RouterView class="bg-layout" />
    </AppProvider>
  </NConfigProvider>
</template>
```
::: tip 代码位置
src/App.vue
:::

### AntDesignVue 主题配置

**根据主题颜色产出组件库的主题变量**

```ts
/**
 * Get antd theme
 *
 * @param colors Theme colors
 * @param darkMode Is dark mode
 */
function getAntdTheme(colors: App.Theme.ThemeColor, darkMode: boolean) {
  const { defaultAlgorithm, darkAlgorithm } = antdTheme;

  const { primary, info, success, warning, error } = colors;

  const theme: ConfigProviderProps['theme'] = {
    token: {
      colorPrimary: primary,
      colorInfo: info,
      colorSuccess: success,
      colorWarning: warning,
      colorError: error
    },
    algorithm: [darkMode ? darkAlgorithm : defaultAlgorithm],
    components: {
      Menu: {
        colorSubItemBg: 'transparent'
      }
    }
  };

  return theme;
}

/** Antd theme */
const antdTheme = computed(() => getAntdTheme(themeColors.value, darkMode.value));
```

::: tip 代码位置
src/store/modules/theme/shared.ts

src/store/modules/theme/index.ts
:::

**应用主题变量**

```vue
<template>
  <ConfigProvider :theme="themeStore.antdTheme" :locale="antdLocale">
    <AppProvider>
      <RouterView class="bg-layout" />
    </AppProvider>
  </ConfigProvider>
</template>
```

## 主题 tokens

### 类型定义

```ts
type ThemeToken = {
  colors: ThemeTokenColor;
  boxShadow: {
    header: string;
    sider: string;
    tab: string;
  };
};
```
::: tip 代码位置
src/typings/app.d.ts
:::

### 基于 tokens 的 css 变量

初始化时会在 html 上生成一些 css 变量，这些 css 变量是基于主题 tokens 产出的

```ts
/** Theme vars */
export const themeVars: App.Theme.ThemeToken = {
  colors: {
    ...colorPaletteVars,
    nprogress: 'rgb(var(--nprogress-color))',
    container: 'rgb(var(--container-bg-color))',
    layout: 'rgb(var(--layout-bg-color))',
    inverted: 'rgb(var(--inverted-bg-color))',
    base_text: 'rgb(var(--base-text-color))'
  },
  boxShadow: {
    header: 'var(--header-box-shadow)',
    sider: 'var(--sider-box-shadow)',
    tab: 'var(--tab-box-shadow)'
  }
};
```

::: tip 代码位置
src/theme/vars.ts
:::

## UnoCSS 主题

通过上述的 `themeVars` 注入到 UnoCSS 的主题配置中

```ts
import { themeVars } from './src/theme/vars';

export default defineConfig<Theme>({
  theme: {
    ...themeVars,
  }
});

```

这样，借助于 UnoCSS 的能力，可以使用类似 `text-primary bg-primary` 等 class 名称进而统一了组件库和 UnoCSS 的主题颜色的应用。

::: tip 代码位置
./uno.config.ts
:::

### UnoCSS 的暗黑模式

通过 UnoCSS 提供的预设暗黑模式方案, 只要在 html 上添加 class="dark"，则项目中类似于 `dark:text-#000 dark:bg-#333` 的 class 就会生效，从而达到暗黑模式的效果

```ts
export default defineConfig<Theme>({
	presets: [presetUno({ dark: "class" })],
});
```

::: tip 代码位置
./uno.config.ts
:::

