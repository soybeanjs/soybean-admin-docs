# 系统请求

## 请求配置

<br />

### 多个请求环境

开发项目经常会用到多个请求环境地址：如用户开发环境的后台地址、用于测试环境的后台地址、用于预生产环境的后台地址和用于生产环境的地址等

在.env-config.ts 文件里面添加不同的请求环境地址

### 创建请求函数

在 src/service/request/index.ts 里面创建请求函数

#### 1.选择创建请求函数：createRequest 和 createHookRequest

createRequest => 返回 Promise：适合一些处理逻辑的请求(对结果需要进行多种判断)：如：登录、获取用户信息等

createHookRequest => 返回响应式的变量：适合一些直接展示数据的请求：如：列表、描述信息

#### 2.createRequest/createHookRequest 参数

axiosConfig：axios 配置，传入 baseUrl，定义一些其他配置：如：请求的超时时间

backendConfig：后端接口字段配置，传入各个字段名称(请求状态码、请求数据、请求信息)，传入后端业务上表示成功请求的状态

#### 3.导出创建的请求函数，在 api 文件夹下的文件里引入创建好的请求函数

例如：

```typescript
import { createRequest } from './request';
import { serviceEnv } from '~/.env-config';

const { url } = serviceEnv[import.meta.env.VITE_HTTP_ENV];

export const request = createRequest({ baseURL: url });
```

##### 4.调用请求函数时，需要传入一个范型，表示该接口请求成功后的数据的类型

例如：

```typescript
/** 获取用户信息 */
export function fetchUserInfo() {
  return mockRequest.get<ApiAuth.UserInfo>('/getUserInfo');
}
```
