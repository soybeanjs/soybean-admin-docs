# useTable 関数

`useTable` は、テーブルのデータ・列・ローディング状態を管理するための Vue フックです。データ取得、ページネーション、列の表示/非表示など、一般的なテーブル機能を柔軟に扱えます。

本ガイドでは、最新の `useTable` の使い方に加え、Naive UI 向けのラッパーである `useNaiveTable` と `useNaivePaginatedTable` を紹介します。

## クイック比較

- `useTable`：特定の UI ライブラリに依存せず、リクエスト・データ変換・列定義・列の表示/非表示（checks）のみを管理。
- `useNaiveTable`：`useTable` を基に Naive UI の列定義へ適合。`scrollX` を提供し、i18n 切り替え時に列を自動リフレッシュ。
- `useNaivePaginatedTable`：`useNaiveTable` を基に、ページネーション（`PaginationProps`）、モバイル向けページネーション `mobilePagination`、`getDataByPage` などを統合。
- `useTableOperate`：追加/編集/一括削除/単一削除の UI 状態とコールバックを共通化。
- `defaultTransform`：バックエンドの統一ページネーション構造を `PaginationData<T>` に変換。

## `useTable`

`useTable` は「データ駆動」にのみ注力し、具体的なテーブルコンポーネントや UI ライブラリには依存しません。データ取得・変換・列管理を柔軟に設定できます。

### 関数シグネチャ

```typescript
export default function useTable<ResponseData, ApiData, Column, Pagination extends boolean>(
  options: UseTableOptions<ResponseData, ApiData, Column, Pagination>
);
```

### `UseTableOptions` インターフェース

```typescript
export interface UseTableOptions<ResponseData, ApiData, Column, Pagination extends boolean> {
  /**
   * テーブルデータを取得する API 関数
   */
  api: () => Promise<ResponseData>;
  /**
   * ページネーションを有効にするか
   */
  pagination?: Pagination;
  /**
   * API レスポンスをテーブルデータへ変換する関数
   */
  transform: Transform<ResponseData, ApiData, Pagination>;
  /**
   * 列定義を返すファクトリー関数
   */
  columns: () => Column[];
  /**
   * 列のチェック情報を生成
   */
  getColumnChecks: (columns: Column[]) => TableColumnCheck[];
  /**
   * チェック情報から最終的な列を生成
   */
  getColumns: (columns: Column[], checks: TableColumnCheck[]) => Column[];
  /**
   * データ取得後のコールバック
   */
  onFetched?: (data: GetApiData<ApiData, Pagination>) => void | Promise<void>;
  /**
   * 初期化時に即座にデータ取得するか
   *
   * @default true
   */
  immediate?: boolean;
}
```

### 返り値

```ts
{
    loading: Ref<boolean, boolean>;
    empty: Ref<boolean, boolean>;
    data: Ref<ApiData[], ApiData[]>;
    columns: ComputedRef<Column[]>;
    columnChecks: Ref<TableColumnCheck[], TableColumnCheck[]>;
    reloadColumns: () => void;
    getData: () => Promise<void>;
}
```

### 説明

- `columnChecks` は列の表示/非表示を決定します。`columns()` はファクトリー関数で、呼び出すたびに列定義を再生成します。
- `reloadColumns` はチェック状態を維持したまま、現在のファクトリー関数の出力で列を再構築します（例：言語切替でタイトルが変わった際に呼び出す）。
- `pagination` が `true` の場合、`transform` は `PaginationData<ApiData>` を返し、その中の `data` をテーブルデータとして使用します。

### 使い方例

```typescript
import { useTable } from '@sa/hooks';
import type { UseTableOptions } from '@sa/hooks';
import type { PaginationData } from '@sa/hooks';
import type { DataTableColumns } from 'naive-ui';

interface User {
  id: number;
  name: string;
  email: string;
}

interface UserResponse {
  data: User[];
  total: number;
}

const columns = (): DataTableColumns<User> => [
  {
    key: 'id',
    title: 'ID'
  },
  {
    key: 'name',
    title: 'Name'
  },
  {
    key: 'email',
    title: 'Email'
  }
];

const {
  loading,
  data,
  columns: tableColumns,
  getData
} = useTable<UserResponse, User, DataTableColumns<User>, false>({
  api: fetchUsers, // Promise<UserResponse> を返す関数
  transform: response => response.data,
  columns,
  getColumnChecks: cols =>
    cols.map(col => ({ key: col.key as string, title: col.title!, checked: true, visible: true })),
  getColumns: (cols, checks) => cols.filter(col => checks.find(c => c.key === col.key)?.checked)
});

// データ取得
getData();
```

## `useNaiveTable`

`useNaiveTable` は `useTable` を Naive UI 向けにラップしたものです。`NaiveUI.TableColumn<T>` を使用し、横スクロール幅 `scrollX` を提供、i18n 変更時に列を自動リフレッシュします。

追加オプション：

- `getColumnVisible?: (column: NaiveUI.TableColumn<ApiData>) => boolean`
  - その列を「列表示/非表示パネル」に含めるかどうかを制御します（例：`selection/expand` 列をパネルに表示しない）。

追加の返り値：

- `scrollX: ComputedRef<number>`（`width/minWidth` の合計に基づき、`NDataTable` の横スクロールに利用）。

説明：

- `getColumnChecks` と `getColumns` を提供する必要はありません。Naive UI の列表示/非表示は内部で適合されています。
- `selection/expand` のように `key` がない列には、内部で安定した `key` が付与され、表示/非表示制御に参加します。

### 関数シグネチャ

```typescript
export function useNaiveTable<ResponseData, ApiData>(options: UseNaiveTableOptions<ResponseData, ApiData, false>);
```

### `UseNaiveTableOptions` インターフェース

```typescript
export type UseNaiveTableOptions<ResponseData, ApiData, Pagination extends boolean> = Omit<
  UseTableOptions<ResponseData, ApiData, NaiveUI.TableColumn<ApiData>, Pagination>,
  'pagination' | 'getColumnChecks' | 'getColumns'
> & {
  /**
   * get column visible
   *
   * @param column
   *
   * @default true
   *
   * @returns true if the column is visible, false otherwise
   */
  getColumnVisible?: (column: NaiveUI.TableColumn<ApiData>) => boolean;
};
```

### 使い方例

```typescript
import { useNaiveTable } from '@/hooks/common/table';

/** get user list */
function fetchGetUserList(params?: Api.SystemManage.UserSearchParams) {
  return request<Api.SystemManage.UserList>({
    url: '/systemManage/getUserList',
    method: 'get',
    params
  });
}

const searchParams: Api.SystemManage.UserSearchParams = reactive({
  current: 1,
  size: 999,
  status: null,
  userName: null,
  userGender: null,
  nickName: null,
  userPhone: null,
  userEmail: null
});

const { loading, data, columns, getData, scrollX } = useNaiveTable({
  api: () => fetchGetUserList(),
  transform: response => {
    const { data: list, error } = response;

    if (!error) {
      return list.records;
    }

    return [];
  },
  columns
});

// データ取得
getData();
```

> 注意：`fetchGetUserList` は戻り値の型を明示する必要があります。`useNaiveTable` は総称型を渡さなくても型推論が可能です。

## `useNaivePaginatedTable`

`useNaivePaginatedTable` は、ページネーションが必要な Naive UI の `DataTable` を対象としたラッパーです。

### 関数シグネチャ

```typescript
export function useNaivePaginatedTable<ResponseData, ApiData>(
  options: UseNaivePaginatedTableOptions<ResponseData, ApiData>
);
```

### `UseNaivePaginatedTableOptions` インターフェース

```typescript
type UseNaivePaginatedTableOptions<ResponseData, ApiData> = UseNaiveTableOptions<ResponseData, ApiData, true> & {
  paginationProps?: Omit<PaginationProps, 'page' | 'pageSize' | 'itemCount'>;
  /**
   * whether to show the total count of the table
   *
   * @default true
   */
  showTotal?: boolean;
  onPaginationParamsChange?: (params: PaginationParams) => void | Promise<void>;
};
```

### 使い方例

```typescript
import { defaultTransform, useNaivePaginatedTable } from '@/hooks/common/table';

/** get role list */
function fetchGetRoleList(params?: Api.SystemManage.RoleSearchParams) {
  return request<Api.SystemManage.RoleList>({
    url: '/systemManage/getRoleList',
    method: 'get',
    params
  });
}

const searchParams: Api.SystemManage.RoleSearchParams = reactive({
  current: 1,
  size: 10,
  roleName: null,
  roleCode: null,
  status: null
});

const { loading, data, columns, pagination, getDataByPage } = useNaivePaginatedTable({
  api: fetchGetRoleList,
  transform: response => defaultTransform(response),
  onPaginationParamsChange: ({ page, pageSize }) => {
    // ページングパラメータを検索条件に同期（重要）
    searchParams.current = page;
    searchParams.size = pageSize;
  },
  columns: () => [
    {
      type: 'selection',
      align: 'center',
      width: 48
    },
    {
      key: 'index',
      title: $t('common.index'),
      width: 64,
      align: 'center',
      render: (_, index) => index + 1
    },
    {
      key: 'roleName',
      title: $t('page.manage.role.roleName'),
      align: 'center',
      minWidth: 120
    }
    // ...その他の列
  ]
});

const {
  // よく使う CRUD 状態と関数
  drawerVisible,
  operateType,
  editingData,
  handleAdd,
  handleEdit,
  checkedRowKeys,
  onBatchDeleted,
  onDeleted
} = useTableOperate<Row>(data, 'id', getData);
```

## useTableOperate（テーブル操作ヘルパー）

追加/編集/一括削除/単一削除の UI 状態とコールバックをまとめて提供し、ドロワー/ダイアログと併用します。

シグネチャ：

```ts
export function useTableOperate<TableData>(
  data: Ref<TableData[]>,
  idKey: keyof TableData,
  getData: () => Promise<void>
);
```

引数：

- `data`：現在のテーブルデータ（編集時に `id` で行を特定）
- `idKey`：主キーのフィールド名（例：`id`）
- `getData`：削除後のリフレッシュ関数

返り値：

- `drawerVisible`: Ref<boolean>
- `openDrawer()`: void
- `closeDrawer()`: void
- `operateType`: Ref<'add' | 'edit'>
- `handleAdd()`: void
- `editingData`: Ref<TableData | null>
- `handleEdit(id)`: void
- `checkedRowKeys`: Ref<string[]>
- `onBatchDeleted()`: Promise<void>（一括削除成功後：選択をクリア＋リフレッシュ）
- `onDeleted()`: Promise<void>（単一削除成功後：リフレッシュ）

説明：

- `handleEdit(id)` は `data` から該当行を検索してドロワーを開き、その行データを `editingData` に設定します。
- 削除が成功した後は `onBatchDeleted/onDeleted` を呼び出し、状態処理とリフレッシュを行います。

## defaultTransform（ページネーションデータの統一変換）

API が次のような構造を返す場合：

- `FlatResponseData<any, Api.Common.PaginatingQueryRecord<ApiData>>`
- `data` には通常 `records`、`current`、`size`、`total` が含まれます。

`defaultTransform` を使うと、これをそのまま `PaginationData<ApiData>` に変換できます：

> レスポンス構造が異なる場合は、同様の変換関数を実装して `transform` に渡してください。戻り値の型は明確に指定してください。

## 列の表示/非表示と横スクロール

- 列表示/非表示パネル：`columnChecks` は「表示する列」の集合です。`v-model:columns` でヘッダー操作コンポーネント（例：`TableHeaderOperation`）にバインドします。
- Naive UI 適合では、`selection/expand` 列も表示/非表示に参加します（内部で安定した `key` を付与）。
- 横スクロール：`scrollX = ∑(column.width || column.minWidth || 120)`。各列に `width/minWidth` を設定することを推奨。未設定の場合は最小幅 120 を使用します。

## i18n と列のリフレッシュ

- `useNaiveTable/useNaivePaginatedTable` は内部で `appStore.locale` を監視し、`reloadColumns()` を呼び出して、`$t(...)` によるタイトルが言語切替後すぐに更新されるようにします。
- 純粋な `useTable` の場合に i18n を使うなら、`reloadColumns()` を自分で呼び出してください。

## 例示ページとの対応

「ユーザー管理 / 役割管理」ページ（`src/views/manage/user/index.vue`、`src/views/manage/role/index.vue`）を例に：

- `useNaivePaginatedTable` は `columns`、`columnChecks`、`data`、`loading`、`getData`、`getDataByPage`、`mobilePagination`、`scrollX` を提供。
- `TableHeaderOperation` では `v-model:columns="columnChecks"` を使って列の表示/非表示を制御。
- `NDataTable`：
  - `:columns`、`:data`、`:loading`、`:scroll-x="scrollX"` をバインド；
  - `remote`；
  - `:row-key="row => row.id"`；
  - `:pagination="mobilePagination"`。
- `useTableOperate` は追加/編集ドロワー管理と削除後の更新を担当。

## よくある質問（FAQ）とベストプラクティス

- `getDataByPage(1)` をいつ使う？フィルター条件が変わったとき、1 ページ目から取得します。
- ページ情報の同期を忘れない：`onPaginationParamsChange` で `page/pageSize` を検索条件へ同期。
- `immediate` のデフォルトは `true`：初期化時に 1 度取得します。不要なら `immediate: false` を渡し、`getData()` を手動で呼び出してください。
- `NDataTable` の `row-key` は安定している必要があります。選択や展開などの機能のために重要です。
- モバイル最適化：`mobilePagination` を利用すると小画面でのページネーション表示が使いやすくなります。

# useTable 関数

`useTable` は、テーブルのデータ・列・ローディング状態を管理するための Vue フックです。データ取得、ページネーション、列の表示/非表示など、一般的なテーブル機能を柔軟に扱えます。

本ガイドでは、最新の `useTable` の使い方に加え、Naive UI 向けのラッパーである `useNaiveTable` と `useNaivePaginatedTable` を紹介します。

## クイック比較

- `useTable`：特定の UI ライブラリに依存せず、リクエスト・データ変換・列定義・列の表示/非表示（checks）のみを管理。
- `useNaiveTable`：`useTable` を基に Naive UI の列定義へ適合。`scrollX` を提供し、i18n 切り替え時に列を自動リフレッシュ。
- `useNaivePaginatedTable`：`useNaiveTable` を基に、ページネーション（`PaginationProps`）、モバイル向けページネーション `mobilePagination`、`getDataByPage` などを統合。
- `useTableOperate`：追加/編集/一括削除/単一削除の UI 状態とコールバックを共通化。
- `defaultTransform`：バックエンドの統一ページネーション構造を `PaginationData<T>` に変換。

## `useTable`

`useTable` は「データ駆動」にのみ注力し、具体的なテーブルコンポーネントや UI ライブラリには依存しません。データ取得・変換・列管理を柔軟に設定できます。

### 関数シグネチャ

```typescript
export default function useTable<ResponseData, ApiData, Column, Pagination extends boolean>(
  options: UseTableOptions<ResponseData, ApiData, Column, Pagination>
);
```

### `UseTableOptions` インターフェース

```typescript
export interface UseTableOptions<ResponseData, ApiData, Column, Pagination extends boolean> {
  /**
   * テーブルデータを取得する API 関数
   */
  api: () => Promise<ResponseData>;
  /**
   * ページネーションを有効にするか
   */
  pagination?: Pagination;
  /**
   * API レスポンスをテーブルデータへ変換する関数
   */
  transform: Transform<ResponseData, ApiData, Pagination>;
  /**
   * 列定義を返すファクトリー関数
   */
  columns: () => Column[];
  /**
   * 列のチェック情報を生成
   */
  getColumnChecks: (columns: Column[]) => TableColumnCheck[];
  /**
   * チェック情報から最終的な列を生成
   */
  getColumns: (columns: Column[], checks: TableColumnCheck[]) => Column[];
  /**
   * データ取得後のコールバック
   */
  onFetched?: (data: GetApiData<ApiData, Pagination>) => void | Promise<void>;
  /**
   * 初期化時に即座にデータ取得するか
   *
   * @default true
   */
  immediate?: boolean;
}
```

### 返り値

```ts
{
    loading: Ref<boolean, boolean>;
    empty: Ref<boolean, boolean>;
    data: Ref<ApiData[], ApiData[]>;
    columns: ComputedRef<Column[]>;
    columnChecks: Ref<TableColumnCheck[], TableColumnCheck[]>;
    reloadColumns: () => void;
    getData: () => Promise<void>;
}
```

### 説明

- `columnChecks` は列の表示/非表示を決定します。`columns()` はファクトリー関数で、呼び出すたびに列定義を再生成します。
- `reloadColumns` はチェック状態を維持したまま、現在のファクトリー関数の出力で列を再構築します（例：言語切替でタイトルが変わった際に呼び出す）。
- `pagination` が `true` の場合、`transform` は `PaginationData<ApiData>` を返し、その中の `data` をテーブルデータとして使用します。

### 使い方例

```typescript
import { useTable } from '@sa/hooks';
import type { UseTableOptions } from '@sa/hooks';
import type { PaginationData } from '@sa/hooks';
import type { DataTableColumns } from 'naive-ui';

interface User {
  id: number;
  name: string;
  email: string;
}

interface UserResponse {
  data: User[];
  total: number;
}

const columns = (): DataTableColumns<User> => [
  {
    key: 'id',
    title: 'ID'
  },
  {
    key: 'name',
    title: 'Name'
  },
  {
    key: 'email',
    title: 'Email'
  }
];

const {
  loading,
  data,
  columns: tableColumns,
  getData
} = useTable<UserResponse, User, DataTableColumns<User>, false>({
  api: fetchUsers, // Promise<UserResponse> を返す関数
  transform: response => response.data,
  columns,
  getColumnChecks: cols =>
    cols.map(col => ({ key: col.key as string, title: col.title!, checked: true, visible: true })),
  getColumns: (cols, checks) => cols.filter(col => checks.find(c => c.key === col.key)?.checked)
});

// データ取得
getData();
```

## `useNaiveTable`

`useNaiveTable` は `useTable` を Naive UI 向けにラップしたものです。`NaiveUI.TableColumn<T>` を使用し、横スクロール幅 `scrollX` を提供、i18n 変更時に列を自動リフレッシュします。

追加オプション：

- `getColumnVisible?: (column: NaiveUI.TableColumn<ApiData>) => boolean`
  - その列を「列表示/非表示パネル」に含めるかどうかを制御します（例：`selection/expand` 列をパネルに表示しない）。

追加の返り値：

- `scrollX: ComputedRef<number>`（`width/minWidth` の合計に基づき、`NDataTable` の横スクロールに利用）。

説明：

- `getColumnChecks` と `getColumns` を提供する必要はありません。Naive UI の列表示/非表示は内部で適合されています。
- `selection/expand` のように `key` がない列には、内部で安定した `key` が付与され、表示/非表示制御に参加します。

### 関数シグネチャ

```typescript
export function useNaiveTable<ResponseData, ApiData>(options: UseNaiveTableOptions<ResponseData, ApiData, false>);
```

### `UseNaiveTableOptions` インターフェース

```typescript
export type UseNaiveTableOptions<ResponseData, ApiData, Pagination extends boolean> = Omit<
  UseTableOptions<ResponseData, ApiData, NaiveUI.TableColumn<ApiData>, Pagination>,
  'pagination' | 'getColumnChecks' | 'getColumns'
> & {
  /**
   * get column visible
   *
   * @param column
   *
   * @default true
   *
   * @returns true if the column is visible, false otherwise
   */
  getColumnVisible?: (column: NaiveUI.TableColumn<ApiData>) => boolean;
};
```

### 使い方例

```typescript
import { useNaiveTable } from '@/hooks/common/table';

/** get user list */
function fetchGetUserList(params?: Api.SystemManage.UserSearchParams) {
  return request<Api.SystemManage.UserList>({
    url: '/systemManage/getUserList',
    method: 'get',
    params
  });
}

const searchParams: Api.SystemManage.UserSearchParams = reactive({
  current: 1,
  size: 999,
  status: null,
  userName: null,
  userGender: null,
  nickName: null,
  userPhone: null,
  userEmail: null
});

const { loading, data, columns, getData, scrollX } = useNaiveTable({
  api: () => fetchGetUserList(),
  transform: response => {
    const { data: list, error } = response;

    if (!error) {
      return list.records;
    }

    return [];
  },
  columns
});

// データ取得
getData();
```

> 注意：`fetchGetUserList` は戻り値の型を明示する必要があります。`useNaiveTable` は総称型を渡さなくても型推論が可能です。

## `useNaivePaginatedTable`

`useNaivePaginatedTable` は、ページネーションが必要な Naive UI の `DataTable` を対象としたラッパーです。

### 関数シグネチャ

```typescript
export function useNaivePaginatedTable<ResponseData, ApiData>(
  options: UseNaivePaginatedTableOptions<ResponseData, ApiData>
);
```

### `UseNaivePaginatedTableOptions` インターフェース

```typescript
type UseNaivePaginatedTableOptions<ResponseData, ApiData> = UseNaiveTableOptions<ResponseData, ApiData, true> & {
  paginationProps?: Omit<PaginationProps, 'page' | 'pageSize' | 'itemCount'>;
  /**
   * whether to show the total count of the table
   *
   * @default true
   */
  showTotal?: boolean;
  onPaginationParamsChange?: (params: PaginationParams) => void | Promise<void>;
};
```

### 使い方例

```typescript
import { defaultTransform, useNaivePaginatedTable } from '@/hooks/common/table';

/** get role list */
function fetchGetRoleList(params?: Api.SystemManage.RoleSearchParams) {
  return request<Api.SystemManage.RoleList>({
    url: '/systemManage/getRoleList',
    method: 'get',
    params
  });
}

const searchParams: Api.SystemManage.RoleSearchParams = reactive({
  current: 1,
  size: 10,
  roleName: null,
  roleCode: null,
  status: null
});

const { loading, data, columns, pagination, getDataByPage } = useNaivePaginatedTable({
  api: fetchGetRoleList,
  transform: response => defaultTransform(response),
  onPaginationParamsChange: ({ page, pageSize }) => {
    // ページングパラメータを検索条件に同期（重要）
    searchParams.current = page;
    searchParams.size = pageSize;
  },
  columns: () => [
    {
      type: 'selection',
      align: 'center',
      width: 48
    },
    {
      key: 'index',
      title: $t('common.index'),
      width: 64,
      align: 'center',
      render: (_, index) => index + 1
    },
    {
      key: 'roleName',
      title: $t('page.manage.role.roleName'),
      align: 'center',
      minWidth: 120
    }
    // ...その他の列
  ]
});

const {
  // よく使う CRUD 状態と関数
  drawerVisible,
  operateType,
  editingData,
  handleAdd,
  handleEdit,
  checkedRowKeys,
  onBatchDeleted,
  onDeleted
} = useTableOperate<Row>(data, 'id', getData);
```

## useTableOperate（テーブル操作ヘルパー）

追加/編集/一括削除/単一削除の UI 状態とコールバックをまとめて提供し、ドロワー/ダイアログと併用します。

シグネチャ：

```ts
export function useTableOperate<TableData>(
  data: Ref<TableData[]>,
  idKey: keyof TableData,
  getData: () => Promise<void>
);
```

引数：

- `data`：現在のテーブルデータ（編集時に `id` で行を特定）
- `idKey`：主キーのフィールド名（例：`id`）
- `getData`：削除後のリフレッシュ関数

返り値：

- `drawerVisible`: Ref<boolean>
- `openDrawer()`: void
- `closeDrawer()`: void
- `operateType`: Ref<'add' | 'edit'>
- `handleAdd()`: void
- `editingData`: Ref<TableData | null>
- `handleEdit(id)`: void
- `checkedRowKeys`: Ref<string[]>
- `onBatchDeleted()`: Promise<void>（一括削除成功後：選択をクリア＋リフレッシュ）
- `onDeleted()`: Promise<void>（単一削除成功後：リフレッシュ）

説明：

- `handleEdit(id)` は `data` から該当行を検索してドロワーを開き、その行データを `editingData` に設定します。
- 削除が成功した後は `onBatchDeleted/onDeleted` を呼び出し、状態処理とリフレッシュを行います。

## defaultTransform（ページネーションデータの統一変換）

API が次のような構造を返す場合：

- `FlatResponseData<any, Api.Common.PaginatingQueryRecord<ApiData>>`
- `data` には通常 `records`、`current`、`size`、`total` が含まれます。

`defaultTransform` を使うと、これをそのまま `PaginationData<ApiData>` に変換できます：

> レスポンス構造が異なる場合は、同様の変換関数を実装して `transform` に渡してください。戻り値の型は明確に指定してください。

## 列の表示/非表示と横スクロール

- 列表示/非表示パネル：`columnChecks` は「表示する列」の集合です。`v-model:columns` でヘッダー操作コンポーネント（例：`TableHeaderOperation`）にバインドします。
- Naive UI 適合では、`selection/expand` 列も表示/非表示に参加します（内部で安定した `key` を付与）。
- 横スクロール：`scrollX = ∑(column.width || column.minWidth || 120)`。各列に `width/minWidth` を設定することを推奨。未設定の場合は最小幅 120 を使用します。

## i18n と列のリフレッシュ

- `useNaiveTable/useNaivePaginatedTable` は内部で `appStore.locale` を監視し、`reloadColumns()` を呼び出して、`$t(...)` によるタイトルが言語切替後すぐに更新されるようにします。
- 純粋な `useTable` の場合に i18n を使うなら、`reloadColumns()` を自分で呼び出してください。

## 例示ページとの対応

「ユーザー管理 / 役割管理」ページ（`src/views/manage/user/index.vue`、`src/views/manage/role/index.vue`）を例に：

- `useNaivePaginatedTable` は `columns`、`columnChecks`、`data`、`loading`、`getData`、`getDataByPage`、`mobilePagination`、`scrollX` を提供。
- `TableHeaderOperation` では `v-model:columns="columnChecks"` を使って列の表示/非表示を制御。
- `NDataTable`：
  - `:columns`、`:data`、`:loading`、`:scroll-x="scrollX"` をバインド；
  - `remote`；
  - `:row-key="row => row.id"`；
  - `:pagination="mobilePagination"`。
- `useTableOperate` は追加/編集ドロワー管理と削除後の更新を担当。

## よくある質問（FAQ）とベストプラクティス

- `getDataByPage(1)` をいつ使う？フィルター条件が変わったとき、1 ページ目から取得します。
- ページ情報の同期を忘れない：`onPaginationParamsChange` で `page/pageSize` を検索条件へ同期。
- `immediate` のデフォルトは `true`：初期化時に 1 度取得します。不要なら `immediate: false` を渡し、`getData()` を手動で呼び出してください。
- `NDataTable` の `row-key` は安定している必要があります。選択や展開などの機能のために重要です。
- モバイル最適化：`mobilePagination` を利用すると小画面でのページネーション表示が使いやすくなります。
