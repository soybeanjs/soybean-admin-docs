# システムアイコン

## iconify アイコンのレンダリング原理

iconify の svg の json データを基に、unplugin-icons プラグインを使用して svg データを Vue コンポーネントに変換します。

- [unplugin-icons](https://github.com/antfu/unplugin-icons)
- [iconify](https://github.com/iconify/iconify)
- [Journey with Icons Continues](https://antfu.me/posts/journey-with-icons-continues)

## ローカル svg アイコンのレンダリング原理

`unplugin-icons` プラグインと `vite-plugin-svg-icons` プラグインを使用して、ローカル svg ファイルを Vue コンポーネントに変換します。

> ローカル svg アイコンは src/assets/svg-icon ディレクトリに配置してください

## 関連設定

**.env 設定ファイル**

- VITE_ICON_PREFIX: iconify アイコンのプレフィックス
- VITE_ICON_LOCAL_PREFIX: ローカル svg アイコンのプレフィックス ({VITE_ICON_PREFIX}-{local icon name} の形式を遵守)

## 注意事項

> svg アイコンのレンダリング原理上、一度変換されると静的リソースになります。そのため、一旦 svg ファイルが Vue コンポーネントに変換されると、プロジェクトの一部となり、ソースファイルの変更を自動で検出・更新しません。svg ファイルを変更した場合は、プロジェクトを再起動する必要があります。
