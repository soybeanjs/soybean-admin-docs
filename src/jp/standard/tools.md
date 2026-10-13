# ツール規約

SoybeanAdmin は統一されたツールチェーンでコード品質の担保、Git ワークフローの統一、開発効率の向上を実現しています。本ページではプロジェクトで実際に使用しているツールの全体像を紹介します。コード品質ツール、Git ワークフローツール、パッケージ管理、そして `@soybeanjs/cli` コマンドラインを含み、各ツールの役割と連携方法を素早く把握できます。

## ツールチェーンの概要

| カテゴリ         | ツール                                                                                                           | 役割                                             |
| ---------------- | ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| コード品質       | [`vite-plus`](https://viteplus.dev/)（`vp`）+ [`@soybeanjs/oxc-config`](https://github.com/soybeanjs/oxc-config) | コードのチェックとフォーマット                   |
| Vue ルール       | [`@soybeanjs/eslint-config-vue`](https://github.com/soybeanjs/eslint-config-vue)（ESLint）                       | Vue 単一ファイルコンポーネントのルール検証       |
| Git ワークフロー | `vp staged`、`vp config`                                                                                         | コミット前チェックと Git フックのインストール    |
| コマンドライン   | [`@soybeanjs/cli`](https://github.com/soybeanjs/cli)（`soy` / `sa`）                                             | コミット、クリーンアップ、リリース、依存更新など |
| パッケージ管理   | `pnpm`                                                                                                           | インストール、スクリプト実行、バージョン管理     |

## コード品質：vite-plus + oxc-config

プロジェクトは [`vite-plus`](https://viteplus.dev/) でフォーマットとチェックを統合し、以前は分散していた Prettier、ESLint、`lint-staged`、`simple-git-hooks` などを置き換えました。関連する設定はルートの `vite.config.ts` に集約されています：

```ts
import { defineConfig } from 'vite-plus';
import { fmt, lint } from '@soybeanjs/oxc-config';

export default defineConfig({
  staged: {
    '*': 'vp check --fix'
  },
  lint,
  fmt: {
    ...fmt,
    ignorePatterns: ['CHANGELOG.md']
  },
  resolve: {
    tsconfigPaths: true
  }
});
```

- `lint` と `fmt` は [`@soybeanjs/oxc-config`](https://github.com/soybeanjs/oxc-config) から取得し、ルールとフォーマットスタイル（120 桁、シングルクォート、インポートの並び替えなど）を統一します。
- `staged` はステージ済みファイルのチェック方法を定義し、以前の `lint-staged` 設定に相当します。
- `resolve.tsconfigPaths: true` によりビルドが `tsconfig.json` の `paths` エイリアスを直接読み取るため、設定での重複記述が不要になります。

フォーマットとチェックの実行：

```bash
# フォーマット
pnpm fmt

# チェックと自動修正（vp lint + Vue ルールの eslint）
pnpm lint
```

> Vue ファイル固有のルールは `eslint.config.mjs` で提供されます。詳細は [規約の概要](./synthesis) を参照してください。

## Git ワークフローツール

プロジェクトは `simple-git-hooks` と `lint-staged` に依存せず、`vite-plus` が Git フックを一元管理します：

- `.vite-hooks/pre-commit` には 1 行だけ `vp staged` と書かれています。コミット前に `vp staged` が `vite.config.ts` の `staged` 設定に従ってステージ済みファイルをチェックします。
- `package.json` の `prepare` スクリプトは `vp config --no-agent` を実行し、依存関係のインストール時に Git フックディレクトリを `.vite-hooks/_` に向けます。
- コミットメッセージの規約は引き続き `@soybeanjs/cli` が担います。`soy git-commit` が対話形式で生成し、`soy git-commit-verify` が検証します。

手書きによるミスを避けるため、対話形式のコミットコマンドの使用を推奨します：

```bash
# Conventional Commits 規約に沿ったコミットメッセージを対話形式で生成
pnpm commit

# 中国語のコミットメッセージを生成
pnpm commit:zh
```

> Git フックの設計意図と削除方法については [Git Hooks](../guide/cli/git-hooks) を参照してください。

## パッケージ管理：pnpm

プロジェクトは [`pnpm`](https://pnpm.io/) をパッケージマネージャーとして使用し、`package.json` の `engines` で実行環境を制約しています：

```json
{
  "engines": {
    "node": ">=22.18.0",
    "pnpm": ">=8.7.0"
  }
}
```

よく使うコマンド：

```bash
# 依存関係のインストール
pnpm install

# ドキュメントの開発サーバーを起動
pnpm dev

# ドキュメントをビルド
pnpm build
```

## コマンドラインツール：@soybeanjs/cli

[`@soybeanjs/cli`](https://github.com/soybeanjs/cli) は `soy`（`sa` も可）コマンドを提供し、一連の工程化機能をラップしています。これらのコマンドは `package.json` の `scripts` に必要に応じて紐付けられています：

| コマンド            | 説明                                                          | 対応スクリプト |
| ------------------- | ------------------------------------------------------------- | -------------- |
| `git-commit`        | Conventional Commits 規約に沿ったコミットメッセージを対話生成 | `pnpm commit`  |
| `git-commit-verify` | コミットメッセージが規約に沿うか検証（`commit-msg` フック用） | —              |
| `cleanup`           | `node_modules`、`dist` などのディレクトリを削除               | `pnpm cleanup` |
| `ncu`               | `package.json` の依存バージョンを更新                         | `pnpm upkg`    |
| `release`           | バージョン更新、changelog 生成、コミット                      | `pnpm release` |
| `changelog`         | changelog を生成                                              | —              |

> コマンドの完全な一覧と説明は [コマンドライン](../guide/cli/intro) と [コマンド](../guide/cli/command) を参照してください。

## 推奨エディタと拡張機能

開発には [Visual Studio Code](https://code.visualstudio.com/) の使用を推奨します。以下の拡張機能をインストールすると完全な開発体験が得られます：

- **Vue - Official（Volar）**：Vue 単一ファイルコンポーネントのシンタックスハイライト、型推論、インテリセンスを提供します。
- **Oxc**：フォーマットとチェック機能を提供し、プロジェクトのデフォルトフォーマッターです（`settings.json` の `"editor.defaultFormatter": "oxc.oxc-vscode"` に対応）。
- **ESLint**：Vue ファイル固有のルールを検証し、`@soybeanjs/eslint-config-vue` と連携します。

保存時の修正を有効にするには、VS Code の `settings.json` で以下を有効化することを推奨します：

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.fixAll.oxc": "explicit"
  }
}
```
