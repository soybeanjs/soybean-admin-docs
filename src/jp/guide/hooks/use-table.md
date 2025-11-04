# useTableHook 関数

---

`useTableHook` は、`SoybeanAdmin`向けに設計されたテーブルデータ処理のためのフック（Hook）であり、バックエンドAPIとの適応、データ処理、列の表示/非表示制御、データの遅延ロードなどの機能を簡単に実装できる豊富な設定オプションを提供します。本ドキュメントでは、各設定オプションの詳細を説明し、このフックをよりスムーズに活用できるようにします。

::: warning 注意
プロジェクト内には関連する関数が2つあり、それぞれ `useTable` と `useHookTable` です。`useTable` は `useHookTable` のサンプル実装となっているため、読み進める際は区別してください。

:::

[[toc]]

## はじめに

プロジェクト内では、`useHookTable` を基に `useTable` という基本関数を実装しており、一部の操作を簡略化することで、よりスムーズな画面操作を実現しています。この `useTable` は、一般的なテーブルデータ処理の要件を満たす汎用的な実装となっており、多くのシナリオで活用できます。もし特殊な要件がある場合は、本ドキュメントの設定オプションを参考にして、独自の `useTable` 関数を作成してください。

## useHookTable の説明

> プロジェクト内の `useTable` はすべて `useHookTable` に基づいています。そのため、まず `useHookTable` の設定オプションと使用方法を理解することが重要です。

`useHookTable` は、テーブルデータの取得、変換、表示を処理するカスタムフックです。この関数は設定オブジェクトを受け取り、処理後の状態値を返します。

### 設定オプション

- `apiFn`
  - 型：関数
  - 必須ですか：はい
  - 説明：テーブルデータを取得する関数で、`Promise` を返す必要があります。また、適切なパラメータと戻り値の型を提供する必要があります。

- `apiParams`
  - 型：对象
  - 必須ですか：はい
  - 説明：`apiFn` を呼び出す際に必要なパラメータ。

- `transformer`
  - 型：関数
  - 必須ですか：はい
  - 説明：`apiFn` のレスポンスをテーブルデータに変換するための関数。

- `columns`
  - 型：関数
  - 必須ですか：はい
  - 説明：テーブルの列を定義する配列を返す。

- `getColumnChecks`
  - 型：関数
  - 必須ですか：はい
  - 説明：`columns`を引数に取り、`key`、`title`、`checked` プロパティを持つオブジェクトの配列を返す。

- `getColumns`
  - 型：関数
  - 必須ですか：はい
  - 説明：`columns` と `checks` を受け取り、表示すべき列のリストを返す。

- `onFetched`
  - 型：関数
  - 必須ですか：いいえ
  - 説明：データ取得および変換後に呼び出されるコールバック関数。

- `immediate`
  - 型：ブール値
  - 必須ですか：いいえ
  - 説明：データを即時取得するかどうか（デフォルト：true）。

#### `transformer` と `onFetched` の違い

両者ともデータ変換に関係しますが、焦点が異なります：

- `transformer` は必須の関数で、その役割は `apiFn` のレスポンスをテーブルデータに変換することです。この関数は `apiFn` のレスポンスを引数として受け取り、変換後のテーブルデータとページング情報を含むオブジェクトを返します。この関数の主な焦点はデータの変換であり、APIから取得した生データをテーブルに表示するためのデータに変換することです。
- `onFetched` はオプショナルな関数で、レスポンスが取得されて変換された後に呼び出され、変換後のデータを引数として受け取ります。この関数の主な焦点は、データの取得と変換が完了した後に追加の操作を実行することです。たとえば、ステータスの更新やログの出力などです。この関数はデータを変更することなく、データの取得と変換が完了した後に副作用を実行するだけです。

### 戻り値

`useHookTable` は次のプロパティを持つオブジェクトを返します。

- `loading`:
  - 型：ブール値
  - 説明：データが読み込まれているかどうかを示します。`apiFn` が呼び出されると、`loading` は `true` に設定され、データが取得され変換が完了すると、`loading` は `false` に設定されます。

- `empty`:
  - 型：ブール値
  - 説明：取得したデータが空であるかどうかを示します。`transformer` によって変換されたデータが空の配列である場合、`empty` は `true` に設定されます。

- `data`:
  - 型：数组
  - 説明：変換後のテーブルデータを含みます。

- `columns`:
  - 型：数组
  - 説明：表示するべき列を含みます。

- `columnChecks`:
  - 型：数组
  - 説明：列のチェック情報を含みます。各要素はオブジェクトで、`key`、`title`、`checked` のプロパティを持ち、それぞれ列のキー、タイトル、選択されているかどうかを表します。

- `reloadColumns`:
  - 型：関数
  - 説明：列を再読み込みするための関数です。この関数を呼び出すと、`columns` 関数が再度呼び出され、その後 `getColumnChecks` と `getColumns` を使用して、どの列を表示するべきかを決定します。

- `getData`:
  - 型：関数
  - 説明：データを取得するための関数です。この関数を呼び出すと、`apiFn` がデータを取得し、その後 `transformer` によってレスポンスがテーブルデータに変換されます。

- `searchParams`:
  - 型：对象
  - 説明：apiFn を呼び出す際のパラメータを含みます。

- `updateSearchParams`:
  - 型：関数
  - 説明：`searchParams` を更新するための関数です。この関数はオブジェクトを引数として受け取り、そのオブジェクトのプロパティが `searchParams` にマージされます。

- `resetSearchParams`:
  - 型：関数
  - 説明：`searchParams` をリセットするための関数です。この関数を呼び出すと、`searchParams` は `apiParams` にリセットされます。

### 使用方法

`useHookTable` は非常に汎用的なフックで、ページ上で直接呼び出して使用できます。この方法の利点は、シンプルで直接的な点です。ページコンポーネント内で簡単にテーブルデータを取得して処理できます。
しかし、プロジェクトに類似したテーブルページが多く存在する場合は、`useHookTable` を基にラップしてさらに封装する方がよい場合もあります。
新しいフックを作成し、`useHookTable` を基にして、例えば apiFn や transformer などのデフォルト設定を提供することができます。これにより、テーブルページはより簡潔になり、特定の設定（例えば `apiParams` や `columns` など）だけを提供すればよくなります。 <br />

以下は、ページ内で `useHookTable` を直接使用する簡単な例です。実際の状況に応じて調整が必要です。

```vue
<script setup lang="tsx">
import { ref } from 'vue';
import { fetchGetUserList } from '@/service/api';
import useHookTable from '@sa/hooks';

const apiParams = ref({
  current: 1,
  size: 10
});

const columns = () => [
  {
    key: 'userName',
    title: 'User Name',
    align: 'center',
    minWidth: 100
  }
  // ...その他の列設定
];

const getColumnChecks = columns => columns.map(column => ({ key: column.key, title: column.title, checked: true }));

const getColumns = (columns, checks) =>
  columns.filter(column => checks.find(check => check.key === column.key && check.checked));

const transformer = response => ({
  data: response.data,
  pageNum: response.pageNum,
  pageSize: response.pageSize,
  total: response.total
});

const { loading, empty, data, getData } = useHookTable({
  apiFn: fetchGetUserList,
  apiParams,
  transformer,
  columns,
  getColumnChecks,
  getColumns,
  immediate: true
});

// データが必要な場合、例えばコンポーネントのマウント後やユーザーが更新ボタンをクリックしたときに getData 関数を呼び出す
getData();
</script>
```

## `useTable` の紹介

`useTable` は `useHookTable` を基にした実装の一例で、いくつかのデフォルト設定（例えば `apiFn` や `transformer` など）を提供し、使いやすくなっています。プロジェクトに多くの類似のテーブルページがある場合、`useTable` を使用すると便利です。

### 設定項目

`useTable` 関数は、以下のプロパティを持つ設定オブジェクトを受け取ります：

- `apiFn`: テーブルデータを取得するためのAPI関数。

- `apiParams`: `apiFn` に渡すパラメータのオブジェクト。

- `immediate`: ブール値で、コンポーネントがマウントされた後に `apiFn` をすぐに呼び出すかどうかを決定します。デフォルトは `true`。

- `showTotal`: ブール値、ページングコンポーネントで総件数を表示するかどうかを決定します。デフォルトは `false`。

- `columns`: 配列で、テーブルの列を定義します。各要素は以下のプロパティを含むオブジェクトです：
  - `key`: 文字列,列の一意な識別子。
  - `title`: 文字列、列のタイトル。
  - `align`: 文字列、列の配置方法，（`'left'`、`'center'`、`'right'` など）。
  - `width`: 数字、列的宽度。
  - `minWidth`: 数値、列の最小幅
  - `render`: 関数，列の内容をカスタマイズするため。
  - その他の設定項目は `naive-ui` のドキュメントを参考にしてください。

示例：

```typescript
useTable({
  apiFn: getUsers,
  apiParams: { page: 1, size: 10 },
  immediate: true,
  showTotal: true,
  columns: [
    {
      key: 'userName',
      title: 'ユーザー名',
      align: 'center',
      minWidth: 100
    }
    // その他の列...
  ]
});
```

### 返回值

`useTable` 関数返回一个对象，该对象包含以下属性：

- `loading`: ブール値で、データのロード中かどうか。

- `empty`: ブール値，テーブルデータが空かどうか。

- `data`: 配列で，テーブルデータ。

- `columns`: 配列で，テーブル列。

- `columnChecks`: 配列で，テーブル列の選択状態。

- `reloadColumns`: 関数で，テーブル列を再読み込みします。

- `pagination`: オブジェクトで，テーブルのページング設定。

- `mobilePagination`: オブジェクトで、モバイルデバイス向けのテーブルページング設定。

- `updatePagination`: 関数，テーブルのページング設定を更新します。

- `getData`: 関数，テーブルデータを取得します。

- `searchParams`: オブジェクトで、検索パラメータ。

- `updateSearchParams`: 関数，検索パラメータを更新します。

- `resetSearchParams`: 関数，検索パラメータをリセットします。

示例：

```typescript
const {
  loading,
  empty,
  data,
  columns,
  columnChecks,
  reloadColumns,
  pagination,
  mobilePagination,
  updatePagination,
  getData,
  searchParams,
  updateSearchParams,
  resetSearchParams
} = useTable(config);
```

### 使用方法

プロジェクト内の `useTable` 関数は、`useHookTable` を基にした実装の一例で、いくつかのベストプラクティスを実現しています。例えば、デフォルト設定を提供し、よく使われる操作（検索、削除など）をラップしています。 <br />
使用する際には、`apiFn` を渡すだけで、関数のパラメーター型と `request` の戻り型を定義し、システムが自動的に `apiParams` や `columns` の `key` の型を推測します。そのため、データ処理とロジックにのみ集中すればよくなります。詳細はシステム管理内の管理ページを参照してください。
もし、プロジェクトに多くの類似のテーブルページが存在する場合、`useTable` 関数を使用すると便利です。

::: warning 注意
`useHookTable` では `transformer` を実装していません。多くのリストページが類似したAPIを使用していることを考慮し、`transformer` は `useTable` 内で記述されており、重複したコードの記述を減らすことができます。初回の呼び出し前に、`useTable` 内の `transformer` 関数を変更してバックエンドのAPIに適応させる必要があります。
:::

具体的なコードはここには記載しませんので、プロジェクト内の管理ページを直接確認してください。

## 注意点

### 型に関する説明

`useHookTable` は `apiFn` 関数の戻り型に基づいて自動的に column などのオブジェクトの型を処理します。したがって、`apiFn` 関数を定義する際には、戻り値の型を明確にする必要があります。

同様に、リクエストの戻り値はすでに型が決まっているため、`Common.CommonRecord`、`Common.PaginatingQueryRecord`、`CommonType.RecordNullable`、`Pick` などのツール型を使用して、各部分の型を迅速に決定できます。これらは基本的な操作であり、`main` ブランチの管理ページにサンプルがありますので、ここでは詳細に説明しません。

## 基本的な使用フロー

1. API 関数を定義する
2. useTable を設定する
3. transformer を設定する
4. 戻り値のデータと状態を使用する
5. ページングとフィルターを処理する

#### ステップ 1: API 関数を定義する

まず、API 関数を定義する必要があります。この関数はバックエンド API と通信して、テーブルデータを取得します。この関数は `Promise` を返す必要があります。`@/service/request` 内でラップされた関数はすでに `Promise` を返します。

```typescript
// api/userApi.js
import { request } from '../request';

// ユーザーリストを取得するAPI関数を定義
export function fetchGetUserList(params?: Api.SystemManage.UserSearchParams) {
  return request<Api.SystemManage.UserList>({
    url: '/systemManage/getUserList',
    method: 'get',
    params
  });
}
```

#### ステップ 2: `useTable` を設定する

`useTable` を使用する際は、設定オブジェクトを渡します。このオブジェクトには少なくとも `apiFn` と `columns` の2つのフィールドを含める必要があります。

- `apiFn`: ステップ 1 で定義した API 関数。
- `columns`: 表示するテーブルの列設定の集合。

```javascript
import { useTable } from '@/hooks/common/table';
import { fetchGetUserList } from '@/api/userApi';

const { data, loading, pagination } = useTable({
  apiFn: fetchGetUserList,
  columns: () => [
    {
      type: 'selection',
      align: 'center',
      width: 48
    },
    {
      key: 'index',
      title: '序号',
      align: 'center',
      width: 64
    },
    {
      key: 'userName',
      title: '用户名',
      align: 'center',
      minWidth: 100
    }
  ]
});
```

#### ステップ 3: `transformer` を設定する

`@/hooks/common/table` 内で `useTable` を設定し、`transformer` 関数をバックエンド API のデータ構造に適合させる必要があります。<br />

例えば、バックエンドが次のようなデータを返すと

```json
{
  "code": 200,
  "msg": "操作成功",
  "data": {
    "records": [
      {
        "userName": "小白"
      }
    ],
    "current": 1,
    "size": 10,
    "total": 1
}
```

説明：

- `records` はテーブルデータ
- `current` は現在のページ番号
- `size` は1ページあたりの件数
- `total` は総件数

したがって、`transformer` の実装は以下のようになります：

```typescript
transformer: res => {
  const { records = [], current = 1, size = 10, total = 0 } = res.data || {};

  // データ処理（例：インデックスを追加）
  const recordsWithIndex = records.map((item, index) => {
    return {
      ...item,
      index: (current - 1) * size + index + 1
    };
  });

  // 処理済みデータを返す
  return {
    data: recordsWithIndex,
    pageNum: current,
    pageSize: size,
    total
  };
},
```

#### ステップ 4: 返されたデータと状態を使用する

`useTable` の戻り値には、テーブルデータ（`data`）、ローディング状態（`loading`）、ページ情報（`pagination`）などが含まれます。これらをコンポーネント内で直接利用できます。

>     注意: NDataTable コンポーネントには remote 属性を設定する必要があります。設定しないと、ページネーションの状態が正しく動作しません。詳細は [NDataTable リモートデータ](https://www.naiveui.com/en-US/os-theme/docs/customize-theme) をご確認ください。

```vue
<script setup lang="ts">
import { useTable } from '@/hooks/common/table';
import { fetchUsers } from '@/api/userApi';

const { columns, columnChecks, data, loading, pagination, getData } = useTable({
  apiFn: fetchUsers,
  columns: () => [
    {
      type: 'selection',
      align: 'center',
      width: 48
    },
    {
      key: 'id',
      title: $t('page.manage.menu.id'),
      align: 'center'
    }
    // その他のカラム設定
  ]
});
</script>

<template>
  <div>
    <NButton @click="getData">データを取得</NButton>
    <NDataTable
      v-model:checked-row-keys="checkedRowKeys"
      :columns="columns"
      :data="data"
      size="small"
      :scroll-x="1088"
      :loading="loading"
      :row-key="row => row.id"
      remote
      :pagination="pagination"
      class="sm:h-full"
    />
  </div>
</template>
```

#### ステップ 5: ページネーションとフィルタリングの処理

テーブルがページネーションやフィルタリングをサポートする場合、`useTable` の `apiParams` を更新することで実現できます。`apiParams` はリアクティブなオブジェクトであり、ユーザーの操作に応じて動的に値を変更できます。`useTable` は `apiParams` の変更を検知し、自動的に `apiFn` を再実行して最新データを取得します。

```javascript
const { data, loading, pagination, updateSearchParams } = useTable({
  apiFn: fetchUsers,
  apiParams: reactive({ current: 1, size: 10, searchKey: '' }), // 初期パラメータ
  column: () => [
    // カラム設定
  ]
});

// 検索条件を更新
function search(searchKey) {
  updateSearchParams(params => {
    params.searchKey = searchKey;
    params.current = 1; // 1ページ目にリセット
  });
}
```

## よくあるユースケース

#### ケース 1：ネストされたデータ構造の処理

バックエンドのレスポンスがネストされたデータ構造になっている場合、一部のフィールドを展開する必要があります。

- **例**:

```typescript
transformer: res => {
  const flattenedData = res.data.records.map(record => ({
    ...record,
    address: record.address.street, // `address` がオブジェクトの場合、`street` のみを取得
  }));
  return {
    data: flattenedData,
    pageNum: res.data.pageNum,
    pageSize: res.data.pageSize,
    total: res.data.total,
  };
},
```

#### ケース 2：カスタムページネーションロジック

在某些情况下，后端的分页逻辑可能与前端的分页组件不完全兼容，需要在前端进行适配。

- **例**:

```typescript
transformer: res => {
  // バックエンドが「総件数」ではなく「総ページ数」を返す場合
  const totalRecords = res.data.pageNum * res.data.pageSize;

  return {
    data: res.data,
    pageNum: res.data.pageNum,
    pageSize: res.data.pageSize,
    total: totalRecords
  };
};
```

#### ケース 3：動的なフィルタリング

あるアプリケーションのシナリオでは、ユーザーの入力や選択に基づいて、テーブルデータのフィルタリング条件を動的に変更する必要がある場合があります。以下の例では、ユーザーの入力に基づいて `apiParams` を動的に更新し、データを再取得する方法を示します。

- **例**:

```typescript
const apiParams = reactive<TableParams>({
  pageSize: 10,
  pageNum: 1,
  filter: ''
});

// ユーザーの入力を基にフィルタを更新
function updateUserFilter(newFilter: string) {
  apiParams.filter = newFilter;
  // データ再取得（useTable が提供する fetchData を使用）
  fetchData();
}
```

#### ケース 4：表の基本操作

`useTableOperate` を使用すると、データの追加・編集・削除を簡単に管理できます。

- フィールド・メソッド一覧

| フィールド名       | 種類         | 説明                                                                                  |
| ------------------ | ------------ | ------------------------------------------------------------------------------------- |
| **drawerVisible**  | Ref モーダル | 表示操作抽屉（如添加或编辑表单的抽屉）的可见性                                        |
| **openDrawer**     | 関数         | モーダルを開く                                                                        |
| **closeDrawer**    | 関数         | 関数 モーダルを閉じる                                                                 |
| **operateType**    | Ref モーダル | 操作タイプ（‘add’ または ‘edit’）                                                     |
| **handleAdd**      | 関数         | データ追加処理。operateType を ‘add’ に設定し、モーダルを開く                         |
| **editingData**    | Ref モーダル | 現在編集中のデータ                                                                    |
| **handleEdit**     | 関数         | 編集処理。ID を指定してデータを取得し、operateType を ‘edit’ に設定してモーダルを開く |
| **checkedRowKeys** | Ref モーダル | 選択された行のキー（通常は ID）                                                       |
| **onBatchDeleted** | 非同期関数   | 一括削除処理（成功時にメッセージを表示しデータを更新）                                |
| **onDeleted**      | 非同期関数   | 単一行の削除処理（成功時にメッセージを表示しデータを更新）                            |
