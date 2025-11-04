# 紹介

[`SoybeanAdmin`](https://github.com/soybeanjs/soybean-admin)は、洗練されたエレガントで、視覚的に魅力的かつ機能豊富なバックエンド管理テンプレートです。最新のフロントエンド技術スタック（Vue3, Vite6, TypeScript, Pinia, UnoCSS）を基盤にしており、多彩なテーマ設定とコンポーネントを内蔵しています。コード規範が厳密に守られており、ファイルルーティングシステムの自動化を実現しています。また、ApiFoxに基づくオンラインMockデータソリューションを採用しています。`SoybeanAdmin` は、バックエンド管理のワンストップソリューションを提供し、追加の設定なしですぐに使用できます。また、最先端技術を素早く学ぶための最良の実践でもあります。

# 特徴

- **最先端技術の採用**：Vue3, Vite6, TypeScript, Pinia, UnoCSS などの最新の技術スタックを採用。
- **明確なプロジェクトアーキテクチャ**：pnpm monorepo アーキテクチャを採用し、構造がシンプルで理解しやすい。
- **厳格なコード規範**： SoybeanJS 規範 を遵守し、eslint、prettier、simple-git-hooks を統合してコードの規範性を保証。
- **TypeScript**： 厳密な型チェックをサポートし、コードの保守性を向上。
- **豊富なテーマ設定**： UnoCSS と完璧に統合された多彩なテーマ設定を内蔵。
- **内蔵の国際化機能**： 多言語サポートが簡単に実現可能。
- **自動化されたファイルルーティングシステム**： ルーティングのインポート、宣言、型を自動生成。詳細については Elegant Router をご覧ください。
- **柔軟な権限ルーティング**： フロントエンドの静的ルーティングとバックエンドの動的ルーティングをサポート。
- **多彩なページコンポーネント**： 403、404、500 ページなどの多彩なページやコンポーネントを内蔵。レイアウトコンポーネント、タグコンポーネント、テーマ設定コンポーネントなども含まれています。
- **コマンドラインツール**： 効率的なコマンドラインツールが内蔵され、gitのコミット、ファイルの削除、公開などが簡単にできます。
- **モバイル端末対応**： 完璧にモバイル端末対応で、レスポンシブレイアウトを実現。

バージョン

- **NaiveUI バージョン:**
  - [Preview Link](https://naive.soybeanjs.cn/)
  - [Github Repository](https://github.com/soybeanjs/soybean-admin)
  - [Gitee Repository](https://gitee.com/honghuangdc/soybean-admin)

- **AntDesignVue バージョン:**
  - [Preview Link](https://antd.soybeanjs.cn/)
  - [Github Repository](https://github.com/soybeanjs/soybean-admin-antd)
  - [Gitee Repository](https://gitee.com/honghuangdc/soybean-admin-antd)

- **ElementPlus バージョン:**
  - [Preview Link](https://elp.soybeanjs.cn/)
  - [Github Repository](https://github.com/soybeanjs/soybean-admin-element-plus)
  - [Gitee Repository](https://gitee.com/honghuangdc/soybean-admin-element-plus)

- **Legacy バージョン:**
  - [Preview Link](https://legacy.soybeanjs.cn/)
  - [Github Repository](https://github.com/soybeanjs/soybean-admin/tree/legacy)

## ブランチ

ユーザーの利用を促進するため、`main`ブランチは基本版を採用しており、コアフレームワークのみが含まれています。業務に関連する高いサンプルは含まれていません。より多くのサンプルを参照する必要がある場合は、`example`ブランチに切り替えてください。このブランチはプレビューリンクで表示される内容を含んでおり、完全なサンプルメニューが含まれています。

## ドキュメント

- ドキュメントリンクは [soybean-admin-docs](https://github.com/soybeanjs/soybean-admin-docs)で、Vitepressを使用して開発しています。ドキュメントに誤りがあった場合は、PRを送って改善にご協力ください。

## 学ぶべき基本知識

本プロジェクトは## Vue3, Vite, TSをベースに開発され、すべてのコードは Vue3の**script-setup** 記法を使用しています。開発前に以下の内容を学習することをお勧めします。これらの知識を事前に学んでおくと、プロジェクトの理解に非常に役立ちます。

- [ES6](https://es6.ruanyifeng.com/)
- [Vue3](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://jkchao.github.io/typescript-book-chinese/#why)
- [Vue Router](https://router.vuejs.org/)
- [Pinia](https://pinia.vuejs.org/)
- [UnoCSS](https://uno.antfu.me/)
- [VueUse](https://vueuse.org/)
- [NaiveUI](https://www.naiveui.com/zh-CN/os-theme) / [AntDesign Vue](https://www.antdv.com/components/overview-cn/)

## ブラウザサポート

ローカル開発には `Chrome 100+` ブラウザの使用を推奨

現代的なブラウザに対応し、IEはサポートしません

IE Edge Firefox Chrome Safari
サポートなし 最新の 2 バージョン 最新の 2 バージョン 最新の 2 バージョン 最新の 2 バージョン

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png" alt="IE" width="24px" height="24px"  />](http://godban.github.io/browsers-support-badges/)IE | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)Safari |
| :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                                                                                not support                                                                                                                |                                                                                          last 2 versions                                                                                          |                                                                                               last 2 versions                                                                                                |                                                                                             last 2 versions                                                                                              |                                                                                             last 2 versions                                                                                              |

## 参加方法

- [SoybeanAdmin](https://github.com/honghuangdc/soybean-admin) は現在も更新を続けており、皆様の参加を歓迎します。一緒にメンテナンスし、改善を加え、プロジェクトをより強力にしていきましょう。本プロジェクトは MIT オープンソースライセンスに基づいており、すべて無料で使用できます。
- 参加したい場合は、良い提案を提供したり、PRを送っていただけると、あなたの活躍に応じて招待いたします。
