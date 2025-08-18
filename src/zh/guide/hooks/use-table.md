# useTable 函数

`useTable` 是一个用于管理表格数据、列和加载状态的 Vue Hook。它提供了一种灵活的方式来处理数据获取、分页、列可见性等常见表格功能。

本指南将介绍如何使用最新的 `useTable` 及其针对 Naive UI 的封装 `useNaiveTable` 和 `useNaivePaginatedTable`。

## `useTable`

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

`useNaiveTable` 是针对 Naive UI `DataTable` 组件的封装，简化了列处理。

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

const { loading, data, columns, getData, scrollX } = useNaiveTable<UserResponse, User>({
  api: fetchUsers,
  transform: response => response.data,
  columns
});

// 获取数据
getData();
```

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
import { useNaivePaginatedTable } from '@/hooks/common/table';

const { loading, data, columns, pagination, getDataByPage } = useNaivePaginatedTable<UserResponse, User>({
  api: fetchUsers,
  transform: response => {
    const { records, current, size, total } = response.data;
    return {
      data: records,
      pageNum: current,
      pageSize: size,
      total
    };
  },
  columns
});

// 获取第一页数据
getDataByPage(1);
```
