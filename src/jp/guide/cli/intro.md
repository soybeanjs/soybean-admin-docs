# コマンドライン

## 概述

プロジェクトの `sa` コマンドラインツールは、以下のような一般的な機能を提供します。

- `cleanup`: ディレクトリを削除（node_modules、dist など）
- `update-pkg`: package.json の依存関係を更新
- `git-commit`: Conventional Commits 規約に準拠したコミットメッセージを生成
- `git-commit-verify`: Git のコミットメッセージを検証し、Conventional Commits 規約に準拠しているか確認
- `changelog`: 変更履歴（changelog）を生成
- `release`: リリース処理（バージョン更新、changelog 生成、コードのコミット）
- `gen-route`: ルーティングを生成

> `sa` コマンドは `packages/scripts` によって提供されます。
