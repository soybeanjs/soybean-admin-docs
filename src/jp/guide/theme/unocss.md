# UnoCSS テーマ

[Theme Tokens](/zh/guide/theme/tokens) を UnoCSS のテーマ設定に注入し、UnoCSS の機能を活用することで、`text-primary` や `bg-primary` などのクラス名を使用できるようになり、コンポーネントライブラリと UnoCSS のテーマカラーを統一して適用できます。

```ts
import { themeVars } from './src/theme/vars';

export default defineConfig<Theme>({
  theme: {
    ...themeVars
  }
});
```

::: tip コードの場所
./uno.config.ts
:::

## UnoCSS のダークモード

UnoCSS が提供するプリセットのダークモード機能を利用し、HTML に class="dark" を追加するだけで、`dark:text-#000` `dark:bg-#333` のようなクラスが有効になり、ダークモードの効果を実現できます。

```
export default defineConfig<Theme>({
presets: [presetUno({ dark: 'class' })]
});
```

::: tip コードの場所
./uno.config.ts
:::
