# useTableHook 函数

---

`useTableHook` 是一个专为 SoybeanAdmin 设计的表格数据处理Hook，它提供了丰富的配置项，可以轻松的实现适配后端接口、处理数据、控制列的显示隐藏，以及实现数据的延迟加载等功能。本文档将详细介绍每个配置项，帮助你更顺手的使用这个Hook。

::: warning 注意
项目内有两个相关函数，分别是 `useTable` 和 `useHookTable`， `useTable` 是 `useHookTable` 的一个示例实现，请阅读时注意区分。
:::

[[toc]]

## 前言

项目内已经基于 `useHookTable` 实现了一个基础的 `useTable` 函数，对部分操作进行了简化，让页面的调用更为简便流畅，该 `useTable` 是我们认为的较为通用的白板实现，可以满足大部分的表格数据处理需求。如果您的需求较为特殊，可以根据本文档提供的配置项自行实现一个或是多个 `useTable` 函数。

## useHookTable的介绍说明

> 项目内的 `useTable` 都是基于 `useHookTable` 的，所以先了解 `useHookTable` 的配置项和使用方法是很有必要的。

`useHookTable` 是一个自定义的 Hook 函数，用于处理表格数据的获取、转换和展示。它接收一个配置对象，并返回处理完后的状态值

### 配置项

- `apiFn`

  - 类型：函数
  - 是否必须：是
  - 说明：用于获取表格数据，这个函数应该返回一个 `Promise`，并且提供完整的参数与返回值类型。

- `apiParams`

  - 类型：对象
  - 是否必须：是
  - 说明：包含调用 `apiFn` 时需要传递的参数。

- `transformer`

  - 类型：函数
  - 是否必须：是
  - 说明：用于将 `apiFn` 的响应转换为表格数据。

- `columns`

  - 类型：函数
  - 是否必须：是
  - 说明：返回一个数组，数组中的每个元素代表一个表格列。

- `getColumnChecks`

  - 类型：函数
  - 是否必须：是
  - 说明：接收 `columns` 作为参数，返回一个数组，数组中的每个元素是一个对象，包含 `key`、`title` 和 `checked` 属性，分别代表列的键、标题和是否被选中。这个方法并没有自身的实现，它依赖于外部传入。

- `getColumns`

  - 类型：函数
  - 是否必须：是
  - 说明：接收 `columns` 和 `checks` 作为参数，返回一个新的列数组。

- `onFetched`

  - 类型：函数
  - 是否必须：否
  - 说明：当响应被获取并转换后会被调用，接收转换后的数据作为参数。

- `immediate`
  - 类型：布尔值
  - 是否必须：否
  - 说明：是否立即获取数据。

#### `transformer` 和 `onFetched` 的异同

这两个函数的作用都是转换数据，但它们的侧重点不同：

- `transformer` 是一个必须的函数，它的作用是将 `apiFn` 的响应转换为表格数据。这个函数接收 `apiFn` 的响应作为参数，并返回一个对象，该对象包含了转换后的表格数据以及分页信息。这个函数的主要侧重点是数据的转换，即将从 API 获取的原始数据转换为适合在表格中显示的数据。
- `onFetched` 是一个可选的函数，它在响应被获取并转换后会被调用，接收转换后的数据作为参数。这个函数的主要侧重点是在数据获取和转换完成后执行一些额外的操作，例如更新状态或者打印日志等。这个函数并不改变数据，只是在数据获取和转换完成后执行一些副作用。

### 返回

`useHookTable` 返回一个对象，该对象包含以下属性：

- `loading`:

  - 类型：布尔值
  - 说明：表示是否正在加载数据。当 `apiFn` 被调用时，`loading` 会被设置为 `true`，当数据被获取并转换完成后，`loading` 会被设置为 `false`。

- `empty`:

  - 类型：布尔值
  - 说明：表示获取的数据是否为空。如果 `transformer` 转换的数据为空数组，那么 `empty` 会被设置为 `true`。

- `data`:

  - 类型：数组
  - 说明：包含了转换后的表格数据。

- `columns`:

  - 类型：数组
  - 说明：包含了应该被展示的列。

- `columnChecks`:

  - 类型：数组
  - 说明：包含了列的检查信息。每个元素是一个对象，包含 `key`、`title` 和 `checked` 属性，分别代表列的键、标题和是否被选中。

- `reloadColumns`:

  - 类型：函数
  - 说明：用于重新加载列。当调用这个函数时，会重新调用 `columns` 函数获取列，然后使用 `getColumnChecks` 和 `getColumns` 来确定哪些列应该被展示。

- `getData`:

  - 类型：函数
  - 说明：用于获取数据。当调用这个函数时，会调用 `apiFn` 获取数据，然后使用 `transformer` 将响应转换为表格数据。

- `searchParams`:

  - 类型：对象
  - 说明：包含了调用 `apiFn` 时的参数。

- `updateSearchParams`:

  - 类型：函数
  - 说明：用于更新 `searchParams`。这个函数接收一个对象作为参数，该对象的属性会被合并到 `searchParams` 中。

- `resetSearchParams`:
  - 类型：函数
  - 说明：用于重置 `searchParams`。当调用这个函数时，`searchParams` 会被重置为 `apiParams`。

### 使用

`useHookTable` 是一个非常通用的 Hook，它可以直接在页面上调用使用。这种方式的优点是直接和简单，你可以直接在页面组件中获取和处理表格数据。 <br />
然而，如果你的项目中有很多类似的表格页面，那么在 `useHookTable` 的基础上再封装一层可能会更好。
你可以创建一个新的 Hook，这个 Hook 在 `useHookTable` 的基础上提供一些默认的配置，例如 apiFn、transformer 等。这样，你的表格页面就可以更简洁，只需要提供一些特定的配置，例如 `apiParams`、`columns` 等。 <br />

以下为直接在页面内使用 `useHookTable` 的简单示例，具体还得根据实际情况进行调整

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
  // ...其他列配置
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

// 当需要获取数据时，例如在组件挂载完成后或者用户点击刷新按钮时，调用 getData 函数
getData();
</script>
```

## `useTable` 的介绍说明

`useTable` 是一个基于 `useHookTable` 的一个示例实现，它提供了一些默认的配置，例如 `apiFn`、`transformer` 等，以便更方便地使用。如果你的项目中有很多类似的表格页面，那么使用 `useTable` 可能会更方便。

### 配置项

`useTable`函数接受一个配置对象，该对象的属性如下：

- `apiFn`: 一个函数，用于获取表格数据的API函数。

- `apiParams`: 对象，传递给`apiFn`的参数。

- `immediate`: 布尔值，决定是否在组件挂载后立即调用`apiFn`获取数据。默认为`true`。

- `showTotal`: 布尔值，决定是否在分页组件中显示总条数。默认为`false`。

- `columns`: 数组，定义表格的列。每个元素是一个对象，包含以下属性：
  - `key`: 字符串，列的唯一标识。
  - `title`: 字符串，列的标题。
  - `align`: 字符串，列的对齐方式，可选值为`'left'`、`'center'`、`'right'`。
  - `width`: 数字，列的宽度。
  - `minWidth`: 数字，列的最小宽度。
  - `render`: 函数，用于自定义渲染列的内容。
  - 其他的配置项参考 `naive-ui` 文档。

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
      title: '用户名',
      align: 'center',
      minWidth: 100
    }
    // 更多列...
  ]
});
```

### 返回值

`useTable` 函数返回一个对象，该对象包含以下属性：

- `loading`: 布尔值，表示是否正在加载数据。

- `empty`: 布尔值，表示表格数据是否为空。

- `data`: 数组，表格的数据。

- `columns`: 数组，表格的列。

- `columnChecks`: 数组，表格列的选择状态。

- `reloadColumns`: 函数，用于重新加载表格列。

- `pagination`: 对象，表格的分页配置。

- `mobilePagination`: 对象，移动设备上的表格分页配置。

- `updatePagination`: 函数，用于更新表格的分页配置。

- `getData`: 函数，用于获取表格数据。

- `searchParams`: 对象，用于搜索的参数。

- `updateSearchParams`: 函数，用于更新搜索参数。

- `resetSearchParams`: 函数，用于重置搜索参数。

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

### 使用

项目内的 `useTable` 函数是基于 `useHookTable` 的一个示例实现，它践行了一些最佳实践，例如提供了默认的配置、封装了一些常用的操作、搜索删除等。 <br />
使用的时候只需要传入 `apiFn` ，定义好 `apiParams` 的类型， `columns` 就会根据配置自动构造出对应的类型提示，你只需要关注数据的处理与逻辑即可，具体使用请参考系统管理内的三个管理页面。 <br />
如果你的项目中有很多类似的表格页面，那么使用 `useTable` 函数可能会更方便。

::: warning 注意
`useHookTable` 并没有实现 `transformer` ，考虑到大部分列表页的接口相似性，我们将 `transformer` 写在了 `useTable` 中，这样可以减少重复代码的编写，初次调用前需要修改 `useTable` 中的 `transformer` 函数以适配你的后端接口。
:::

具体的代码这里就不贴了，直接看项目内的管理页面即可。

## 注意事项

### 类型说明

`useHookTable` 会根据 `apiFn` 函数的返回类型自动处理 `column` 等对象的类型，所以在定义 `apiFn` 函数时，需要明确返回值的类型。 <br />

同理，由于请求的返回已经明确了类型，你可以据此通过 `Common.CommonRecord` 、 `Common.PaginatingQueryRecord` 、 `CommonType.RecordNullable` 、 `Pick` 等工具类型来快速确定各个部分的类型，都是基操，`main` 分支的管理页面都有示例，也不再赘述了。

## 基本使用流程

1. 定义 API 函数
2. 配置 `useTable`
3. 配置 `transformer`
4. 使用返回的数据和状态
5. 处理分页和筛选

#### 步骤 1: 定义 API 函数

首先，您需要定义一个 API 函数，该函数负责与后端接口通信，获取表格数据。这个函数应该返回一个 `Promise`，其中封装的 `@/service/request` 中封装的函数本身就会返回 `Promise`。

```typescript
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

在使用 `useTable` 时，传入一个配置对象，该对象至少需要包含 `apiFn` 和 `columns` 两个字段。

- `apiFn`: 您在步骤 1 中定义的 API 函数。

- `columns`: 一个集合，用于展示表的列名称

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

#### 步骤 3: 配置 `transformer`

在 `@/hooks/common/table` 中配置 `useTable` ，修改 `transformer` 函数以适配您的后端接口数据结构。<br />

假设后端返回的数据为：

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

说明：

- `records` 是表格数据
- `current` 是当前页码
- `size` 是每页条数
- `total` 是总条数

则 `transformer` 的写法如下：

```typescript
transformer: res => {
  const { records = [], current = 1, size = 10, total = 0 } = res.data || {};

  // 这里可以对数据进行处理，例如添加序号
  const recordsWithIndex = records.map((item, index) => {
    return {
      ...item,
      index: (current - 1) * size + index + 1
    };
  });

  // 将处理后的数据返回
  return {
    data: recordsWithIndex,
    pageNum: current,
    pageSize: size,
    total
  };
},
```

#### 步骤 4: 使用返回的数据和状态

`useTable` 返回的对象中包含了表格数据（`data`）、加载状态（`loading`）、分页信息（`pagination`）等，您可以直接在组件中使用这些数据和状态。

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
    // 其他内容
  ]
});
</script>

<template>
  <div>
    <NButton @click="getData">获取数据</NButton>
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

#### 步骤 5: 处理分页和筛选

如果您的表格需要支持分页和筛选，您可以通过更新 `useTable` 配置对象中的 `apiParams` 来实现。`apiParams` 是一个响应式对象，您可以根据用户的操作动态更新它的值，`useTable` 会自动重新调用 `apiFn` 获取更新后的数据。

```javascript
const { data, loading, pagination, updateSearchParams } = useTable({
  apiFn: fetchUsers,
  apiParams: reactive({ current: 1, size: 10, searchKey: '' }), // 初始参数
  column: () => [
    // 列配置
  ]
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
transformer: res => {
  const flattenedData = res.data.records.map(record => ({
    ...record,
    address: record.address.street, // 假设 address 是一个对象，我们只需要 street 字段
  }));
  return {
    data: flattenedData,
    pageNum: res.data.pageNum,
    pageSize: res.data.pageSize,
    total: res.data.total,
  };
},
```

#### 场景二：自定义分页逻辑

在某些情况下，后端的分页逻辑可能与前端的分页组件不完全兼容，需要在前端进行适配。

- **示例**:

```typescript
transformer: res => {
  // 假设后端返回的是总页数而不是总记录数
  const totalRecords = res.data.pageNum * res.data.pageSize;

  return {
    data: res.data,
    pageNum: res.data.pageNum,
    pageSize: res.data.pageSize,
    total: totalRecords
  };
};
```

#### 场景三：动态筛选条件

在某些应用场景中，表格数据的筛选条件可能需要根据用户的输入或选择动态变化。以下示例展示了如何根据用户的输入动态更新 `apiParams` 来重新获取数据。

- **示例**:

```typescript
const apiParams = reactive<TableParams>({
  pageSize: 10,
  pageNum: 1,
  filter: ''
});

// 假设这是一个响应用户输入的方法
function updateUserFilter(newFilter: string) {
  apiParams.filter = newFilter;
  // 调用获取数据的方法，这里假设 useTable 提供了一个重新获取数据的方法
  fetchData();
}
```

#### 场景四：表格的基本操作

为了进一步优化和规范代码的结构、您还可以在 `useTableOperate` 的配置对象里通过配置对表格进行操作，如添加、编辑、删除条目以及管理弹出抽屉的可见性，通过在指定函数中实现自己的业务逻辑。

- 函数和字段说明

| 字段名             | 类别     | 说明                                                                                                                                |
| ------------------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **drawerVisible**  | Ref 对象 | 表示操作抽屉（如添加或编辑表单的抽屉）的可见性。                                                                                    |
| **openDrawer**     | 函数     | 用于打开操作抽屉。                                                                                                                  |
| **closeDrawer**    | 函数     | 用于关闭操作抽屉。                                                                                                                  |
| **operateType**    | Ref 对象 | 用于标识当前操作类型（'add' 或 'edit'）。                                                                                           |
| **handleAdd**      | 函数     | 用于处理添加操作。它将 operateType 设置为 'add' 并打开操作抽屉。                                                                    |
| **editingData**    | Ref 对象 | 用于存储当前正在编辑的数据项。                                                                                                      |
| **handleEdit**     | 函数     | 用于处理编辑操作。它接受一个 id 参数，用于查找并设置 editingData 为对应的数据项，并将 operateType 设置为 'edit'，然后打开操作抽屉。 |
| **checkedRowKeys** | Ref 对象 | 用于存储选中行的键（通常是 ID）数组。                                                                                               |
| **onBatchDeleted** | 异步函数 | 用于处理批量删除操作完成后的逻辑，如显示删除成功的消息并刷新数据。                                                                  |
| **onDeleted**      | 异步函数 | 用于处理单个删除操作完成后的逻辑，如显示删除成功的消息并刷新数据。                                                                  |
