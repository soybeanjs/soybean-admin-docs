# UnoCSS 主题

通过 [Theme Tokens](/zh/guide/theme/tokens) 注入到 UnoCSS 的主题配置中, 借助于 UnoCSS 的能力，可以使用类似 `text-primary bg-primary` 等 class 名称进而统一了组件库和 UnoCSS 的主题颜色的应用。

```ts
import { themeVars } from './src/theme/vars';

export default defineConfig<Theme>({
  theme: {
    ...themeVars,
  }
});

```

::: tip 代码位置
./uno.config.ts
:::

## UnoCSS 的暗黑模式

通过 UnoCSS 提供的预设暗黑模式方案, 只要在 html 上添加 class="dark"，则项目中类似于 `dark:text-#000 dark:bg-#333` 的 class 就会生效，从而达到暗黑模式的效果

```ts
export default defineConfig<Theme>({
	presets: [presetUno({ dark: "class" })],
});
```

::: tip 代码位置
./uno.config.ts
:::
