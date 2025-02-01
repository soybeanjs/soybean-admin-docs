# ルートコンポーネント

## レイアウトコンポーネント

- **layout.base**: 共通部分を持つレイアウト、例えばグローバルヘッダー、サイドバー、フッターなど

- **layout.blank**: 空白レイアウト

## ページコンポーネント

- **view.[RouteKey]**: ページコンポーネント
  > 例如：`view.home`, `view.multi-menu_first_child`

## レイアウトとページの混合コンポーネント

- **layout.base$view.[RouteKey]**: レイアウトとページの混合コンポーネント
  > 例如：`layout.base$view.home`, `layout.base$view.multi-menu_first_child`

::: tip ヒント
このタイプのコンポーネントは単一レベルルートを表します
:::
