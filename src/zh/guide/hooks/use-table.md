# useTable 函数

`useTable` 是一个用于管理表格数据、列和加载状态的 Vue Hook。它提供了一种灵活的方式来处理数据获取、分页、列可见性等常见表格功能。

本指南将介绍如何使用最新的 `useTable`，以及其针对 Naive UI 的封装 `useNaiveTable` 与 `useNaivePaginatedTable`。

## 快速对比

- `useTable`：不绑定任何 UI 库，仅处理请求、数据转换、列配置与列显隐（checks）管理。
- `useNaiveTable`：在 `useTable` 基础上，适配 Naive UI 的列定义，提供 `scrollX`，并在 i18n 切换时自动刷新列。
- `useNaivePaginatedTable`：在 `useNaiveTable` 基础上集成分页（`PaginationProps`）、移动端分页 `mobilePagination`、`getDataByPage` 等。
- `useTableOperate`：围绕“新增/编辑/批量删除/单删”的通用 UI 状态和回调封装。
- `defaultTransform`：把后端统一分页结构转换为 `PaginationData<T>`。

## `useTable`

`useTable` 只关注“数据驱动”，不关心具体表格组件/UI 库，它提供了灵活的选项来配置数据获取、转换和列管理。

### 函数签名

```typescript
export default function useTable<ResponseData, ApiData, Column, Pagination extends boolean>(
  options: UseTableOptions<ResponseData, ApiData, Column, Pagination>
);
```

### `UseTableOptions` 接口

```typescript
export interface UseTableOptions<ResponseData, ApiData, Column, Pagination extends boolean> {
  /**
   * 获取表格数据的 API 函数
   */
  api: () => Promise<ResponseData>;
  /**
   * 是否启用分页
   */
  pagination?: Pagination;
  /**
   * 将 API 响应转换为表格数据的函数
   */
  transform: Transform<ResponseData, ApiData, Pagination>;
  /**
   * 列定义的工厂函数
   */
  columns: () => Column[];
  /**
   * 获取列检查项的函数
   */
  getColumnChecks: (columns: Column[]) => TableColumnCheck[];
  /**
   * 根据检查项获取最终列的函数
   */
  getColumns: (columns: Column[], checks: TableColumnCheck[]) => Column[];
  /**
   * 数据获取完成后的回调函数
   */
  onFetched?: (data: GetApiData<ApiData, Pagination>) => void | Promise<void>;
  /**
   * 是否立即获取数据
   *
   * @default true
   */
  immediate?: boolean;
}
```

### 返回值

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

### 说明

- `columnChecks` 决定列的显示与隐藏；`columns()` 是“工厂函数”（每次取值都会重新生成列定义）。
- `reloadColumns` 在不丢失“勾选状态”的前提下，按当前工厂函数输出重建列（例如语言切换后标题变化时调用）。
- 当 `pagination` 为 `true` 时，`transform` 返回 `PaginationData<ApiData>`，`useTable` 会把其中的 `data` 用作表格数据。

### 使用示例

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
  api: fetchUsers, // 一个返回 Promise<UserResponse> 的函数
  transform: response => response.data,
  columns,
  getColumnChecks: cols =>
    cols.map(col => ({ key: col.key as string, title: col.title!, checked: true, visible: true })),
  getColumns: (cols, checks) => cols.filter(col => checks.find(c => c.key === col.key)?.checked)
});

// 获取数据
getData();
```

## `useNaiveTable`

`useNaiveTable` 是对 `useTable` 的 Naive UI 版本封装，使用 `NaiveUI.TableColumn<T>`，并提供横向滚动宽度 `scrollX`，内置 i18n 变更时的列刷新。

额外选项：

- `getColumnVisible?: (column: NaiveUI.TableColumn<ApiData>) => boolean`
  - 控制列是否出现在“列显隐面板”（例如 `selection/expand` 列可选择不显示在面板中）。

额外返回：

- `scrollX: ComputedRef<number>`（根据 `width/minWidth` 汇总，便于 NDataTable 横向滚动）。

说明：

- 不再需要你提供 `getColumnChecks` 与 `getColumns`，封装内部已适配 Naive UI 的列显隐处理。
- 内部会为 `selection/expand` 这类无 `key` 的列生成内部 `key` 以参与显隐控制。

### 函数签名

```typescript
export function useNaiveTable<ResponseData, ApiData>(options: UseNaiveTableOptions<ResponseData, ApiData, false>);
```

### `UseNaiveTableOptions` 接口

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

### 使用示例

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

// 获取数据
getData();
```

> 注意：`fetchGetUserList` 需要明确的返回类型，`useNaiveTable` 可以不传递泛型参数，直接推导出类型。

## `useNaivePaginatedTable`

`useNaivePaginatedTable` 是针对需要分页的 Naive UI `DataTable` 组件的封装。

### 函数签名

```typescript
export function useNaivePaginatedTable<ResponseData, ApiData>(
  options: UseNaivePaginatedTableOptions<ResponseData, ApiData>
);
```

### `UseNaivePaginatedTableOptions` 接口

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

### 使用示例

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
    // 把分页参数同步到搜索参数（关键）
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
    // ...其他列
  ]
});

const {
  // 常用的增删改查辅助状态和方法
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

## useTableOperate（表格操作辅助）

封装“新增/编辑/批量删除/单删”的 UI 状态与回调，配合抽屉/弹窗使用。

签名：

```ts
export function useTableOperate<TableData>(
  data: Ref<TableData[]>,
  idKey: keyof TableData,
  getData: () => Promise<void>
);
```

入参：

- `data`：表格当前数据（编辑时根据 `id` 定位行数据）。
- `idKey`：主键字段名（如 `id`）。
- `getData`：删除后的刷新函数。

返回：

- `drawerVisible`: Ref<boolean>
- `openDrawer()`: void
- `closeDrawer()`: void
- `operateType`: Ref<'add' | 'edit'>
- `handleAdd()`: void
- `editingData`: Ref<TableData | null>
- `handleEdit(id)`: void
- `checkedRowKeys`: Ref<string[]>
- `onBatchDeleted()`: Promise<void>（批量删除成功后调用：清空勾选 + 刷新）
- `onDeleted()`: Promise<void>（单项删除成功后调用：刷新）

说明：

- `handleEdit(id)` 会在 `data` 中查找该行并打开抽屉，将行数据赋给 `editingData`。
- 删除类操作成功后调用 `onBatchDeleted/onDeleted` 即可处理状态并刷新。

## defaultTransform（统一分页数据转换）

如果接口返回结构为：

- `FlatResponseData<any, Api.Common.PaginatingQueryRecord<ApiData>>`
- 其 `data` 通常包含：`records`、`current`、`size`、`total`。

可直接使用 `defaultTransform` 将其转换为 `PaginationData<ApiData>`：

> 如果接口返回的结构有其他差异，可自行编写类似于 `defaultTransform` 的转换函数传给 `transform` 参数，请务必明确返回类型。

## 列显隐与横向滚动

- 列显隐面板：`columnChecks` 即“可见列”集合，结合 `v-model:columns` 绑定到你的“列表头操作”组件（如 `TableHeaderOperation`）。
- Naive 适配中 `selection/expand` 列也会参与显隐（内部有稳定 `key`）。
- 横向滚动：`scrollX = ∑(column.width || column.minWidth || 120)`。建议为列设置 `width/minWidth`，否则采用默认最小宽度 120。

## i18n 与列刷新

- `useNaiveTable/useNaivePaginatedTable` 内部会监听 `appStore.locale` 并触发 `reloadColumns()`，保证标题 `$t(...)` 在语言切换后即时更新。
- 纯 `useTable` 场景若使用 i18n，需要自行调用 `reloadColumns()`。

## 与示例页面对照

以“用户管理/角色管理”页面为例（`src/views/manage/user/index.vue`、`src/views/manage/role/index.vue`）：

- 通过 `useNaivePaginatedTable` 提供 `columns`、`columnChecks`、`data`、`loading`、`getData`、`getDataByPage`、`mobilePagination`、`scrollX`。
- `TableHeaderOperation` 中使用 `v-model:columns="columnChecks"` 控制“列显隐”。
- `NDataTable`：
  - 绑定 `:columns`、`:data`、`:loading`、`:scroll-x="scrollX"`；
  - `remote`；
  - `:row-key="row => row.id"`；
  - `:pagination="mobilePagination"`。
- `useTableOperate` 管理新增/编辑抽屉与删除后的刷新。

## 常见问题与最佳实践

- 何时使用 `getDataByPage(1)`？当筛选条件变化时，从第一页拉取。
- 忘记同步页码？务必在 `onPaginationParamsChange` 中把 `page/pageSize` 同步回搜索参数。
- `immediate` 默认 `true`：初始化会拉一次数据；如不需要，可传 `immediate: false` 并手动调用 `getData()`。
- `NDataTable` 的 `row-key` 必须稳定，确保选择、展开等功能正常。
- 移动端优化：使用 `mobilePagination`，小屏更合适的分页展示。
