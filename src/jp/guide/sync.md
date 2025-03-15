# コードの同期

1. 自分のリポジトリに `soybean-admin` の Git リポジトリを追加する

```bash
git remote add otherOrigin https://github.com/soybeanjs/soybean-admin.git
```

2. コードを取得する

```bash
git fetch otherOrigin
```

3. `cherry-pick` を使用して、更新が必要な Git コミットを選択する

```bash
git cherry-pick [commit id]
```

4. コードにコンフリクトが発生した場合は、まずコンフリクトを解決し、以下のコマンドを実行した後、`vim` で保存する

```bash
git cherry-pick --continue
```

> `vim`の保存方法: `esc`，`:`, `wq`, `enter`
