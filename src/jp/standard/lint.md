# フォーマットチェック

## vite-plus を使用したコードフォーマット

SoybeanJS チームは [`vite-plus`](https://viteplus.dev/) でコードのフォーマットとチェックを統合しています。ルールは [`@soybeanjs/oxc-config`](https://github.com/soybeanjs/oxc-config) から取得します。

フォーマットとチェックの設定は `vite.config.ts` に記述します：

```ts
import { defineConfig } from 'vite-plus';
import { fmt, lint } from '@soybeanjs/oxc-config';

export default defineConfig({
  lint,
  fmt: {
    ...fmt,
    ignorePatterns: ['CHANGELOG.md']
  }
});
```

対応するコマンドは 2 つです：

```bash
# フォーマット
pnpm fmt

# チェックと自動修正
pnpm lint
```

## コードチェック

### vp staged

`vite-plus` は `lint-staged` を `vp staged` に置き換えました。チェック対象のステージ済みファイルのルールは `vite.config.ts` の `staged` フィールドに記述します：

```ts
import { defineConfig } from 'vite-plus';

export default defineConfig({
  staged: {
    '*': 'vp check --fix'
  }
});
```

### vp config（Git フック）

`vite-plus` は `simple-git-hooks` を `vp config` に置き換えました。フックスクリプトは `.vite-hooks/` ディレクトリに置き、`pre-commit` の内容は 1 行だけです：

```shell
vp staged
```

依存関係のインストール時にフックを自動でインストールするため、`package.json` にスクリプトを追加します：

```json
{
  "scripts": {
    "prepare": "vp config --no-agent"
  }
}
```

::: tip ヒント
`vite.config.ts` の `staged` 設定を変更したり、`.vite-hooks/` 配下のスクリプトを変更したりした場合は、`pnpm run prepare` を再実行するとフックが反映されます。現在のリポジトリの `core.hooksPath` は `.vite-hooks/_` を指しています。
:::
