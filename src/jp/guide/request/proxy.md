# プロキシ

## 概要

プロジェクト内で、createServiceConfig 関数を使用してサービスの基本パスとマッチングプロキシの文字列を作成します。

::: tip コード位置
@/utils/service.ts
:::

次に、createViteProxy 関数内で、上記で取得した設定に基づいてプロキシを作成します。

## 有効化/無効化

`env` ファイルの `VITE_HTTP_PROXY` を使ってプロキシを有効または無効にできます。

::: tip コード位置
~.env
:::

`@/service/request/index.ts` `では、getServiceBaseURL` の第二引数にコード実行環境と `VITE_HTTP_PROXY` を基にした `isHttpProxy` を渡して、URLがプロキシを通すべきかどうかを判断します。ここで、異なるパラメータを渡して、必要なリクエストURLを取得できます。

```
const isHttpProxy = import.meta.env.DEV && import.meta.env.VITE_HTTP_PROXY === 'Y';
const { baseURL } = getServiceBaseURL(import.meta.env, isHttpProxy);
const { otherBaseURL } = getServiceBaseURL(import.meta.env, false);
```

## 原理

SoybeanAdmin は、プロキシ設定を簡素化するために、マッチング文字列として `/proxy-default/` （その他のリクエストは `proxy-{key}`）を設定しています。これにより、プロキシ設定時にはリクエストのURL内の `/proxy-default/` を実際のリクエストURLに置き換えるだけで、プロキシ設定が実現できます。

```ts
{
  '/proxy-default': {
    target: 'https://default.com',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/proxy-default/, ''),
  },
  '/proxy-demo': {
    target: 'https://demo.com',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/proxy-demo/, ''),
  }
}
```

### 注意

ここで紹介する2つの混乱しやすい設定について説明します：

1. リクエストのパスが https://example.com/api/user の場合、多くの場合、以下のようにプロキシを設定します。

```ts

{
  '/api': {
    target: 'https://example.com',
    changeOrigin: true,
  }
}

```

> この場合、`/api` はマッチング文字列であり、リクエストのパスでもあります。したがって、`rewrite`設定は不要です。リクエストパスとマッチング文字列が同じだからです。

2. リクエストのパスが `https://example.com/user` で、プロキシ設定時にマッチング文字列が `/api` の場合、以下のように設定します。

```ts

{
  '/api': {
    target: 'https://example.com',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api/, ''),
  }
}

```

> この場合、`/api` はマッチング文字列として使用され、`user` がリクエストのパスです。したがって、`rewrite` 設定が必要です。マッチング文字列を取り除くためです。

SoybeanAdmin では、複数のサービスのプロキシをサポートするため、また、複数のサービスで同じ /api パスを含む可能性を避けるため、rewrite 設定を含む第二の方法を使用しています。そのため、SoybeanAdmin はマッチング文字列とリクエストパスを分けるために、/proxy-\* のような形式で設定を作成し、衝突を回避しています。
