# Frequently Asked Questions

::: tip
Here are some common questions. If you can't find it, you can feedback on [github issue](https://github.com/honghuangdc/soybean-admin/issues).
:::

## Preface

When encountering problems, you can try the following solutions

- Please first find out the key error information and necessary problem context
- Try to use search engines, technical websites, AI tools, etc. to search for the keywords of the error

| [Google](https://google.com) | [Bing](https://www.bing.com/) | ChatGPT | [StackoverFlow](https://stackoverflow.com/) |
| ---------------------------- | ----------------------------- | -------- | ------------------------------------------- |

- If the error is a dependency package problem, please try to search in the Github Issues of the dependency package
- Try to ask friends or tech gurus you know
- Ask questions in the official SoybeanAdmin communication group, please describe the problem as clearly as possible, so that everyone can help you better, you can refer to [The Wisdom of Asking Questions](https://github.com/tvvocold/How-To-Ask-Questions-The-Smart-Way)

## Problems with SoybeanAdmin Cache

**Problem Background**

The project configuration of SoybeanAdmin is `localStorage` by default, and the data related to the theme of the project is persisted when initialized

The project's cache is divided into two aspects

- LocalStorage
- SessionStorage

**Cache Key Points**

1. The use of cache in this framework is mainly concentrated in the following methods:
   - set: cache data by passing the required parameters `key`, `value` and optional parameter `expire` to the method
   - get: get cached data by passing the required parameter `key` to the method
   - remove: remove the specified cache data by passing the required parameter `key` to the method
   - clear: clear all `Storage` related cache data by calling this method
2. The type of cached data needs to be predefined in src/typings/storage.d.ts

## About Modifying File Related Issues

1. When modifying `.env` and other environment files and `vite.config.ts` files, vite will automatically restart the service.

> But automatic restart may have problems, please rerun the project to solve it.

2. When modifying `.vue` or `.ts`, vite's hot deployment may cause the page to freeze and unable to see

> The effect of real-time modification, `F5` refresh can solve it.


## The menu does not display after adding static routes in the front end

📢 Some enthusiastic group friends feedback: When first getting in touch with the project, add components first and then add static routes, but the menu and page cannot be rendered on the page, and the project does not report errors

Problem background

When the project initializes the route, the top-level route data meta of this classmate contains the `hideInMenu` attribute as true

So neither the menu nor the page can be displayed

  ::: tip Component location
  src/typings/router.d.ts
  :::

Go check [`RouteMeta`](../guide/router.md#Type Description)

**Solution:**

Remove the `hideInMenu` attribute to display the menu and page normally

## How to understand the permission routing mode in the project, how to define the data format of the corresponding rendering route

**Problem background**

The permission routing mode in the project is divided into:

- Static routing

  Static routing refers to the routing data in the front-end project: `src/router/routes.ts`
  The project can parse the routing data according to the definition in this path, and automatically render the menu information

- Dynamic routing

  Dynamic routing refers to the routing data passed by the backend project

> When the project uses the dynamic routing mode for data rendering, it will automatically overwrite the name value of the routing homepage

## The Tab page is blank after refreshing

📢 Some enthusiastic group friends feedback, there is a situation of `Tab page switching appears blank page` in the project in the development environment

---

This is due to the opening of the route switching animation, and the corresponding page component has multiple root elements,
You can add a `<div></div>` (or) at the outermost layer of the page

❌ **Wrong demonstration**

```vue
<template>
  <!-- Comments are also a tag node -->
  <p1></p1>
  <p2></p2>
</template>
```

✔ **Correct demonstration**

```vue
<template>
  <div>
    <p1></p1>
    <p2></p2>
  </div>
</template>
```

## Component Naming Issues

> 📢 Feedback from enthusiastic group members: In order to continue the style of high-quality code in the project, I want to learn a relatively scientific naming method, but I am troubled by the lack of specific format specifications.

**Naming conventions**

- File naming: uniformly named with lowercase letters, multiple words are connected with hyphens

```
views
├── home
├── demo-page
```

- Vue component names
  - The component name is uniformly named by the PascalCase method, and the first letter of multiple words is capitalized
  ```vue
  <template>
    <AppProvider>
      <RouterView class="bg-layout" />
    </AppProvider>
  </template>
  ```
  - The name of the iconify icon component is uniformly named by the kebab-case method, and multiple words are connected with hyphens
  ```vue
  <template>
    <icon-mdi-emoticon />
  </template>
  ```
  > Convenient for the iconify plugin to directly display icons


- Constructor, class, TS type naming: uniformly named by the PascalCase method, and the first letter of multiple words is capitalized

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

- Variable, ordinary function naming: uniformly named by the camelCase method, and the first letter of multiple words is lowercase

```ts
let num: number = 1;

function getNum() {}
```

- Constant naming: uniformly named with uppercase letters, multiple words are connected with underscores

```ts
const MAX_COUNT = 10;
```


- Naming of styles: Use lowercase letters uniformly, and connect multiple words with hyphens

```css
.container {
}

.container-item {
}
```

## Environmental Issues

> If there are errors in dependency installation, startup, etc., first check if the computer environment is fully installed.

The local environment needs to have

- [Git](https://git-scm.com/)

---

- **NodeJS**: >=18.0.0, recommended 18.19.0 or higher.
  > You can use [volta](https://volta.sh/) or [fnm](https://github.com/Schniz/fnm) to manage your NodeJS version.
- **pnpm**: >= 8.0.0, recommended latest version.

## Dependency Installation Issues

- Check network issues

- Check mirror source issues

- Check dependency package version issues

**Mirror Configuration**

> Explanation of the configuration items in the default mirror configuration file .npmrc of the project

🎯 File location: `.npmrc`

```
registry=https://registry.npmmirror.com/
shamefully-hoist=true
ignore-workspace-root-check=true
```

- `registry`: Specifies the mirror source of the npm package. The mirror source used in this project is the latest mirror of Taobao.
- `shamefully-hoist`: This option is used to hoist dependencies to the highest possible node to increase dependency sharing
- `ignore-workspace-root-check`: Ignore workspace root check when installing dependencies at the root path, that is, you do not need to add the `-w` parameter

> Full code guide [SoybeanAdmin🔜](https://github.com/soybeanjs/soybean-admin/blob/main/.npmrc)

## How to Keep the Code Up to Date

If you are using this project for project development. If you want to synchronize the latest code during development. You can set multiple sources

- Clone code

```bash
git clone https://github.com/soybeanjs/soybean-admin.git
```

- Add your own git source address

```bash
# 'up' is the name of the source, it can be set arbitrarily
# gitUrl is the latest open source code
git remote add up gitUrl;
```

3.  Commit code to your own git

```bash
# Commit code to your own git repository
# 'main' is the branch name, modify it according to your situation
git push up main

# Synchronize your own code
# 'main' is the branch name, modify it according to your situation
git pull up main
```

4.  How to synchronize the latest open source code

```bash
git pull origin main
```

> When managing code with Git, update first, resolve conflicts first, and then merge

## Why Dayjs

Day.js is a minimalist JavaScript library that can parse, validate, manipulate, and display dates and times for modern browsers.

**Why use Day.js?**

The file size is only about 2KB, less JavaScript to download, parse and execute, leaving more time for your code.

**Sandbox Mechanism**

All API operations that change Day.js objects will return a new instance. This helps prevent errors and avoid long debugging sessions.

**Internationalization**

Day.js has great support for internationalization. However, unless you use them, they will not be included in your build.

## Cross-domain issues

### Concept

Cross-origin refers to the situation in the browser where the current webpage requests resources from a different domain name, port, or protocol, causing security policy restrictions and thus cross-domain issues.

**Reasons for the formation of cross-domain**

- Same-origin policy: The browser's security policy restricts the page to only request resources under the same domain name, and resources under other domain names cannot be accessed.
- Different domain names: The requested resource is under a different domain name, such as [http://www.aaa.com] and [http://www.bbb.com]
- Different ports: The requested resource is under the same domain name, but different ports, such as [http://www.xxx.com] and [http://www.xxx.com:8080]
- Different protocols: The requested resource is under the same domain name, but different protocols, such as [http://www.xxx.com] and [https://www.xxx.com]

**Forward Proxy and Reverse Proxy**

1. Forward Proxy

_Forward proxy is a client proxy, proxying the client, the server does not know the actual client initiating the request._

> In this project, it refers to implementing forward proxy through configuring `Vite`



2. Reverse Proxy

<u>A forward proxy is a client proxy, proxying for the client, and the server does not know the actual client initiating the request.</u>

> Generally, the dist directory is deployed to the `Nginx` server, and reverse proxy is implemented by configuring `nginx.conf`

### Common Solutions

There are two types of cross-domain situations that may be encountered in actual development scenarios,

**Local Development Cross-Domain**

During local development, the following three methods are commonly used:

1. Vite's Proxy configuration forward proxy (this scheme is used in the project's local development environment)
2. Backend server enables CORS
3. Front-end server Nginx configures reverse proxy

> In the local development environment, the local proxy is enabled by default

**Production Environment Cross-Domain**

After the project is deployed to the production environment, Nginx is generally used to forward requests to the backend server

- SoybeanAdmin

🎯 File location: `./env-config.ts`

```ts
# The key code is as follows

/** Configuration of different request services */

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

> For the complete code, please refer to [SoybeanAdmin🔜](https://github.com/soybeanjs/soybean-admin/blob/main/env-config.ts)

⚙ Nginx Configuration Reference

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

You can access the homepage of this deployed project through `http://localhost:8080`

> The port configured in the project for the production environment must be consistent with the port number configured in `nginx.conf`
>
> If the backend service enables CROS, the frontend service does not need additional configuration

## The interface request is successful, but the response data cannot be obtained

> 📢 Some enthusiastic group friends feedback: When the project is interfacing, the request is sent successfully, and data can be seen in the response body of the request, but the data cannot be rendered to the page

## 404 error occurs when using Iframe to embed local HTML in the project

📢 Some enthusiastic group friends feedback: During the project development process, the business needs to use Iframe to embed local HTML files in the project, but after embedding, the page content cannot be displayed, and what is displayed is a 404 page

**Problem Background**

The entire project is a single-page application, so it does not support loading different HTML from the path itself, either create a multi-page application, or load other HTML in a single-page application through iframe.

**Solution**

Integrate the `vite-plugin-mpa` plugin.

## Refresh after Packaging, Page 404

**Background**

After building the project:

- Development Environment: Using plugins like live server to locally launch the packaged index.html, refreshing the page results in a 404 error.
- Production Environment: Deploying to a server and refreshing the page results in a 404 error.

**Cause of the Problem**

The default routing mode used by the system is the `history` mode. However, web servers like `Nginx` are based on static files by default. When requesting addresses like `/login`, `Nginx` will search for a `login.html` file. If it cannot find it, it will report a 404 error. Therefore, this mode requires the backend to cooperate by redirecting all access to `index.html`, leaving the specific routing information to be handled by `vue-router`.

**Solution**

Previewing Packaging Products in the Development Environment:

- Use the `pnpm preview` command to start previewing.

Production Environment:

- `Nginx` Configuration Reference (Please search for other web servers)

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

- Modifying the Routing Mode

If you cannot modify the web server, you can avoid this problem by changing the frontend routing mode to `hash`.

::: tip Code Location
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
