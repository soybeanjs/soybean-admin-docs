# useTable Function

`useTable` is a Vue hook for managing table data, columns, and loading state. It provides a flexible way to handle common table features such as data fetching, pagination, and column visibility.

This guide introduces how to use the latest `useTable` as well as its Naive UI wrappers `useNaiveTable` and `useNaivePaginatedTable`.

## Quick comparison

- `useTable`: UI-agnostic. It only manages request, data transformation, column configuration, and column visibility (checks).
- `useNaiveTable`: Based on `useTable`, adapts to Naive UI column definitions, provides `scrollX`, and automatically refreshes columns on i18n changes.
- `useNaivePaginatedTable`: Based on `useNaiveTable`, integrates pagination (`PaginationProps`), mobile pagination `mobilePagination`, `getDataByPage`, etc.
- `useTableOperate`: Common UI states and callbacks for add/edit/batch delete/single delete.
- `defaultTransform`: Converts a unified backend pagination structure to `PaginationData<T>`.

## useTable

`useTable` focuses on the “data-driven” part without caring about specific table components or UI libraries. It offers flexible options to configure data fetching, transformation, and column management.

### Function signature

```typescript
export default function useTable<ResponseData, ApiData, Column, Pagination extends boolean>(
  options: UseTableOptions<ResponseData, ApiData, Column, Pagination>
);
```

### UseTableOptions interface

```typescript
export interface UseTableOptions<ResponseData, ApiData, Column, Pagination extends boolean> {
  /**
   * API function to fetch table data
   */
  api: () => Promise<ResponseData>;
  /**
   * Whether to enable pagination
   */
  pagination?: Pagination;
  /**
   * Function to transform API response to table data
   */
  transform: Transform<ResponseData, ApiData, Pagination>;
  /**
   * Factory function that returns column definitions
   */
  columns: () => Column[];
  /**
   * Get column checks from columns
   */
  getColumnChecks: (columns: Column[]) => TableColumnCheck[];
  /**
   * Build final columns from checks
   */
  getColumns: (columns: Column[], checks: TableColumnCheck[]) => Column[];
  /**
   * Callback after data fetched
   */
  onFetched?: (data: GetApiData<ApiData, Pagination>) => void | Promise<void>;
  /**
   * Fetch data immediately on init
   *
   * @default true
   */
  immediate?: boolean;
}
```

### Return value

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

### Notes

- `columnChecks` determines which columns are visible; `columns()` is a factory function (each access rebuilds column definitions).
- `reloadColumns` rebuilds columns based on the current factory function without losing “checked states” (e.g., call it after a locale change updates titles).
- When `pagination` is `true`, `transform` returns `PaginationData<ApiData>`, and `useTable` uses `data` inside it as table data.

### Usage example

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

const {
  loading,
  data,
  columns: tableColumns,
  getData
} = useTable<UserResponse, User, DataTableColumns<User>, false>({
  api: fetchUsers, // a function that returns Promise<UserResponse>
  transform: response => response.data,
  columns: () => [
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
  ],
  getColumnChecks: cols =>
    cols.map(col => ({ key: col.key as string, title: col.title!, checked: true, visible: true })),
  getColumns: (cols, checks) => cols.filter(col => checks.find(c => c.key === col.key)?.checked)
});

// fetch data
getData();
```

## useNaiveTable

`useNaiveTable` is a wrapper over `useTable` for Naive UI. It uses `NaiveUI.TableColumn<T>`, provides horizontal scroll width `scrollX`, and refreshes columns automatically when i18n changes.

Extra option:

- `getColumnVisible?: (column: NaiveUI.TableColumn<ApiData>) => boolean`
  - Control whether a column appears in the “column visibility panel” (e.g., you can hide `selection/expand` columns from the panel).

Extra return:

- `scrollX: ComputedRef<number>` (sum from `width/minWidth`, useful for horizontal scrolling in NDataTable).

Notes:

- You no longer need to provide `getColumnChecks` and `getColumns`—the wrapper adapts Naive UI’s column visibility internally.
- For `selection/expand` columns without a `key`, internal stable keys will be generated to participate in visibility control.

### Function signature

```typescript
export function useNaiveTable<ResponseData, ApiData>(options: UseNaiveTableOptions<ResponseData, ApiData, false>);
```

### UseNaiveTableOptions interface

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

### Usage example

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

// fetch data
getData();
```

> Note: `fetchGetUserList` needs an explicit return type. `useNaiveTable` can infer types without passing generics.

## `useNaivePaginatedTable`

`useNaivePaginatedTable` is a wrapper targeting Naive UI `DataTable` with pagination.

### Function signature

```typescript
export function useNaivePaginatedTable<ResponseData, ApiData>(
  options: UseNaivePaginatedTableOptions<ResponseData, ApiData>
);
```

### `UseNaivePaginatedTableOptions` interface

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

### Usage example

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
    // sync pagination params back to search params (key point)
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
    // ...other columns
  ]
});

const {
  // common CRUD states and methods
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

## useTableOperate (helper for table operations)

Encapsulates UI states and callbacks for add/edit/batch delete/single delete, typically used with drawers/dialogs.

Signature:

```ts
export function useTableOperate<TableData>(
  data: Ref<TableData[]>,
  idKey: keyof TableData,
  getData: () => Promise<void>
);
```

Parameters:

```typescript

{
  data: Ref<TableData[], TableData[]>, // table data source.
  idKey: keyof TableData, //  unique identifier key in TableData.
  getData: () => Promise<void> //  function to refresh table data.
}

```

Returns:

```ts
{
    drawerVisible: Ref<boolean>;
    openDrawer: () => void;
    closeDrawer: () => void;
    operateType: ShallowRef<NaiveUI.TableOperateType>;
    handleAdd: () => void;
    editingData: ShallowRef<TableData | null>;
    handleEdit: (id: TableData[keyof TableData]) => void;
    checkedRowKeys: ShallowRef<string[]>;
    onBatchDeleted: () => Promise<void>; //  (batch delete success callback: refresh)
    onDeleted: () => Promise<void>; //  (single delete success callback: refresh)
}

```

Notes:

- `handleEdit` locates the row data by `idKey` from `data` and sets it to `editingData`.
- `onBatchDeleted` and `onDeleted` call `getData` after successful deletion to refresh the table data.

## defaultTransform (unified pagination data conversion)

If the API returns the following structure:

- `FlatResponseData<any, Api.Common.PaginatingQueryRecord<ApiData>>`
- Its `data` usually contains: `records`, `current`, `size`, `total`.

You can directly use `defaultTransform` to convert it to `PaginationData<ApiData>`:

> If your response structure differs, implement a similar transformer and pass it via `transform`. Be sure to specify the return type explicitly.

## Column visibility and horizontal scrolling

- Column visibility panel: `columnChecks` represents the set of visible columns. Bind it via `v-model:columns` to your table header operation component (e.g., `TableHeaderOperation`).
- In the Naive UI adaptation, `selection/expand` columns also participate in visibility (with internal stable `key`).
- Horizontal scrolling: `scrollX = ∑(column.width || column.minWidth || 120)`. It’s recommended to set `width/minWidth` for columns, otherwise a default min width of 120 is used.

## i18n and column refresh

- `useNaiveTable/useNaivePaginatedTable` listens to `appStore.locale` internally and calls `reloadColumns()` to ensure titles using `$t(...)` update immediately after switching languages.
- In pure `useTable` scenarios with i18n, call `reloadColumns()` yourself.

## Compare with example pages

Using “User Management / Role Management” pages (`src/views/manage/user/index.vue`, `src/views/manage/role/index.vue`) as examples:

- `useNaivePaginatedTable` provides `columns`, `columnChecks`, `data`, `loading`, `getData`, `getDataByPage`, `mobilePagination`, `scrollX`.
- `TableHeaderOperation` uses `v-model:columns="columnChecks"` to control column visibility.
- `NDataTable`:
  - Bind `:columns`, `:data`, `:loading`, `:scroll-x="scrollX"`;
  - `remote`;
  - `:row-key="row => row.id"`;
  - `:pagination="mobilePagination"`.
- `useTableOperate` manages the add/edit drawer and refresh after deletion.

## FAQ and best practices

- When to call `getDataByPage(1)`? When filter conditions change, fetch from the first page.
- Don’t forget to sync pagination: in `onPaginationParamsChange`, sync `page/pageSize` back to your search params.
- `immediate` defaults to `true`: it fetches once on init. If you don’t need this, pass `immediate: false` and call `getData()` manually.
- `row-key` of `NDataTable` must be stable to keep selection/expand and other features working correctly.
- Mobile optimization: use `mobilePagination` for a better pagination experience on small screens.

# useTable Function

`useTable` is a Vue hook for managing table data, columns, and loading state. It provides a flexible way to handle common table features such as data fetching, pagination, and column visibility.

This guide introduces how to use the latest `useTable` as well as its Naive UI wrappers `useNaiveTable` and `useNaivePaginatedTable`.

## Quick comparison

- `useTable`: UI-agnostic. It only manages request, data transformation, column configuration, and column visibility (checks).
- `useNaiveTable`: Based on `useTable`, adapts to Naive UI column definitions, provides `scrollX`, and automatically refreshes columns on i18n changes.
- `useNaivePaginatedTable`: Based on `useNaiveTable`, integrates pagination (`PaginationProps`), mobile pagination `mobilePagination`, `getDataByPage`, etc.
- `useTableOperate`: Common UI states and callbacks for add/edit/batch delete/single delete.
- `defaultTransform`: Converts a unified backend pagination structure to `PaginationData<T>`.
