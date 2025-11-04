# よくある質問

::: tip
ここではよくある質問をいくつか挙げています。解決策が見つからない場合は、[GitHub issue](https://github.com/honghuangdc/soybean-admin/issues)でフィードバックしてください。
:::

## 前言

問題に直面した際は、以下の解決策を試してみてください。

- まず、重要なエラーメッセージや問題のコンテキストを特定します。
- エラーのキーワードを使用して、検索エンジン、技術的なウェブサイト、AIツールなどで検索します。

| [Google](https://google.com) | [Bing](https://www.bing.com/) | ChatGPT | [StackoverFlow](https://stackoverflow.com/) |
| ---------------------------- | ----------------------------- | ------- | ------------------------------------------- |

- 依存パッケージのエラーであれば、依存パッケージのGitHub Issuesで検索してみてください。
- 知っている友人や技術者に相談してみてください。
- SoybeanAdminの公式グループに質問を投稿してください。問題をできるだけ明確に説明し、他の人がより良くサポートできるようにします。質問する際は[提問の智慧](https://github.com/tvvocold/How-To-Ask-Questions-The-Smart-Way)を参考にしてください。

## SoybeanAdmin キャッシュに関する問題

**問題の背景**

SoybeanAdminプロジェクトの設定では、デフォルトで `localStorage` が使用され、プロジェクトのテーマ関連のデータが初期化時に永続化されます。

キャッシュは以下の2つの方法に分かれています：

- LocalStorage
- SessionStorage

**キャッシュのポイント**

1. このフレームワークのキャッシュ関連の使用は、主に以下のメソッドに集約されています：
   - set：必須のパラメーター `key` 、`value` とオプションのパラメーター `expire` を使ってデータをキャッシュします
   - get：必須のパラメーター `key` を使ってキャッシュされたデータを取得します
   - remove：必須のパラメーター `key` を使って指定したキャッシュデータを削除します。
   - clear：このメソッドを呼び出すことで、現在のすべての `Storage` 関連のキャッシュデータを削除します
2. キャッシュされるデータのタイプは、`src/typings/storage.d.ts` で事前に定義する必要があります

## ファイル変更に関する問題

1. .env などの環境ファイルや vite.config.ts ファイルを変更した場合、vite は自動的にサービスを再起動します。

> ただし、再起動に問題が生じることがあります。再度プロジェクトを実行すると解決する場合があります。

2. .vue や .ts ファイルを変更した場合、vite のホットリロードでページが一時的にカクつき、リアルタイムで変更が反映されないことがあります

> `F5` を押してリフレッシュすると解決できます

## フロントエンド静的ルーティングにメニューを追加した後に表示されない

📢 初めてプロジェクトを触ったユーザーから、先にコンポーネントを追加してから静的ルーティングを追加したが、メニューやページが表示されないというフィードバックがありました。プロジェクトにエラーは表示されません。

問題の背景

プロジェクトが初期化される際、そのユーザーのトップレベルのルートデータの meta に `hideInMenu` プロパティが `true`

になっていたため、メニューやページが表示されませんでした。

::: tip コンポーネントの位置
src/typings/router.d.ts
:::

[`RouteMeta`](../guide/router/intro.md#システムルート) の設定については こちら を参照してください。

**解決策:**

`hideInMenu` プロパティを削除することで、メニューとページが正しく表示されます。

## プロジェクトの権限ルーティングモードの理解と対応するレンダリングルーティングデータの定義方法

**問題の背景**

プロジェクトの権限ルーティングモードは以下の2つに分かれます：

- 静的ルーティング

  静的ルーティングとは、フロントエンドプロジェクトの `src/router/routes.ts` に定義されたルートデータです。
  プロジェクトは、このパスで定義されたルートデータを解析し、メニュー情報を自動的にレンダリングします。

- 動的ルーティング

  動的ルーティングとは、バックエンドから送られるルートデータです

> プロジェクトが動的ルーティングモードでデータをレンダリングする場合、ルートのホームページの name 値が自動的に上書きされます。

## タブのページを切り替えた後に空白のページが表示される

📢 開発環境で`タブの切り替え後に空白のページが表示される`とフィードバックをもらいました。

---

これは、ルート切り替えアニメーションが有効になっており、対応するページコンポーネントに複数のルート要素が存在するために発生しています。
ページの最外層に `<div></div>` を追加することで解決できます。

❌ **错误示范**

```vue
<template>
  <!-- コメントもタグノードとして扱われます  -->
  <p1></p1>
  <p2></p2>
</template>
```

✔ **正しい例**

```vue
<template>
  <div>
    <p1></p1>
    <p2></p2>
  </div>
</template>
```

## コンポーネント命名の問題

> 📢 開発者から、プロジェクトの高品質コードスタイルを継続するために、相対的に科学的な命名規則を学びたいというフィードバックをもらいました。しかし、具体的な形式がないとのことです。

**命名規則**

- ファイル命名：すべて小文字で命名し、複数の単語はハイフンでつなぎます。

```
views
├── home
├── demo-page
```

- Vueコンポーネント名
  - コンポーネント名はPascalCaseで命名し、複数の単語は最初の文字を大文字にします

  ```vue
  <template>
    <AppProvider>
      <RouterView class="bg-layout" />
    </AppProvider>
  </template>
  ```

  - Iconifyアイコンコンポーネント名はkebab-caseで命名し、複数の単語はハイフンでつなぎます

  ```vue
  <template>
    <icon-mdi-emoticon />
  </template>
  ```

  > iconifyプラグインがアイコンを直接表示するために便利です

- 関数、クラス、TSタイプの命名：PascalCaseで命名し、複数の単語の最初の文字を大文字にします

```ts
function Person() {}

class Person {}

type Person = {
  name: string;
};

interface Person {
  name: string;
}
```

- 変数、普通の関数の命名：camelCaseで命名し、複数の単語は最初の文字を小文字にします

```ts
let num: number = 1;

function getNum() {}
```

- 定数命名：大文字で命名し、複数の単語はアンダースコアでつなぎます

```ts
const MAX_COUNT = 10;
```

- スタイル命名：すべて小文字で命名し、複数の単語はハイフンでつなぎます

```css
.container {
}

.container-item {
}
```

## 环境问题

> 依存関係のインストールエラーや起動エラーなどが発生した場合、まずはコンピュータ環境が整っているか確認してください。

ローカル環境で必要なもの

- [Git](https://git-scm.com/)

---

- **NodeJS**: >=18.0.0，推奨は18.19.0以降。
  > [volta](https://volta.sh/) や [fnm](https://github.com/Schniz/fnm) を使用してNodeJSバージョンを管理できます。
- **pnpm**: >= 8.0.0，推奨は最新バージ。

## 依存関係のインストール問題

- ネットワークの問題を確認する
- ミラーソースの問題を確認する
- 依存パッケージのバージョンの問題を確認する

**ミラー設定**

> プロジェクトのデフォルトミラー設定ファイル .npmrc の設定項目について

🎯 ファイルの場所：`.npmrc`

```
registry=https://registry.npmmirror.com/
shamefully-hoist=true
ignore-workspace-root-check=true
```

- `registry`：npmパッケージのミラーソースを指定します。本プロジェクトでは、淘宝（ALIBABA）の最新ミラーを使用しています。。
- `shamefully-hoist`：依存関係をできるだけ高い階層にホイストし、依存関係の共有を促進するオプションです
- `ignore-workspace-root-check`：ルートパスで依存関係をインストールする際にワークスペースのルートチェックを無視します。つまり、`-w`パラメーターを指定する必要はありません

> 完全なコードの例 SoybeanAdmin🔜 [SoybeanAdmin🔜](https://github.com/soybeanjs/soybean-admin/blob/main/.npmrc)

## コードを最新の状態に保つ方法

このプロジェクトを使って開発している場合、開発中に最新のコードを同期したいときの方法です。複数のソースを設定する方法があります。

- リポジトリをクローン

```bash
git clone https://github.com/soybeanjs/soybean-admin.git
```

- 自分のGitソースアドレスを追加

```bash
# up は任意のソース名に設定できます
# gitUrl は自分のGitソースアドレス
git remote add up gitUrl;
```

3.  自分のGitにコードをコミット

```bash
# 自分のGitリポジトリにコードをコミット
# mainはブランチ名なので、状況に応じて変更してください
git push up main

# 自分のコードを同期
# mainはブランチ名なので、状況に応じて変更してください
git pull up main
```

4.  オープンソースの最新コードを同期する方法

```bash
git pull origin main
```

> Gitでコード管理を行っている場合、まず更新し、競合が発生した場合は解決後にマージしてください

## なぜ Day.js を使用するのか

Day.js は、モダンなブラウザで日付と時刻を解析、検証、操作、表示するための極めてシンプルなJavaScriptライブラリです。

**Day.js を使用する理由**

ファイルサイズは2KB程度で、JavaScriptのダウンロード、解析、実行が少なく、コードに余分な時間を残します。

**サンドボックス機構**

変更を加えるすべての Day.js オブジェクトの操作は、新しいインスタンスを返します。これにより、バグを防ぎ、長時間のデバッグセッションを避けることができます。

**国際化**

Day.jsは、国際化に大きなサポートを提供しています。ただし、使用しない限り、それらはビルドに含まれません。

## クロスオリジン（CORS）の問題

### 概念

クロスオリジン（Cross-Origin）とは、ブラウザにおいて、現在のウェブページが異なるドメイン、ポート、またはプロトコルからリソースを要求することを意味し、安全ポリシーにより制限され、クロスオリジンの問題が発生します。

**跨域的形成原因**

- 同一生成元ポリシー：ブラウザのセキュリティポリシーが、ページが同一のドメインからのみリソースをリクエストできるように制限しているため、異なるドメインからのリソースはアクセスできません。
- ドメインが異なる：要求されているリソースが異なるドメインにある場合（例：[http://www.aaa.com] と [http://www.bbb.com]）
- ポートが異なる：リソースが同一ドメインにあるがポートが異なる場合（例：[http://www.xxx.com] と [http://www.xxx.com:8080]）
- プロトコルが異なる：リソースが同一ドメインにあるが、プロトコルが異なる場合（例：[http://www.xxx.com] と [https://www.xxx.com]）

**プロキシの種類**

1. 正向プロキシ

正向プロキシはクライアント側のプロキシで、サーバーは実際にリクエストを送信しているクライアントを知りません.\_

> 本プロジェクトでは、`Vite`の設定で正向プロキシを実装しています

2. 逆向プロキシ

<u>逆向プロキシ（Reverse Proxy）は、サーバーがクライアントからのリクエストを受け取り、そのリクエストをバックエンドのサーバーに転送するサーバー構成です。クライアントは、実際にバックエンドサーバーと通信していることを知らず、すべてのやり取りは逆向プロキシサーバーを通じて行われます。</u>

> 一般的には、`dist` フォルダを `Nginx` サーバーにデプロイした後、`nginx.conf` を設定することで逆向プロキシを実現します。

### 一般的な解決策

実際の開発シーンでは、クロスオリジンに関する問題は次の2種類のケースが考えられます。

**ローカル開発環境でのクロスオリジン**

ローカル開発時によく使われる3つの方法で対処します：

1. Vite のProxy設定による正向プロキシ（本プロジェクトのローカル開発環境ではこの方法を使用）
2. バックエンドサーバーで CORS を有効化
3. フロントエンドサーバーで Nginx を使用して逆向プロキシを設定

> ローカル開発環境では、デフォルトでローカルプロキシが有効です。

**本番環境でのクロスオリジン**

プロジェクトを本番環境にデプロイした後、一般的には Nginx を使ってリクエストをバックエンドサーバーに転送します

- SoybeanAdmin

🎯 ファイルの場所： `./env-config.ts`

```ts
# 关键代码如下所示

/** リクエストサービスの環境設定 */

const serviceConfigMap: App.Service.ServiceConfigMap = {
  dev: {
    baseURL: mockURL,
    otherBaseURL: {
      demo: 'http://localhost:9528'
    }
  },
  test: {
    baseURL: mockURL,
    otherBaseURL: {
      demo: 'http://localhost:9529'
    }
  },
  prod: {
    baseURL: mockURL,
    otherBaseURL: {
      demo: 'http://localhost:9530'
    }
  }
};
```

> 完全なコードの例 [SoybeanAdmin🔜](https://github.com/soybeanjs/soybean-admin/blob/main/env-config.ts)

⚙ Nginx 設定の参考

```java
# nginx.conf

server {
  listen       8080;
  server_name  localhost;

  # インターフェースプロキシ、クロスオリジン問題の解決
  location /url {
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

    # バックエンドインターフェースのURL
    proxy_pass http://xxx.xxx.xx.x:8080/api;

    proxy_redirect default;
    add_header Access-Control-Allow-Origin *;
    add_header Access-Control-Allow-Headers X-Requested-With;
    add_header Access-Control-Allow-Methods GET,POST,OPTIONS;
  }
}

```

このようにして、`http://localhost:8080` からこのデプロイされたプロジェクトのホームページにアクセスできます

> プロジェクトの本番環境ポートは、`nginx.conf` 内の `listen` 設定と一致する必要があります

> バックエンドサービスが `CORS` を有効化していれば、フロントエンドサービスでは追加の設定は必要ありません

## vscodeのi18nAllyプラグインで新しい言語を追加できない

参考：[fix(utils): 修正Windowsシステムでvscodeのi18nAllyプラグイン #630](https://github.com/soybeanjs/soybean-admin/pull/630)

## プロジェクトで Iframe を使用してローカル HTML を埋め込んだ際に 404 エラーが発生する問題

📢 熱心なグループメンバーからのフィードバック: プロジェクトの開発中に、プロジェクト内で Iframe を使用してローカルの HTML ファイルを埋め込む必要があるが、埋め込んだ後にページが表示されず、404 ページが表示されるという問題が発生しています。

**問題の背景**

プロジェクトは単一ページアプリケーション (SPA) であり、パスから異なる HTML を読み込むことはサポートされていません。つまり、複数ページアプリケーションを作成するか、SPA の中で Iframe を使用して他の HTML を読み込む必要があります。

**解決策**

`vite-plugin-mpa` プラグインを統合します。

## ビルド後にリフレッシュすると 404 ページが表示される

**問題の背景**

プロジェクトをビルドした後：

- 開発環境: live Server などのプラグインを使ってローカルでビルド後の index.html を起動し、リフレッシュすると 404 が発生。
- 本番環境: サーバーにデプロイした後、リフレッシュすると 404 が発生。

**問題の原因**

システムでデフォルトで使用されるルーティングモードは `history` モードです。しかし、`Nginx` などの Web サーバーは静的ファイルに基づいているため、`/login` などのリクエストが来た際に、`Nginx` は `login.html` というファイルを探します。見つからないと 404 が発生します。このため、このモードではバックエンドの協力が必要で、すべてのリクエストを `index.html` にリダイレクトし、具体的なルーティング情報は `vue-router` に処理させます。

**解決策**

開発環境でビルド後の産物をプレビューする：

- `pnpm preview` コマンドを使用してプレビューを起動します。

本番環境：

- `Nginx` の設定例（他の Web サーバーについては適宜調べてください）

```java
# nginx.conf

server {
  listen 80;
  listen [::]:80;
  server_name localhost;

  location / {
    root /usr/share/nginx/html;
    index index.html index.htm;
    try_files $uri $uri/ /index.html; // [!code ++]
  }

  error_page 500 502 503 504 /50x.html;
  location = /50x.html {
    root /usr/share/nginx/html;
  }
}
```

- ルーティングモードを変更する

もし Web サーバーを変更できない場合は、フロントエンドのルーティングモードを `hash` に変更することで、この問題を回避できます。

::: tip コードの場所
./env
:::

```dotenv{5}
# whether to enable http proxy when is dev mode
VITE_HTTP_PROXY=Y

# vue-router mode: hash | history | memory // [!code focus:2]
VITE_ROUTER_HISTORY_MODE=hash

# success code of backend service, when the code is received, the request is successful
VITE_SERVICE_SUCCESS_CODE=0000
```
