# System Theme

The implementation of the system theme is divided into two parts, one part is the theme configuration of the component library, and the other part is the theme configuration of UnoCSS. In order to unify the theme configuration of the two parts, some theme configurations are maintained on this, which control the theme configuration of the component library and UnoCSS respectively through these theme configurations.

## Principle

- Define some variables of theme configuration, including various theme colors, layout parameter configuration, etc.
- Produce theme variables that conform to the component library through these configurations
- Produce some theme tokens through these configurations and derive corresponding css variables, and then pass these css variables to UnoCSS

## Theme Configuration

### Type Definition

See App.Theme.ThemeSetting

::: tip Code Location
src/typings/app.d.ts
:::

### Initialization Configuration

```ts
export const themeSettings: App.Theme.ThemeSetting = {
  // Default configuration
}
```


::: tip Code location
src/theme/settings.ts
:::

### Configuration override update

When a new version is released, you can update the theme configuration by overriding the configuration

```ts
export const overrideThemeSettings: Partial<App.Theme.ThemeSetting> = {
  // override configuration
};
```

::: tip Code location
src/theme/settings.ts
:::

### Environment description

- When the project is in `development mode`, the theme configuration will not be cached, and you can update the theme configuration by updating `themeSettings` in `src/theme/settings.ts`
  > In order to see the changes of the theme configuration in real time during the development stage, the theme configuration will not be cached

- When the project is in `production mode`, the theme configuration will be cached in localStorage
  > Each time a new version is released, you can override the theme configuration by updating `overrideThemeSettings` in `src/theme/settings.ts`

## Component library theme

### NaiveUI Theme Configuration

**Generate the theme variables of the component library according to the theme color**

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

::: tip Code location
src/store/modules/theme/shared.ts

src/store/modules/theme/index.ts
:::

**Apply Theme Variables**

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

::: tip Code Location
src/App.vue
:::

### AntDesignVue Theme Configuration

**Generate the theme variables of the component library according to the theme color**

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

::: tip Code location
src/store/modules/theme/shared.ts

src/store/modules/theme/index.ts
:::

**Apply theme variables**


## Theme tokens

### Type definition

```ts
type ThemeToken = {
  colors: ThemeTokenColor;
  boxShadow: {
    header: string;
    sider: string;
    tab: string;
  };
};

::: tip Code location
src/typings/app.d.ts
:::
```

### CSS variables based on tokens

Some CSS variables will be generated on HTML during initialization, these CSS variables are produced based on theme tokens

```vue
<template>
  <ConfigProvider :theme="themeStore.antdTheme" :locale="antdLocale">
    <AppProvider>
      <RouterView class="bg-layout" />
    </AppProvider>
  </ConfigProvider>
</template>
```

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

::: tip Code location
src/theme/vars.ts
:::

## UnoCSS Theme

Inject the above `themeVars` into the theme configuration of UnoCSS

```ts
import { themeVars } from './src/theme/vars';

export default defineConfig<Theme>({
  theme: {
    ...themeVars,
  }
});

```

In this way, with the help of UnoCSS, you can use class names like `text-primary bg-primary` to unify the application of theme colors in the component library and UnoCSS.

::: tip Code location
./uno.config.ts
:::

### UnoCSS Dark Mode

Through the preset dark mode scheme provided by UnoCSS, as long as you add class="dark" to html, classes like `dark:text-#000 dark:bg-#333` in the project will take effect, thereby achieving the effect of dark mode.

```ts
export default defineConfig<Theme>({
    presets: [presetUno({ dark: "class" })],
});
```

::: tip Code location
./uno.config.ts
:::
