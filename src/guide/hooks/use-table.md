# useTable Hook
---

useTable is a table data processing function specifically designed for SoybeanAdmin. It offers a wide range of configuration options to adapt to backend interfaces, process data, control the visibility of columns, and implement data lazy loading, among other features. This document will detail each configuration option and provide optimized example code to help developers use this hook more efficiently.



By reading this document, you will learn about:

* Complete Configuration and Explanation

* Main Features and Functions

* Basic Usage Process

* Example Usage Scenarios




## Complete Configuration and Explanation

#### `apiFn`

- **Type**: `(params: any) => Promise<any>`

- **Description**: The API function used to fetch table data. This function takes `apiParams` as its parameter and returns a Promise, which resolves to the table data.

- **Example**:

  ```javascript
  const fetchTableData = (params) => {
    return axios.get('/api/tableData', { params });
  };
  ```

#### `apiParams`

- **Type**: `Object`

- **Description**: The parameters passed to `apiFn`, usually including pagination information, filter conditions, etc.

- **Example**:

  ```javascript
  apiParams: reactive({
    pageSize: 10,
    pageNum: 1,
    filter: '',
  }),
  ```

#### `transformer`

- **Type**: `(response: any) => { data: Array<any>, pageNum: number, pageSize: number, total: number }`

- **Description**: The transformer function used to convert the data format returned by `apiFn` into the format required by the hook.

- **Example**:

  ```javascript
  transformer: (response) => ({
    data: response.data.records,
    pageNum: response.data.pageNum,
    pageSize: response.data.pageSize,
    total: response.data.total,
  }),
  ```

#### `columns`

- **Type**: `() => Array<{ key: string, title: string, visible?: boolean }>`

- **Description**: The column configuration function, returning an array of table column configurations.

- **Example**:

  ```javascript
  columns: () => [
    { key: 'name', title: 'Name', visible: true },
    { key: 'age', title: 'Age', visible: true },
    { key: 'email', title: 'Email', visible: false },
  ],
  ```

#### `getColumnChecks`

- **Type**: `(columns: Array<{ key: string, title: string, visible?: boolean }>) => Array<{ key: string, title: string, checked: boolean }>`

- **Description**: A function to generate the visibility state of columns.

- **Example**:

  ```javascript
  getColumnChecks: (columns) => columns.map(column => ({
    key: column.key,
    title: column.title,
    checked: column.visible,
  })),
  ```

#### `getColumns`

- **Type**: `(columns: Array<{ key: string, title: string }>, checks: Array<{ key: string, checked: boolean }>) => Array<{ key: string, title: string }>`

- **Description**: A function to filter out the columns that should be displayed based on their visibility state.

- **Example**:

  ```javascript
  getColumns: (columns, checks) => columns.filter(column => {
    const check = checks.find(check => check.key === column.key);
    return check ? check.checked : false;
  }),
  ```

#### `onFetched`

- **Type**: `?(transformedData: { data: Array<any>, pageNum: number, pageSize: number, total: number }) => void`

- **Description**: A callback function after data is fetched and processed.

- **Example**:

  ```javascript
  onFetched: (transformedData) => {
    console.log('Data fetched', transformedData);
  }
  ```

#### `immediate`

- **Type**: `boolean`

- **Description**: Controls whether to immediately fetch data upon hook initialization.

- **Default Value**: `true`

- **Example**:

  ```javascript
  immediate: true
  ```

#### `showTotal` <sup class="vt-badge"> v1.1.0+ </sup>

- **Type**: `boolean`

- **Description**: Control whether to display the total number of records before the table pagination(Not displayed by default on mobile).

- **Default Value**: `false`

- **Example**:

  ```javascript
  showTotal: true
  ```


## Main Features and Functions

The `useTable` hook mainly provides the following features:

- Data loading state management
- Retrieval and display of table data
- Data pagination handling
- Data filtering functionality
- Control over the visibility of columns

The `useTable` hook mainly provides the following functions:

| Field Name            | Type       | Description                        |
| --------------------- | ---------- | ---------------------------------- |
| **loading**           | Boolean    | Indicates whether data is loading. |
| **empty**             | Boolean    | Indicates whether the table data is empty. |
| **data**              | Reactive Reference | Reactive reference to the table data. |
| **columns**           | Configuration Array | Configuration array for table columns. |
| **columnChecks**      | State Array | Array of states for column visibility. |
| **reloadColumns**     | Function   | Used to reload column configurations. |
| **getData**           | Function   | Used to fetch table data.          |
| **searchParams**      | Reactive Object | Reactive object for search parameters. |
| **updateSearchParams**| Function   | Used to update search parameters.  |
| **resetSearchParams** | Function   | Used to reset search parameters.   |


## Basic Usage Process

- Step 1: Define the API function

- Step 2: Configure useTable

- Step 3: Use the returned data and state

- Step 4: Handle pagination and filtering



#### Step 1: Define the API function

First, you need to define an API function that is responsible for communicating with the backend interface to obtain table data. This function should return a Promise, and the result of the Promise resolution should be the data returned by the backend.

```typescript
// api/userApi.js
import { request } from '../request';

// Define the API function to fetch the user list
export function fetchGetUserList(params?: Api.SystemManage.UserSearchParams) {
  return request<Api.SystemManage.UserList>({
    url: '/systemManage/getUserList',
    method: 'get',
    params
  });
}
```

#### Step 2: Configure `useTable`

When using `useTable`, pass in a configuration object, which must include at least two fields: `apiFn` and `transformer`.

- **`apiFn`**: The API function you defined in Step 1.
- **`transformer`**: A function that transforms the data format returned by the backend into the format required by `useTable`.
- **`columns`**: A collection used to display the column names of the table.

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
        title: 'index',
        align: 'center',
        width: 64
    },
    {
        key: 'userName',
        title: 'username',
        align: 'center',
        minWidth: 100
    }]
});
```

#### Step 3: Using the Returned Data and State

The object returned by `useTable` contains table data (`data`), loading status (`loading`), pagination information (`pagination`), etc. You can directly use this data and state in your components.

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
#### Step 4: Handling Pagination and Filtering

If your table needs to support pagination and filtering, you can achieve this by updating the `apiParams` in the `useTable` configuration object. `apiParams` is a reactive object that you can dynamically update based on user actions, and `useTable` will automatically re-call `apiFn` to fetch the updated data.

```javascript
const { data, loading, pagination, updateSearchParams } = useTable({
  apiFn: fetchUsers,
  apiParams: reactive({ current: 1, size: 10, searchKey: '' }), // Initial parameters
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
// Update search parameters example
function search(searchKey) {
  updateSearchParams(params => {
    params.searchKey = searchKey;
    params.current = 1; // Reset to the first page
  });
}
```



## Example Usage Scenarios



#### Scenario One: Handling Complex Data Structures

Suppose the data structure returned by the backend contains nested objects, and we need to flatten this data for display in the table.

- **Example**:

  ```typescript
  const transformer: (response: ApiResponse) => { data: Array<any>; pageNum: number; pageSize: number; total: number; } = (response) => {
    const flattenedData = response.data.records.map(record => ({
      ...record,
      address: record.address.street, // Assuming address is an object and we only need the street field
    }));
    return {
      data: flattenedData,
      pageNum: response.data.pageNum,
      pageSize: response.data.pageSize,
      total: response.data.total,
    };
  },



#### Scenario Two: Custom Pagination Logic

In some cases, the pagination logic on the backend may not be completely compatible with the pagination component on the frontend, and may need to be adapted on the frontend.

- **Example**:
  ```typescript
  const transformer: (response: ApiResponse) => { data: Array<any>; pageNum: number; pageSize: number; total: number; } = (response) => {
    // Suppose the backend returns the total number of pages instead of the total number of records
    const totalRecords = response.data.pageNum * response.data.pageSize;
    return {
      data: response.data
      pageNum: response.data.pageNum,
      pageSize: response.data.pageSize,
      total: totalRecords
      };
    }
  ```



#### Scenario Three: Dynamic Filter Conditions

In some application scenarios, the filter conditions of table data may need to change dynamically based on user input or selection. The following example shows how to dynamically update `apiParams` based on user input to re-fetch data.

- **Example**:

  ```typescript
  const apiParams = reactive<TableParams>({
    pageSize: 10,
    pageNum: 1,
    filter: '',
  });

  // Assume this is a method that responds to user input
  function updateUserFilter(newFilter: string) {
    apiParams.filter = newFilter;
    // Call the method to fetch data, assuming useTable provides a method to re-fetch data
    fetchData();
  }
  ```



#### Scenario Four: Show and Hide Columns

In the configuration object of `useTable`, you can pass in column configurations through the `columns` field. In addition, you need to define the `getColumnChecks` and `getColumns` functions to handle the visibility status of the columns.

- **`getColumnChecks`**: Used to generate the initial value of the column visibility status.
- **`getColumns`**: Filter out the columns that should be displayed based on the column visibility status.

```typescript
import { useTable } from '@/hooks/common/table';

const { columns, columnChecks, reloadColumns } = useTable({
  // Other configurations...
  columns: () => columnsConfig,
  getColumnChecks: (cols) => cols.map(col => ({ key: col.key, title: col.title, checked: col.visible })),
  getColumns: (cols, checks) => cols.filter(col => checks.find(check => check.key === col.key && check.checked)),
});
```



#### Scenario Five: Basic Operations on the Table

To further optimize and standardize the structure of the code, you can also configure the table for operations in the `useTableOperate` configuration object, such as adding, editing, deleting entries, and managing the visibility of the pop-up drawer, by implementing your own business logic in the specified functions.

* Function and Field Descriptions

| Field Name       | Type    | Description                                                                                   |
|---------------|--------|--------------------------------------------------------------------------------------|
| **drawerVisible** | Ref Object | Represents the visibility of the operation drawer (such as the drawer for adding or editing forms).                                                     |
| **openDrawer**    | Function | Used to open the operation drawer.                                                                         |
| **closeDrawer**   | Function | Used to close the operation drawer.                                                                         |
| **operateType**   | Ref Object | Used to identify the current operation type ('add' or 'edit').                                                     |
| **handleAdd**     | Function | Used to handle the add operation. It sets the operateType to 'add' and opens the operation drawer.                                      |
| **editingData**   | Ref Object | Used to store the currently editing data item.                                                               |
| **handleEdit**    | Function | Used to handle the edit operation. It takes an id parameter, which is used to find and set the editingData to the corresponding data item, sets the operateType to 'edit', and then opens the operation drawer. |
| **checkedRowKeys**| Ref Object | Used to store an array of keys (usually IDs) of the selected rows.                                                         |
| **onBatchDeleted**| Async Function  | Used to handle the logic after the batch delete operation is completed, such as displaying a successful deletion message and refreshing the data.                                      |
| **onDeleted**     | Async Function  | Used to handle the logic after a single delete operation is completed, such as displaying a successful deletion message and refreshing the data.                                      |



#### Scenario Six: Adapting Backend API Data Structures

In daily development scenarios, it is common to encounter inconsistencies between frontend and backend API data structures. You can refer to this example to adapt the API data structures.



* Frontend `api` Interface Declaration

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

  /** get user list */
  export function fetchGetUserList(params?: UserSearchParams) {
    return request<UserList>({
      url: '/systemManage/getUserList',
      method: 'get',
      params
    });
  }
  ```



* Backend API Response Data
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



* Data Format Transformation

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



