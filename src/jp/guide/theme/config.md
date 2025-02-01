# テーマ設定

## 型定義

App.Theme.ThemeSetting を参照

::: tip コードの場所
src/typings/app.d.ts
:::

## 初期設定

```ts
export const themeSettings: App.Theme.ThemeSetting = {
  // デフォルト設定
};
```

::: tip コードの場所
src/theme/settings.ts
:::

## 設定の上書き更新

新しいバージョンをリリースする際、設定の上書き更新を利用してテーマ設定を更新できます。

```ts
export const overrideThemeSettings: Partial<App.Theme.ThemeSetting> = {
  // 上書き設定
};
```

::: tip コードの場所
src/theme/settings.ts
:::

環境説明

- プロジェクトが 開発モード の場合、テーマ設定はキャッシュされません。`src/theme/settings.ts` 内の `themeSettings` を更新することで、テーマ設定を変更できます。

  > 開発段階ではテーマ設定の変更をリアルタイムで確認できるようにするため、キャッシュしません。

- プロジェクトが `本番モード` の場合、テーマ設定は localStorage にキャッシュされます。
  > 新しいバージョンをリリースする際は、`src/theme/settings.ts`内の `overrideThemeSettings` を更新することで、テーマ設定を上書きできます。
