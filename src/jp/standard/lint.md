# フォーマットチェック

## ESLint と Prettier を使用したコードフォーマット

SoybeanJS チームは @soybeanjs/eslint-config を使用してコードフォーマットを行います。この設定には、ESLint と Prettier の設定、およびいくつかのカスタムルールが含まれています。

## コードチェック

### lint-staged

`lint-staged`をインストール:

```bash
pnpm i lint-staged -D
```

`package.json` に追加:

```json
{
  "lint-staged": {
    "*": "eslint --fix"
  }
}
```

### simple-git-hooks

`simple-git-hooks` をインストール:

```bash
pnpm i simple-git-hooks -D
```

`package.json` に Git フックを追加:

```json
{
  "simple-git-hooks": {
    "commit-msg": "pnpm sa git-commit-verify",
    "pre-commit": "pnpm typecheck && pnpm lint-staged"
  }
}
```

`package.json` にスクリプトを追加:

```json
{
  "scripts": {
    "prepare": "simple-git-hooks"
  }
}
```

::: tip ヒント
`simple-git-hooks` の設定を変更または解除する場合は、まず `package.json` の `simple-git-hooks` の設定を変更し、その後 `pnpm run prepare` を実行して反映させてください。
:::
