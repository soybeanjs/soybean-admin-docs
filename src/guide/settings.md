# 配置

用于修改项目的配色、布局、缓存等

## 项目配置

项目配置包含主题配置、导航配置、全局头部、底部的高度、多页签、面包屑和页面的相关配置。

默认的配置在 src/settings/theme.json 里面，只要在开发时通过项目配置抽屉更改设置，然后拷贝设置，在将拷贝的设置覆盖 theme.json 就能成为默认的配置了。

### 主题配置

```typescript
interface ThemeSetting {
	/** 深色模式 */
	darkMode: boolean;
	/** 主题颜色 */
	themeColor: string;
	/** 主题颜色列表 */
	themeColorList: string[];
	/** 其他颜色 */
	otherColor: {
		/** 信息 */
		info: string;
		/** 成功 */
		success: string;
		/** 警告 */
		warning: string;
		/** 错误 */
		error: string;
	};
}
```

主题相关的配置都会通过 themeStore 状态组合成 符合 naiveUI 框架的 NConfigProvider 组件的 themeOverrids;

#### themeStore 的 themeOverrides

通过 themeColor, info, success, warning, error 五种颜色，'' | 'Suppl' | 'Hover' | 'Pressed' | 'Active'五种颜色场景， 在函数 **getThemeColors**的作用下产生了 25 种不同的颜色注入到了 NConfigProvider 组件的 themeOverrids

#### 结合 windicss

将 themeOverrides 的 common 相关的颜色转换成 css vars, 然后挂载到 html 上。

在 windicss 配置里面添加 extends colors, 各个 css vars 就是 html 上的 css vars，在 vue 里面就能通过 windicss 使用各种颜色在不同场景上。

例如： 下面的 class 里面就应用了不同的颜色

```css
class="border border-primary bg-success text-error"
```

```typescript
const colors = {
	primary: "var(--primary-color)",
	"primary-hover": "var(--primary-color-hover)",
	"primary-pressed": "var(--primary-color-pressed)",
	"primary-active": "var(--primary-color-active)",
	info: "var(--info-color)",
	"info-hover": "var(--info-color-hover)",
	"info-pressed": "var(--info-color-pressed)",
	"info-active": "var(--info-color-active)",
	success: "var(--success-color)",
	"success-hover": "var(--success-color-hover)",
	"success-pressed": "var(--success-color-pressed)",
	"success-active": "var(--success-color-active)",
	warning: "var(--warning-color)",
	"warning-hover": "var(--warning-color-hover)",
	"warning-pressed": "var(--warning-color-pressed)",
	"warning-active": "var(--warning-color-active)",
	error: "var(--error-color)",
	"error-hover": "var(--error-color-hover)",
	"error-pressed": "var(--error-color-pressed)",
	"error-active": "var(--error-color-active)",
};
```

### 请求配置

<br />

#### 多个请求环境

开发项目经常会用到多个请求环境地址：如用户开发环境的后台地址、用于测试环境的后台地址、用于预生产环境的后台地址和用于生产环境的地址等

在.env-config.ts 文件里面添加不同的请求环境地址

#### 创建请求函数

在 src/service/request/index.ts 里面创建请求函数

##### 1.选择创建请求函数：createRequest 和 createHookRequest

createRequest => 返回 Promise：适合一些处理逻辑的请求(对结果需要进行多种判断)：如：登录、获取用户信息等

createHookRequest => 返回响应式的变量：适合一些直接展示数据的请求：如：列表、描述信息

##### 2.createRequest/createHookRequest 参数

axiosConfig：axios 配置，传入 baseUrl，定义一些其他配置：如：请求的超时时间

backendConfig：后端接口字段配置，传入各个字段名称(请求状态码、请求数据、请求信息)，传入后端业务上表示成功请求的状态

##### 3.导出创建的请求函数，在 api 文件夹下的文件里引入创建好的请求函数

例如：

```typescript
import { createRequest } from "./request";
import { serviceEnv } from "~/.env-config";

const { url } = serviceEnv[import.meta.env.VITE_HTTP_ENV];

export const request = createRequest({ baseURL: url });
```

##### 4.调用请求函数时，需要传入一个范型，表示该接口请求成功后的数据的类型

例如：

```typescript
/** 获取用户信息 */
export function fetchUserInfo() {
	return mockRequest.get<ApiAuth.UserInfo>("/getUserInfo");
}
```
