# システムルート

本システムのルートはプラグイン [Elegant Router](https://github.com/soybeanjs/elegant-router) に基づいています。詳細な使用方法はプラグインドキュメントをご確認ください。

::: danger 警告
`<Transition>` タグを使用してページの移行アニメーションを対応しているため、`.vue` ファイルの `template` 内には根要素が1つだけ必要です。注釈や純文字は含めてはいけません。必ず1つの根タグのみにしてください。
関連文書: [Transition | Vue.js (vuejs.org)](https://cn.vuejs.org/guide/built-ins/transition.html#the-transition-component)
:::

## 自動生成

プロジェクトを起動すると、プラグインは `src/router/elegant` ディレクトリを自動生成します。このディレクトリ下のファイルは、自動生成されたルートの読み込み、ルート定義、ルート変換を含むファイルです。

> [!IMPORTANT]
> ルートはファイルの副産物のため、ルートを削除する場合はファイルを削除してください。<br>ルートがファイルと共に消えます。<br>ルートの変更が可能なのは `component` と `meta` の情報のみです。自動生成エンジンはこれらの属性に影響を与えません。

## 設定プロパティ

### 1. type RouteKey

**解説:**

連合型 `RouteKey` はすべてのルートキーを売っています。これによりルートを統一的に管理できます。この型は [Elegant Router](https://github.com/soybeanjs/elegant-router) が `views` 配下のファイルを元に自動生成します。

::: tip コード位置
src/typings/elegant-router.d.ts
:::

### 2. type RoutePath

**解説:**

ルートのパス (`path`)の型。 `RouteKey` と一一寸で対応しています。

### 3. type RouteMeta

```typescript
// ルート元情報インタフェース
interface RouteMeta {
  /**
   * ルートタイトル
   *
   * 文書タイトルとして使用可能
   */
  title: string;
  /**
   * ルートの国際化キー
   *
   * i18n の値が設定された場合、title は無視されます
   */
  i18nKey?: App.I18n.I18nKey;
  /**
   * ルートのロールリスト
   */
  roles?: string[];
  /**
   * このルートをキャッシュす
   */
  keepAlive?: boolean;
  /**
   * 定数ルートかどうか
   *
   * ログイン不要であり、かつこのルートはフロントエンドで定義される
   */
  constant?: boolean;
  /**
   * Iconify アイコン
   *
   * メニューまたはパンくずリストで使用可能
   */
  icon?: string;
  /**
   * ローカルアイコン
   *
   * "src/assets/svg-icon" ディレクトリに存在し、設定された場合は icon プロパティが無視される
   */
  localIcon?: string;
  /** ルートのソート順 */
  order?: number;
  /** ルートの外部リンク */
  href?: string;
  /** メニューにこのルートを非表示にするかどうか */
  hideInMenu?: boolean;
  /**
   * このルートに入った際にアクティブになるメニューキー
   *
   * このルートがメニューに存在しない場合
   *
   * @example
   *   例えばルートが "user_detail" の場合、"user_list" に設定すると「ユーザーリスト」メニュー項目がアクティブになる
   */
  activeMenu?: import('@elegant-router/types').RouteKey;
  /** デフォルトでは同じパスのルートはタブを共有するが、true に設定すると複数のタブを使用 */
  multiTab?: boolean;
  /** 設定すると、ルートはタブに固定表示され、その値は固定タブの順序を示す（ホームは特別で、自動的に固定される） */
  fixedIndexInTab?: number;
  /** ルートのクエリパラメータ。設定すると、メニューからこのルートに入る際に自動で query パラメータを付与 */
  query?: { key: string; value: string }[] | null;
}
```

::: tip ヒント
icon 图标值从这里获取：[https://icones.js.org/](https://icones.js.org/)
:::

## 注意

views フォルダ内にルートページを作成し、他の場所で呼び出すがメニューには表示しない場合、meta の `hideInMenu: true` を設定する必要があります。

```typescript
{
    name: '403',
    path: '/403',
    component: 'layout.blank$view.403',
    meta: {
      title: '403',
      i18nKey: 'route.403',
      hideInMenu: true
    }
}
```
