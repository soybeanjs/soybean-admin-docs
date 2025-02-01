# クイックスタート

この記事では、プロジェクトをゼロから開始する方法を説明します。

## 環境準備

環境が以下の要件を満たしていることを確認してください：

- **git**: プロジェクトのクローンとバージョン管理に必要です。[インストール手順](../tutorial/git.md)
- **NodeJS**: >=18.12.0、推奨バージョン 18.19.0 以上。[インストール手順](../tutorial/nodejs.md)
- **pnpm**: >= 8.7.0、最新バージョン推奨。

### Mock

本プロジェクトは Apifox のクラウドMock機能を利用してMockリクエストを実現しています。
APIドキュメント：soybean-admin-mock

## VSCode プラグイン

本プロジェクトでは、VSCode の使用を推奨しています。プロジェクトには VSCode の設定が含まれており、推奨プラグインや設定がプリセットされています。

以下は推奨プラグインです：
• Auto Close Tag - HTML/XML の終了タグを自動追加
• Auto Complete Tag - HTML/XML の閉じタグを補完し、ペアのタグ名を自動変更
• Auto Rename Tag - HTML/XML のペアタグを自動リネーム
• Color Highlight - カラーコードのハイライト表示
• DotENV - .env ファイルのシンタックスハイライト
• EditorConfig for VS Code - エディター設定の統一
• ESLint - コードリント（コード品質チェック）
• Git Graph - Git の可視化ツール
• GitLens — Git supercharged - Git の履歴を詳細に表示
• Icônes - iconify アイコン検索
• Iconify IntelliSense - Iconify アイコンのリアルタイム表示
• i18n Ally - i18n（国際化）支援プラグイン
• javascript console utils - Ctrl + L で console.log() を簡単入力
• Material Icon Theme - ファイル・フォルダーのアイコン表示
• One Dark Pro - テーマ
• Prettier - Code formatter - コードフォーマットツール
• UnoCSS - UnoCSS のサポート
• Vue - Official - Vue の公式プラグイン
• Vue VSCode Snippets - Vue2/Vue3 のスニペット

## コードの取得

### GitHub からコードを取得

```bash
# クローン
git clone https://github.com/soybeanjs/soybean-admin.git
```

::: warning 注意
最新バージョンのコードは GitHub を基準としてください。
:::

### 依存関係のインストール

依存パッケージのインストール

```bash
pnpm i
```

## プラグイン設定

### Vue - Official をインストールし、Vetur を無効化

- [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) - Vue の公式プラグイン

## npm scripts

```json
{
  // 本番環境でのビルド
  "build": "vite build --mode prod",
  // テスト環境でのビルド
  "build:test": "vite build --mode test",
  // `node_modules`, `dist`, `pnpm-lock.yaml` の削除
  "cleanup": "sa cleanup",
  // コミットメッセージの生成（Conventional Commits 規約に準拠）
  "commit": "sa git-commit",
  // ローカル起動（テスト環境）
  "dev": "vite --mode test",
  // ローカル起動（本番環境）
  "dev:prod": "vite --mode prod",
  // ルートの生成
  "gen-route": "sa gen-route",
  // eslint のチェックと自動修正
  "lint": "eslint . --fix",
  // simple-git-hooks の初期化
  "prepare": "simple-git-hooks",
  // ビルド後の `dist` をローカル環境でプレビュー
  "preview": "vite preview",
  // リリース
  "release": "sa release",
  // Vue ファイルの型チェック
  "typecheck": "vue-tsc --noEmit --skipLibCheck",
  // 依存パッケージの更新
  "update-pkg": "sa update-pkg"
}
```

## ディレクトリ構成

```
soybean-admin
├── .vscode                        // VSCode のプラグインと設定
│   ├── extensions.json            // 推奨 VSCode プラグイン
│   ├── launch.json                // デバッグ設定ファイル（Vue と TS のデバッグ用）
│   └── settings.json              // VSCode 設定（このプロジェクト専用、ユーザー設定にコピー可能）
── build                          // Vite のビルド関連設定とプラグイン
│   ├── config                     // ビルドとパッケージ設定
│   │   └── proxy.ts               // ネットワークリクエストのプロキシ設定
│   └── plugins                    // ビルドプラグイン
│       ├── index.ts               // プラグインの統合
│       ├── router.ts              // elegant-router プラグイン
│       ├── unocss.ts              // Unocss プラグイン
│       └── unplugin.ts            // UI コンポーネントの自動インポート、Iconify アイコンの解析、ローカルSVG のアイコン化
├── packages                       // サブプロジェクト
│   ├── axios                      // ネットワークリクエストのラッパー
│   ├── color-palette              // カラーパレット
│   ├── hooks                      // Composition API のフック
│   ├── materials                  // コンポーネントマテリアル
│   ├── ofetch                     // ネットワークリクエストのラッパー
│   ├── scripts                    // スクリプト
│   ├── uno-preset                 // UnoCSS のプリセット設定
│   └── utils                      // ユーティリティ関数
├── public                         // パブリックディレクトリ（このフォルダ内のリソースはビルド後にルートディレクトリに配置される）
│   └── favicon.svg                // Web サイトのファビコン
├── src
│   ├── assets                     // 静的リソース
│   │   ├── imgs                   // 画像
│   │   └── svg-icon               // ローカル SVG アイコン
│   ├── components                 // グローバルコンポーネント
│   │   ├── advanced               // 高度なコンポーネント
│   │   ├── common                 // 共通コンポーネント
│   │   └── custom                 // カスタムコンポーネント
│   ├── constants                  // 定数
│   │   ├── app.ts                 // アプリ関連の定数
│   │   ├── business.ts            // ビジネス関連の定数
│   │   ├── common.ts              // 一般的な定数
│   │   └── reg.ts                 // 正規表現の定数
│   ├── enums                      // 列挙型（Enum）
│   ├── hooks                      // Composition API のフック
│   │   ├── business               // ビジネスロジック用のフック
│   │   │   ├── auth               // ユーザー認証
│   │   │   └── captcha            // CAPTCHA（画像認証）
│   │   └── common                 // 共通フック
│   │       ├── echarts            // ECharts（データ可視化ライブラリ）
│   │       ├── form               // フォーム関連
│   │       ├── icon               // アイコン関連
│   │       ├── router             // ルーティング関連
│   │       └── table              // テーブル（表）関連
│   ├── layouts                    // レイアウトコンポーネント
│   │   ├── base-layout            // 基本レイアウト（ヘッダー、タブ、サイドバー、フッターなどの共通部分を含む）
│   │   ├── blank-layout           // 空白レイアウト（単一ページ）
│   │   ├── context                // レイアウトコンポーネントのコンテキスト状態
│   │   ├── hooks                  // レイアウトコンポーネントのフック
│   │   └── modules                // レイアウトコンポーネントのモジュール
│   │       ├── global-breadcrumb  // グローバルパンくずリスト
│   │       ├── global-content     // グローバルコンテンツ
│   │       ├── global-footer      // グローバルフッター
│   │       ├── global-header      // グローバルヘッダー
│   │       ├── global-logo        // グローバルロゴ
│   │       ├── global-menu        // グローバルメニュー
│   │       ├── global-search      // グローバル検索
│   │       ├── global-sider       // グローバルサイドバー
│   │       ├── global-tab         // グローバルタブ
│   │       └── theme-drawer       // テーマ設定用のドロワー
│   ├── locales                // 国際化（i18n）設定
│   │   ├── langs              // 言語ファイル
│   │   ├── dayjs.ts           // dayjs の国際化設定
│   │   ├── locale.ts          // 言語ファイルの統合
│   │   └── naive.ts           // Naive UI の国際化設定
│   ├── plugins                // プラグイン
│   │   ├── assets.ts          // 各種依存関係の静的リソースのインポート（CSS、SCSS など）
│   │   ├── dayjs.ts           // dayjs プラグイン
│   │   ├── iconify.ts         // Iconify プラグイン
│   │   ├── loading.ts         // グローバル初期ロード時のプラグイン
│   │   └── nprogress.ts       // ページ読み込み時のトップバー（nprogress プラグイン）
│   ├── router                 // Vue Router（ルーティング）
│   │   ├── elegant            // elegant-router プラグインで生成されたルート定義と変換ファイル
│   │   ├── guard              // ルートガード
│   │   ├── routes             // ルート定義
│   │   │   ├── builtin        // システム組み込みルート（ルートページと404ページ）
│   │   │   └── index          // 静的ルートのエントリーポイント
│   │   └── index.ts           // ルーティングプラグインのエントリーポイント
│   ├── service                // ネットワークリクエスト
│   │   ├── api                // API インターフェース
│   │   └── request            // リクエスト関数のラッパー
│   ├── store                  // Pinia 状態管理
│   │   ├── modules            // 状態管理のモジュール
│   │   │   ├── app            // アプリ状態（ページリロード、メニュー折りたたみ、プロジェクト設定用ドロワー）
│   │   │   ├── auth           // 認証状態（ユーザー情報、ユーザー権限）
│   │   │   ├── route          // ルート状態（動的ルーティング、メニュー、ルートキャッシュ）
│   │   │   ├── tab            // タブ状態（マルチタブ、キャッシュページのスクロール位置）
│   │   │   └── theme          // テーマ状態（プロジェクトのテーマ設定）
│   │   └── plugins            // 状態管理のプラグイン
│   ├── styles                 // グローバルスタイル
│   │   ├── css                // CSS
│   │   └── scss               // SCSS
│   ├── theme                  // テーマ設定
│   │   ├── settings.ts        // テーマのデフォルト設定とカスタマイズ設定
│   │   └── vars.ts            // テーマトークンに対応する CSS 変数
│   ├── typings                // TypeScript 型定義ファイル（*.d.ts）
│   │   ├── api.d.ts           // API レスポンスデータの型定義
│   │   ├── app.d.ts           // アプリ関連の型定義
│   │   ├── common.d.ts        // 共通型定義
│   │   ├── components.d.ts    // 自動インポートされたコンポーネントの型定義
│   │   ├── elegant-router.d.ts // elegant-router プラグインで生成されたルート型定義
│   │   ├── env.d.ts           // Vue ルートと環境変数の型定義
│   │   ├── global.d.ts        // グローバル共通型定義
│   │   ├── naive-ui.d.ts      // Naive UI の型定義
│   │   ├── router.d.ts        // Vue ルーターの型定義
│   │   ├── storage.d.ts       // ローカルストレージのデータ型定義
│   │   └── union-key.d.ts     // ユニオン型定義
│   ├── utils                  // グローバルユーティリティ関数（純粋関数、状態を持たない）
│   │   ├── common             // 共通ユーティリティ関数
│   │   ├── icon               // アイコン関連のユーティリティ関数
│   │   ├── service            // リクエストサービス設定関連のユーティリティ関数
│   │   └── storage            // ストレージ関連のユーティリティ関数
│   ├── views                  // ページビュー
│   │   ├── _builtin           // システム組み込みページ（ログイン、エラーページなど）
│   │   ├── about              // About（概要）ページ
│   │   ├── function           // 機能ページ
│   │   ├── home               // ホームページ
│   │   ├── manage             // システム管理ページ
│   │   ├── multi-menu         // 多階層メニュー
│   │   └── user-center        // ユーザーセンター
│   ├── App.vue                // Vue アプリのエントリーファイル
│   └── main.ts                // プロジェクトのエントリーポイント（TypeScript）
├── .editorconfig              // エディターの統一設定ファイル
├── .env                       // 環境設定ファイル
├── .env.prod                  // 本番環境の環境設定ファイル
├── .env.test                  // テスト環境の環境設定ファイル
├── .gitattributes             // Git 属性設定
├── .gitignore                 // Git コミット時に無視するファイル設定
├── .npmrc                     // npm 設定ファイル
├── CHANGELOG.md               // プロジェクトの更新履歴
├── eslint.config.js           // ESLint の設定ファイル（flat 構成）
├── index.html                 // HTML ファイル
├── package.json               // npm 依存関係定義ファイル
├── pnpm-lock.yaml             // pnpm 依存関係のロックファイル
├── README.md                  // プロジェクトの概要ドキュメント
├── README.zh-CN.md            // プロジェクト概要ドキュメント（中国語）
├── tsconfig.json              // TypeScript 設定ファイル
├── uno.config.ts              // UnoCSS の設定ファイル
└── vite.config.ts             // Vite 設定ファイル
```
