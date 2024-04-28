# 常见问题

::: tip
这里列举了一些常见的问题。如果没有找到可以在 [github issue](https://github.com/honghuangdc/soybean-admin/issues) 反馈。
:::

## 前言

遇到问题，可以尝试以下的解决方案

- 请先找出关键性的错误信息以及必要问题上下文
- 尝试使用搜索引擎、技术网站、AI 工具等搜索错误的关键词

| [Google](https://google.com) | [Bing](https://www.bing.com/) | ChatGPT | [StackoverFlow](https://stackoverflow.com/) |
| ---------------------------- | ----------------------------- | -------- | ------------------------------------------- |

- 若是错误为依赖包的问题，请尝试去依赖包的 Github 的 Issues 中搜索
- 尝试请教认识的朋友或技术大佬
- 在SoybeanAdmin官方交流群里面提问，请尽量描述清楚问题，以便大家更好的帮助你，可以参考 [提问的智慧](https://github.com/tvvocold/How-To-Ask-Questions-The-Smart-Way)

## SoybeanAdmin 缓存方面的问题

**问题背景**

SoybeanAdmin 的项目配置默认是  `localStorage` , 初始化时对项目的主题涉及的数据进行持久化

项目的缓存分为两方面

- LocalStorage
- SessionStorage

**缓存要点**

1. 对于本框架缓存方面的使用主要集中在下列几个方法中：
   - set：通过给方法传递必填参数 `key` 、`value` 和可选参数 `expire` 对数据进行缓存
   - get：通过给方法传递必填参数 `key` 获取缓存的数据
   - remove：通过给方法传递必填参数 `key` 移除指定的缓存数据
   - clear：通过调用该方法，清除当前所有的 `Storage` 相关的缓存数据
2. 缓存的数据类型需要预先在 src/typings/storage.d.ts 里面定义好

## 关于修改文件相关的问题

1. 当修改  `.env`  等环境文件及  `vite.config.ts`  文件时，vite 会自动重启服务。

> 但是自动重启有几率出现问题，请重新运行项目即可解决。

2. 当修改 `.vue` 或者 `.ts` 时， vite 进行热部署时有几率造成页面卡顿导致无法看到

> 实时修改的效果，`F5` 刷新即可解决

## 前端静态路由添加菜单后没显示

📢 有热心群友反馈：刚接触项目时，先添加组件再添加静态路由，但是页面上无法渲染菜单和页面，项目不报错

问题背景

项目初始化路由时，该同学的顶级路由数据 meta 中含有 `hideInMenu` 属性为 true

所以菜单和页面都无法显示出来

  ::: tip 组件位置
  src/typings/router.d.ts
  :::

跳转查看 [`RouteMeta`](../guide/router/intro.md#配置属性)

**解决方案:**

去除 `hideInMenu` 属性即可正常显示菜单和页面

## 项目中的权限路由模式如何理解，相应的渲染路由的数据格式怎么定义

**问题背景**

项目中的权限路由模式分为：

- 静态路由

  静态路由指的是前端项目：`src/router/routes.ts` 中的路由数据
  项目能够根据在这个路径下定义进行路由数据的解析，并自动渲染出菜单信息

- 动态路由

  动态路由指的是后台项目传递过来的路由数据

> 项目使用动态路由模式进行数据渲染时，会自动覆盖路由首页的 name 值

## Tab 页签刷新后一片空白

📢 有热心群友反馈，项目在开发环境中存在 `Tab 页切换出现空白页的情况`

---

这是由于开启了路由切换动画，且对应的页面组件存在多个根元素时导致的，
可以通过在页面最外层添加一个 `<div></div>` ( 或者) 即可

❌ **错误示范**

```vue
<template>
  <!-- 注释也算一个标签节点哦  -->
  <p1></p1>
  <p2></p2>
</template>
```

✔ **正确示范**

```vue
<template>
  <div>
    <p1></p1>
    <p2></p2>
  </div>
</template>
```

## 组件命名问题

> 📢 有热心群友反馈：为了延续项目高质量代码的风格，想学习一种相对科学的命名方式，但苦于没有具体的格式规范

**命名规范**

- 文件命名: 统一用小写字母命名，多个单词用中划线连接

```
views
├── home
├── demo-page
```

- Vue 组件名称
  - 组件名称统一用 PascalCase 法命名，多个单词首字母大写
  ```vue
  <template>
    <AppProvider>
      <RouterView class="bg-layout" />
    </AppProvider>
  </template>
  ```
  - iconify 图标组件名称统一用 kebab-case 法命名，多个单词用中划线连接
  ```vue
  <template>
    <icon-mdi-emoticon />
  </template>
  ```
  > 方便iconify插件直接展示图标


- 构造函数、class 类、TS 类型命名：统一用 PascalCase 法命名，多个单词首字母大写

```ts
function Person() {}

class Person {}

type Person = {
  name: string;
};

interface Person {
  name: string;
}
```

- 变量、普通函数命名：统一用 camelCase 法命名，多个单词首字母小写

```ts
let num: number = 1;

function getNum() {}
```

- 常量命名：统一用大写字母命名，多个单词用下划线连接

```ts
const MAX_COUNT = 10;
```

- 样式的命名：统一用小写字母命名，多个单词用中划线连接

```css
.container {
}

.container-item {
}
```

## 环境问题

> 如果出现依赖安装报错，启动报错等。先检查电脑环境有没有安装齐全。

本地环境需要具备

- [Git](https://git-scm.com/)

---

- **NodeJS**: >=18.0.0，推荐 18.19.0 或更高。
  > 你可以使用 [volta](https://volta.sh/) 或 [fnm](https://github.com/Schniz/fnm) 来管理你的NodeJS版本。
- **pnpm**: >= 8.0.0，推荐最新版本。

## 依赖安装问题

- 检查网络问题

- 检查镜像源问题

- 检查依赖包版本问题

**镜像配置**

> 项目默认镜像配置文件 .npmrc 的配置项说明

🎯 文件位置：`.npmrc`

```
registry=https://registry.npmmirror.com/
shamefully-hoist=true
ignore-workspace-root-check=true
```

- `registry`：指定了 npm 包的镜像源，本项目中使用的镜像源是淘宝的最新镜像。
- `shamefully-hoist`：该选项用于将依赖项 hoist 到尽可能高的节点上，提高依赖项的共用
- `ignore-workspace-root-check`：在跟路径安装依赖时，忽略工作区根检查，即不用加上 `-w` 参数

> 完整代码指路 [SoybeanAdmin🔜](https://github.com/soybeanjs/soybean-admin/blob/main/.npmrc)

## 代码如何保持最新

如果你使用了该项目进行项目开发。开发之中想同步最新的代码。你可以设置多个源的方式

- 克隆代码

```bash
git clone https://github.com/soybeanjs/soybean-admin.git
```

- 添加自己的 git 源地址

```bash
# up 为源名称,可以随意设置
# gitUrl为开源最新代码
git remote add up gitUrl;
```

3.  提交代码到自己的 git

```bash
# 提交代码到自己的 git 仓库
# main为分支名 需要自行根据情况修改
git push up main

# 同步自己的代码
# main为分支名 需要自行根据情况修改
git pull up main
```

4.  如何同步开源最新代码

```bash
git pull origin main
```

> 使用 Git 进行代码管理的时候，先更新，遇到冲突先解决，然后再合并

## 为什么是 dayjs

Day.js 是一个极简的 JavaScript 库，可以为现代浏览器解析、验证、操作和显示日期和时间。

**为什么使用 Day.js？**

文件大小只有 2KB 左右，下载、解析和执行的 JavaScript 更少，为代码留下更多的时间。

**沙箱机制**

所有更改 Day.js 对象的 API 操作都将返回一个新的实例。这有助于防止错误和避免长时间的调试会话。

**国际化**

Day.js 对国际化有很大的支持。但是，除非您使用它们，否则它们都不会包含在您的构建中。

## 跨域问题

### 概念

跨域（Cross-Origin）指的是在浏览器中，当前网页从一个不同的域名、端口或协议请求资源，导致安全策略限制，从而出现跨域问题。

**跨域的形成原因**

- 同源策略：浏览器的安全策略限制了页面只能请求同一域名下的资源，其他域名下的资源不能访问。
- 域名不同：请求的资源在不同的域名下，例如  [http://www.aaa.com]  和  [http://www.bbb.com]
- 端口不同：请求的资源在同一域名下，但端口不同，例如  [http://www.xxx.com]  和  [http://www.xxx.com:8080]
- 协议不同：请求的资源在同一域名下，但协议不同，例如  [http://www.xxx.com]  和  [https://www.xxx.com]

**正向代理和反向代理**

1. 正向代理

_正向代理即是客户端代理, 代理客户端, 服务端不知道实际发起请求的客户._

> 在本项目中指的是通过配置 `Vite` 实现正向代理

2. 反向代理

<u>正向代理即是客户端代理, 代理客户端, 服务端不知道实际发起请求的客户端.</u>

> 一般是将 dist 目录部署到 `Nginx` 服务器后，通过配置 `nginx.conf` 实现反向代理

### 常见解决方案

实际的开发场景可能遇到的跨域有两种情况，

**本地开发跨域**

在进行本地开发时，一般比较常见的是使用下面三种方式进行处理：

1. Vite 的 Proxy 配置正向代理 （项目本地开发环境使用的此方案）
2. 后台服务器开启 CORS
3. 前端服务器 Nginx 配置反向代理

> 本地开发环境中，默认开启本地代理

**生产环境跨域**

项目部署至生产环境后，一般使用 Nginx 进行请求转发至后台服务器

- SoybeanAdmin

🎯 文件位置： `./env-config.ts`

```ts
# 关键代码如下所示

/** 不同请求服务的环境配置 */

const serviceConfigMap: App.Service.ServiceConfigMap = {
  dev: {
    baseURL: mockURL,
    otherBaseURL: {
      demo: 'http://localhost:9528'
    }
  },
  test: {
    baseURL: mockURL,
    otherBaseURL: {
      demo: 'http://localhost:9529'
    }
  },
  prod: {
    baseURL: mockURL,
    otherBaseURL: {
      demo: 'http://localhost:9530'
    }
  }
};
```

> 完整代码指路 [SoybeanAdmin🔜](https://github.com/soybeanjs/soybean-admin/blob/main/env-config.ts)

⚙ Nginx 配置参考

```java
# nginx.conf

server {
  listen       8080;
  server_name  localhost;

  # 接口代理，用于解决跨域问题
  location /url {
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

    # 后台接口地址
    proxy_pass http://xxx.xxx.xx.x:8080/api;

    proxy_redirect default;
    add_header Access-Control-Allow-Origin *;
    add_header Access-Control-Allow-Headers X-Requested-With;
    add_header Access-Control-Allow-Methods GET,POST,OPTIONS;
  }
}

```

就可以通过 `http://localhost:8080` 访问到这个已部署项目的首页

> 项目中配置生产环境端口必须和 `nginx.conf` 中 listen 配置的 端口号 保持一致
>
> 如果后台服务开启 CROS， 前台服务则不需要额外配置

## 接口请求成功，无法获取到响应数据

> 📢 有热心群友反馈：项目在接口时，请求发送成功 , 可以在请求的响应体中看到数据，但是无法将数据渲染到页面中

## 项目中使用 Iframe 嵌入本地的 HTML 时出现 404 的问题

📢 有热心群友反馈：在项目开发过程中，业务需要在项目中使用 Iframe 嵌入本地的 HTML 文件, 但是嵌入后无法显示页面内容，显示的是 404 页面

**问题背景**

整个项目都是单页面应用，所以从路径里去加载不同的 HTML 本身就不支持，要么创建多页面应用，要么在单页面应用里通过 iframe 去加载其它的 HTML。

**解决方案**

集成 `vite-plugin-mpa` 插件。

## 打包后刷新，页面404

**问题背景**

项目build之后：
- 开发环境： 用live server等插件在本地启动打包后的index.html，刷新页面404
- 生产环境： 部署到服务器，刷新页面404

**问题原因**

系统默认使用的路由模式是 `history` 模式，而 `Nginx` 等web服务器默认是基于静态文件的，在请求 `/login` 等地址的时候，`Nginx` 会去寻找 `login.html` 这个文件，找不到就会报404了，所以该模式需要后端配合将所有访问都指向 `index.html`，将具体的路由信息交由 `vue-router` 处理。

**解决方案**

开发环境预览打包产物：
- 使用 `pnpm preview` 命令启动预览。

生产环境：
- `Nginx` 配置参考（其他web服务器自行搜索）

```java
# nginx.conf

server {
  listen 80;
  listen [::]:80;
  server_name localhost;

  location / {
    root /usr/share/nginx/html;
    index index.html index.htm;
    try_files $uri $uri/ /index.html; // [!code ++]
  }

  error_page 500 502 503 504 /50x.html;
  location = /50x.html {
    root /usr/share/nginx/html;
  }
}
```

- 修改路由模式

如果无法修改web服务器，可以通过修改前端路由模式为 `hash` 避免该问题

::: tip 代码位置
./env
:::

```dotenv{5}
# whether to enable http proxy when is dev mode
VITE_HTTP_PROXY=Y

# vue-router mode: hash | history | memory // [!code focus:2]
VITE_ROUTER_HISTORY_MODE=hash

# success code of backend service, when the code is received, the request is successful
VITE_SERVICE_SUCCESS_CODE=0000
```
