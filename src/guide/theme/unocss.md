# UnoCSS Theme

By inject [Theme Tokens](/guide/theme/tokens) into UnoCSS theme configuration, you can use UnoCSS's ability to use class names like `text-primary bg-primary` to unify the application of theme colors in the component library and UnoCSS.

```ts
import { themeVars } from './src/theme/vars';

export default defineConfig<Theme>({
  theme: {
    ...themeVars,
  }
});

```

::: tip Code location
./uno.config.ts
:::

## UnoCSS Dark Mode

By using the dark mode solution provided by UnoCSS, as long as the class="dark" is added to the html, the class like `dark:text-#000 dark:bg-#333` in the project will take effect, thus achieving the effect of dark mode.

```ts
export default defineConfig<Theme>({
	presets: [presetUno({ dark: "class" })],
});
```

::: tip Code location
./uno.config.ts
:::
