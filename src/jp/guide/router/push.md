# ルート遷移

プロジェクト内では、通常の `router.push` などの方法を使用してルート遷移を行うことができますが、プロジェクト内で提供されている `useRouterPush` を使用して遷移することもできます（推奨）。このセクションでは、主に `useRouterPush` を紹介します。

## 介绍

このhookは、`router.push` を二重にラップしています。主な目的は `router.push` の代わりに使用することで、遷移をより簡便に行うことができる点です。`useRouterPush` はオブジェクトを返し、以下のプロパティとメソッドが含まれています：

- routerPush: Vue Router の push メソッド。
- routerBack: Vue Router の back メソッド。
- routerPushByKey: ルートキーに基づいて遷移するメソッド。
- toLogin: ログインページに遷移するメソッド。
- toggleLoginModule: ログインモジュールを切り替えるメソッド。
- redirectFromLogin: ログインページからリダイレクトするメソッド。

::: warning 注意
`setup` 外で使用する場合は、`useRouterPush` に `false` を渡す必要があります。
:::

## 詳細説明

`routerPush` と `routerBack` は元々のプロパティなので、ここでは詳しく説明しません。主に以下のメソッドを紹介します。

### routerPushByKey

ここでの `key` はルートの `name` プロパティを指します。例えば、あるルートの設定が以下のようになっている場合：

```json
{
  "name": "soybean",
  "path": "/soybean-page",
  "component": "layout.base$view.soybean-page"
}
```

このルートに遷移するコードは以下のようになります：

```ts
import { useRouterPush } from '@/hooks/common/router';

const { routerPushByKey } = useRouterPush();

routerPushByKey('soybean');
```

このメソッドは、オプションで `query` や `params` を渡すことができます。

### toLogin

文字通り、ログインページに素早く遷移するメソッドです。遷移前にログイン情報を削除することを忘れないでください。さもないと、ルートガードでホームページにリダイレクトされてしまいます。

### toggleLoginModule

このメソッドの引数の型は次のようになります：

```ts
/**
 * The login module
 *
 * - pwd-login: パスワードログイン
 * - code-login: 電話番号コードログイン
 * - register: 登録
 * - reset-pwd: パスワードリセット
 * - bind-wechat:  WeChat バインド
 */
type LoginModule = 'pwd-login' | 'code-login' | 'register' | 'reset-pwd' | 'bind-wechat';
```

このメソッドは、渡された `LoginModule` に基づいてログインページにマウントされるログイン機能モジュールを変更します。必要に応じてモジュールを削除または拡張できますが、型が正しいことを確認すれば問題ありません。

### redirectFromLogin

ログイン成功後に使用されます。手動でホームページに遷移するよりも直感的です。
このメソッドは、ログインページの `redirect` クエリパラメータを使用してどのルートにリダイレクトするかを決定します。もし `redirect` パラメータがない場合は、デフォルトでホームページに遷移します。

## 使用方法

```vue
<!-- ある.vueファイル -->
<script lang="ts" setup>
import { useRouterPush } from '@/hooks/common/router';

const { routerPushByKey } = useRouterPush();
</script>

<template>
  <div>
    <NButton type="primary" @click="routerPushByKey('root')">返回首页</NButton>
  </div>
</template>
```

```ts
<!-- ある.tsファイル -->
import { useRouterPush } from '@/hooks/common/router';

// 注意して false を渡す
const { routerPushByKey } = useRouterPush(false);

function backToRoot() {
  routerPushByKey('root')
}
```
