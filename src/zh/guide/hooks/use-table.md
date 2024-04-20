# useTable 函数
---

useTable 是一个专为 SoybeanAdmin 设计的表格数据处理函数，它提供了丰富的配置项以适配后端接口、处理数据、控制列的显示隐藏，以及实现数据的延迟加载等功能。本文档将详细介绍每个配置项，并提供优化后的示例代码，帮助开发者更高效地使用此钩子。



阅读此文档，你将会了解到

* 完整配置及说明

* 主要功能及函数

* 基础使用流程

* 使用场景示例



## 完整配置及说明



#### `apiFn`

- **类型**: `(params: any) => Promise<any>`

- **描述**: 用于获取表格数据的 API 函数。该函数接收 `apiParams` 作为参数，并返回一个 Promise，该 Promise 解析后的结果是表格数据。

- **示例**:

  ```javascript
  const fetchTableData = (params) => {
    return axios.get('/api/tableData', { params });
  };
  ```

#### `apiParams`

- **类型**: `Object`

- **描述**: 传递给 `apiFn` 的参数，通常包括分页信息、筛选条件等。

- **示例**:

  ```javascript
  apiParams: reactive({
    pageSize: 10,
    pageNum: 1,
    filter: '',
  }),
  ```

#### `transformer`

- **类型**: `(response: any) => { data: Array<any>, pageNum: number, pageSize: number, total: number }`

- **描述**: 数据转换器函数，用于将 `apiFn` 返回的数据格式转换为钩子需要的格式。

- **示例**:

  ```javascript
  transformer: (response) => ({
    data: response.data.records,
    pageNum: response.data.pageNum,
    pageSize: response.data.pageSize,
    total: response.data.total,
  }),
  ```

#### `columns`

- **类型**: `() => Array<{ key: string, title: string, visible?: boolean }>`

- **描述**: 列配置函数，返回表格的列配置数组。

- **示例**:

  ```javascript
  columns: () => [
    { key: 'name', title: 'Name', visible: true },
    { key: 'age', title: 'Age', visible: true },
    { key: 'email', title: 'Email', visible: false },
  ],
  ```

#### `getColumnChecks`

- **类型**: `(columns: Array<{ key: string, title: string, visible?: boolean }>) => Array<{ key: string, title: string, checked: boolean }>`

- **描述**: 生成列的显隐状态的函数。

- **示例**:

  ```javascript
  getColumnChecks: (columns) => columns.map(column => ({
    key: column.key,
    title: column.title,
    checked: column.visible,
  })),
  ```

#### `getColumns`

- **类型**: `(columns: Array<{ key: string, title: string }>, checks: Array<{ key: string, checked: boolean }>) => Array<{ key: string, title: string }>`

- **描述**: 根据列的显隐状态筛选出应该显示的列的函数。

- **示例**:

  ```javascript
  getColumns: (columns, checks) => columns.filter(column => {
    const check = checks.find(check => check.key === column.key);
    return check ? check.checked : false;
  }),
  ```

#### `onFetched`

- **类型**: `?(transformedData: { data: Array<any>, pageNum: number, pageSize: number, total: number }) => void`

- **描述**: 数据获取并处理后的回调函数。

- **示例**:

  ```javascript
  onFetched: (transformedData) => {
    console.log('Data fetched', transformedData);
  }
  ```

#### `immediate`

- **类型**: `boolean`

- **描述**: 控制是否在钩子初始化时立即获取数据。

- **默认值**: `true`

- **示例**:

  ```javascript
  immediate: true
  ```



## 主要功能及函数

`useTable` 钩子主要提供以下功能：

- 数据加载状态管理
- 表格数据的获取与展示
- 数据分页处理
- 数据筛选功能
- 列的显示与隐藏控制

`useTable` 钩子主要提供以下函数：

| 字段名                 | 类型       | 说明                   |
| ---------------------- | ---------- | ---------------------- |
| **loading**            | 布尔值     | 表示数据是否正在加载。 |
| **empty**              | 布尔值     | 表示表格数据是否为空。 |
| **data**               | 响应式引用 | 表格数据的响应式引用。 |
| **columns**            | 配置数组   | 表格列的配置数组。     |
| **columnChecks**       | 状态数组   | 列的显示隐藏状态数组。 |
| **reloadColumns**      | 函数       | 用于重新加载列的配置。 |
| **getData**            | 函数       | 用于获取表格数据。     |
| **searchParams**       | 响应式对象 | 搜索参数的响应式对象。 |
| **updateSearchParams** | 函数       | 用于更新搜索参数。     |
| **resetSearchParams**  | 函数       | 用于重置搜索参数。     |



## 基本使用流程

- 步骤 1: 定义 API 函数
- 步骤 2: 配置 useTable
- 步骤 3: 使用返回的数据和状态
- 步骤 4: 处理分页和筛选



#### 步骤 1: 定义 API 函数

首先，您需要定义一个 API 函数，该函数负责与后端接口通信，获取表格数据。这个函数应该返回一个 Promise，Promise 解析的结果应该是后端返回的数据。

```javascript
// api/userApi.js
import { request } from '../request';

// 定义获取用户列表的API函数
export function fetchGetUserList(params?: Api.SystemManage.UserSearchParams) {
  return request<Api.SystemManage.UserList>({
    url: '/systemManage/getUserList',
    method: 'get',
    params
  });
}
```



#### 步骤 2: 配置 `useTable`

在使用 `useTable` 时，传入一个配置对象，该对象至少需要包含 `apiFn` 和 `transformer` 两个字段。

- **`apiFn`**: 您在步骤 1 中定义的 API 函数。

- **`transformer`**: 一个函数，用于将后端返回的数据格式转换为 `useTable` 需要的格式。

- **`columns`**: 一个集合，用于展示表的列名称



```javascript
import { useTable } from '@/hooks/common/table';
import { fetchGetUserList } from '@/api/userApi';

const { data, loading, pagination } = useTable({
  apiFn: fetchGetUserList,
  transformer: (response) => {
    const { records, total, current, size } = response.data;
    return {
      data: records,
      pageNum: current,
      pageSize: size,
      total,
    };
  },
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
      }]
});
```



#### 步骤 3: 使用返回的数据和状态

`useTable` 返回的对象中包含了表格数据（`data`）、加载状态（`loading`）、分页信息（`pagination`）等，您可以直接在组件中使用这些数据和状态。

```html
<template>
  <div>
    <NDataTable :data="data" :loading="loading" />
    <NPagination v-model:current="pagination.page" v-model:pageSize="pagination.pageSize" :total="pagination.total" />
  </div>
</template>

<script setup>
import { useTable } from '@/hooks/common/table';
import { fetchUsers } from '@/api/userApi';

const { data, loading, pagination } = useTable({
  apiFn: fetchUsers,
  transformer: (response) => {
    const { records, total, current, size } = response.data;
    return {
      data: records,
      pageNum: current,
      pageSize: size,
      total,
    };
  },
});
</script>
```



#### 步骤 4: 处理分页和筛选

如果您的表格需要支持分页和筛选，您可以通过更新 `useTable` 配置对象中的 `apiParams` 来实现。`apiParams` 是一个响应式对象，您可以根据用户的操作动态更新它的值，`useTable` 会自动重新调用 `apiFn` 获取更新后的数据。

```javascript
const { data, loading, pagination, updateSearchParams } = useTable({
  apiFn: fetchUsers,
  apiParams: reactive({ current: 1, size: 10, searchKey: '' }), // 初始参数
  transformer: (response) => {
    const { records, total, current, size } = response.data;
    return {
      data: records,
      pageNum: current,
      pageSize: size,
      total,
    };
  },
});

// 更新搜索参数示例
function search(searchKey) {
  updateSearchParams(params => {
    params.searchKey = searchKey;
    params.current = 1; // 重置为第一页
  });
}
```



## 常见场景示例

#### 场景一：处理复杂数据结构

假设后端返回的数据结构包含嵌套对象，我们需要展平这些数据以便在表格中显示。

- **示例**:

  ```typescript
  const transformer: (response: ApiResponse) => { data: Array<any>; pageNum: number; pageSize: number; total: number; } = (response) => {
    const flattenedData = response.data.records.map(record => ({
      ...record,
      address: record.address.street, // 假设 address 是一个对象，我们只需要 street 字段
    }));
    return {
      data: flattenedData,
      pageNum: response.data.pageNum,
      pageSize: response.data.pageSize,
      total: response.data.total,
    };
  },
  ```



#### 场景二：自定义分页逻辑

在某些情况下，后端的分页逻辑可能与前端的分页组件不完全兼容，需要在前端进行适配。

- **示例**:

  ```typescript
  const transformer: (response: ApiResponse) => { data: Array<any>; pageNum: number; pageSize: number; total: number; } = (response) => {
    // 假设后端返回的是总页数而不是总记录数
    const totalRecords = response.data.pageNum * response.data.pageSize;
    return {
      data: response.data
      pageNum: response.data.pageNum,
      pageSize: response.data.pageSize,
      total: totalRecords
      };
    }
  ```



#### 场景三：动态筛选条件

在某些应用场景中，表格数据的筛选条件可能需要根据用户的输入或选择动态变化。以下示例展示了如何根据用户的输入动态更新 `apiParams` 来重新获取数据。

- **示例**:

  ```typescript
  const apiParams = reactive<TableParams>({
    pageSize: 10,
    pageNum: 1,
    filter: '',
  });

  // 假设这是一个响应用户输入的方法
  function updateUserFilter(newFilter: string) {
    apiParams.filter = newFilter;
    // 调用获取数据的方法，这里假设 useTable 提供了一个重新获取数据的方法
    fetchData();
  }
  ```



#### 场景四：列的显示和隐藏

在 `useTable` 的配置对象中，您可以通过 `columns` 字段传入列配置。此外，您需要定义 `getColumnChecks` 和 `getColumns` 函数来处理列的显隐状态。

- **`getColumnChecks`**: 用于生成列显隐状态的初始值。
- **`getColumns`**: 根据列显隐状态筛选出应该显示的列。

```javascript
import { useTable } from '@/hooks/common/table';

const { columns, columnChecks, reloadColumns } = useTable({
  // 其他配置...
  columns: () => columnsConfig,
  getColumnChecks: (cols) => cols.map(col => ({ key: col.key, title: col.title, checked: col.visible })),
  getColumns: (cols, checks) => cols.filter(col => checks.find(check => check.key === col.key && check.checked)),
});
```



#### 场景五：表格的基本操作

为了进一步优化和规范代码的结构、您还可以在 `useTableOperate` 的配置对象里通过配置对表格进行操作，如添加、编辑、删除条目以及管理弹出抽屉的可见性，通过在指定函数中实现自己的业务逻辑。

* 函数和字段说明

| 字段名             | 类别     | 说明                                                         |
| ------------------ | -------- | ------------------------------------------------------------ |
| **drawerVisible**  | Ref 对象 | 表示操作抽屉（如添加或编辑表单的抽屉）的可见性。             |
| **openDrawer**     | 函数     | 用于打开操作抽屉。                                           |
| **closeDrawer**    | 函数     | 用于关闭操作抽屉。                                           |
| **operateType**    | Ref 对象 | 用于标识当前操作类型（'add' 或 'edit'）。                    |
| **handleAdd**      | 函数     | 用于处理添加操作。它将 operateType 设置为 'add' 并打开操作抽屉。 |
| **editingData**    | Ref 对象 | 用于存储当前正在编辑的数据项。                               |
| **handleEdit**     | 函数     | 用于处理编辑操作。它接受一个 id 参数，用于查找并设置 editingData 为对应的数据项，并将 operateType 设置为 'edit'，然后打开操作抽屉。 |
| **checkedRowKeys** | Ref 对象 | 用于存储选中行的键（通常是 ID）数组。                        |
| **onBatchDeleted** | 异步函数 | 用于处理批量删除操作完成后的逻辑，如显示删除成功的消息并刷新数据。 |
| **onDeleted**      | 异步函数 | 用于处理单个删除操作完成后的逻辑，如显示删除成功的消息并刷新数据。 |



#### 场景六：后端接口数据结构适配

在日常开发场景中，前后端接口数据结构不一致是很常见的，可以参考本示例对接口数据结构进行适配

* 前端 `api` 接口声明

  ```typescript
  interface UserSearchParams {
      userName?: string;
      current: number;
      size: number;
      total: number;
  }

  interface PaginatingCommonParams {
      /** current page number */
      current: number;
      /** page size */
      size: number;
      /** total count */
      total: number;
  }

  /** common params of paginating query list data */
  interface PaginatingQueryRecord<T = any> extends PaginatingCommonParams {
      records: T[];
  }

  type User {
  	userName: string;
  	userGender: 'Male' | 'Female';
  	userAge: number;
  }

  type UserList = Common.PaginatingQueryRecord<User>;

  /** 获取用户列表 */
  export function fetchGetUserList(params?: UserSearchParams) {
    return request<UserList>({
      url: '/systemManage/getUserList',
      method: 'get',
      params
    });
  }
  ```



* 后端接口返回数据

  ```json
  {
      "code": 200,
      "msg": "操作成功",
      "data": {
          "list": [
              {"username": "小白", "gender": "男", "age": 18},
              {"username": "小粉", "gender": "女", "age": 24}
          ],
          "currentPage": 1,
          "pageSize": 2,
          "totalCount": 12
      }
  }
  ```

* 数据格式转换

  ```typescript
  import { useTable } from '@/hooks/common/table';
  import { fetchGetUserList } from '@/api/userApi';

  const { data, loading, pagination } = useTable({
    apiFn: fetchGetUserList,
    transformer: (response) => {
     const { list, currentPage, pageSize, totalCount } = response.data;

     const transformData = list.map(item => ({
        userName: item.username,
        userGender: item.gender === '男' ? 'Male' : 'Female',
        userAge: item.age
     }));

      return {
        records: transformData,
        current: currentPage,
        size: pageSize,
        total: totalCount,
      };
    }
  });
  ```



