# 开始

本文会帮助你从头启动项目

## 环境准备

本地环境需要安装 [pnpm 7.x+](https://pnpm.io/) 、[Node.js 14.x+](http://nodejs.org/) 和 [Git](https://git-scm.com/)

## 工具配置

本项目推荐使用VSCode进行开发，项目里面已内置VSCode配置，包含推荐的插件和设置。

以下为推荐的插件：

- [Auto Close Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-close-tag) - 自动添加HTML/XML结束标签
- [Auto Complete Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-complete-tag) - 为HTML/XML添加关闭标签和自动重命名成对的标签
- [Auto Import](https://marketplace.visualstudio.com/items?itemName=steoates.autoimport) - 自动查找、解析和提供所有可用导入的代码操作和代码完成
- [Auto Rename Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag) - 自动重命名成对的HTML/XML标签
- [Color Highlight](https://github.com/naumovs/vscode-ext-color-highlight) - 颜色高亮插件
- [DotENV](https://marketplace.visualstudio.com/items?itemName=mikestead.dotenv) - 高亮.env文件
- [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) - 统一不同编辑器的一些配置
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) - 代码检查
- [Git Graph](https://marketplace.visualstudio.com/items?itemName=mhutchie.git-graph) - Git图形化操作工具
- [GitLens — Git supercharged](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens) - 显示具体某行代码的git信息
- [Icônes](https://marketplace.visualstudio.com/items?itemName=afzalsayed96.icones) - 搜索iconify图标的插件
- [Iconify IntelliSense](https://marketplace.visualstudio.com/items?itemName=antfu.iconify) - Iconify图标实时显示的插件
- [javascript console utils](https://marketplace.visualstudio.com/items?itemName=whtouche.vscode-js-console-utils) - 提供快捷键ctrl+l直接输入console.log()
- [Material Icon Theme](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme) - 图标主题，显示文件和文件多种图标
- [Path Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense) - 智能显示导入的路径
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) - 代码格式化插件
- [UnoCSS](https://marketplace.visualstudio.com/items?itemName=antfu.unocss) - unocss写法提示插件
- [Vue Language Features (Volar)](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) - volar插件， Language support for Vue 3
- [Vue VSCode Snippets](https://marketplace.visualstudio.com/items?itemName=sdras.vue-vscode-snippets) - vue2、vue3写法提示

## 代码获取

### 从 GitHub 获取代码

```bash
# 克隆代码
git clone https://github.com/honghuangdc/soybean-admin.git
```

### 从 Gitee 获取代码

```bash
# 克隆代码
git clone https://gitee.com/honghuangdc/soybean-admin.git
```

::: warning 注意

最新版本的代码以github为准。

:::

## 安装

### 安装 Node.js

[链接](/tutorial/install.html#安装-node-js)

### 安装pnpm

[链接](/tutorial/install.html#安装pnpm)

### 安装依赖

安装项目依赖

```bash
pnpm i
```

安装全局依赖

```bash
# 用于执行git cz命令，代替git commit, 或者不安装执行 yarn cz | pnpm cz
pnpm i -g commitizen
```

初始化husky

```bash
pnpm prepare
```

## 插件配置

### 安装Volar，禁用Vetur
- [Vue Language Features (Volar)](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) - volar插件， Language support for Vue 3

### 开启Volar的takeover mode

1. 搜索插件 @builin typescript
2. 鼠标右键 “JavaScript 和 TypeScript 的语言功能”
3. 点击 “禁用工作区”

## npm script

```json
"scripts": {
	//本地运行(dev环境)
	"dev": "cross-env VITE_ENV_TYPE=dev vite",
	//本地运行(test环境)
	"dev:test": "cross-env VITE_ENV_TYPE=test vite",
	//本地运行(prod环境)
	"dev:prod": "cross-env VITE_ENV_TYPE=prod vite",
	//构建打包(prod环境)
	"build": "npm run typecheck && cross-env VITE_ENV_TYPE=prod vite build",
	//构建打包(dev环境)
	"build:dev": "npm run typecheck && cross-env VITE_ENV_TYPE=dev vite build",
	//构建打包(test环境)
	"build:test": "npm run typecheck && cross-env VITE_ENV_TYPE=test vite build",
	//构建打包(部署vercel)
	"build:vercel": "cross-env VITE_HASH_ROUTE=true vite build",
	//本地环境预览构建后的dist
	"preview": "vite preview",
	//vue文件的ts检查
	"typecheck": "vue-tsc --noEmit --skipLibCheck",
	//检测代码是否符合eslint规范并自动修复
	"lint": "eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --fix",
	//初始化husky
	"prepare": "husky install",
	//记录对某个node_modules依赖包的修改
	"postinstall": "patch-package"
}
```

## 目录说明

```typescript
soybean-admin
├── .husky                     //git commit提交钩子，提交前检查代码格式和提交commit内容的格式
├── .vscode                    //vscode插件和设置
│   ├── extensions.json        //vscode推荐的插件
│   └── settings.json          //vscode配置(在该项目中生效，可以复制到用户配置文件中)
├── build                      //vite构建相关配置和插件
│   ├── config                 //构建打包配置
│   │   ├── define.ts          //定义的全局常量，通过vite构建时注入
│   │   └── proxy.ts           //网络请求代理
│   ├── plugins                //构建插件
│   │   ├── compress.ts        //代码压缩插件
│   │   ├── html.ts            //html插件(注入变量，压缩代码等)
│   │   ├── mock.ts            //mock插件
│   │   ├── unocss.ts          //原子css框架unocss插件
│   │   ├── unplugin.ts        //自动导入UI组件、自动解析iconify图标、自动解析本地svg作为图标
│   │   ├── visualizer.ts      //构建的依赖大小占比分析插件
│   │   └── vue.ts             //vue相关vite插件
│   └── utils                  //构建相关工具函数
├── mock                       //mock
│   ├── api                    //mock的接口
│   └── model                  //mock的数据
├── public                     //公共目录(文件夹里面的资源打包后会在根目录下)
│   ├── resource               //资源文件夹
│   └── favicon.ico            //网站标签图标
├── src
│   ├── assets                 //静态资源
│   │   ├── imgs               //图片
│   │   ├── svg                //svg，自定义的svg图标目录
│   │   └── fonts              //字体
│   ├── components             //全局组件
│   │   ├── business           //业务相关组件
│   │   ├── common             //公共组件
│   │   └── custom             //自定义组件
│   ├── composables            //组合式函数(从外部引入状态+内部状态)
│   │   ├── echarts.ts         //echarts相关
│   │   ├── events.ts          //事件相关
│   │   ├── layout.ts          //布局相关
│   │   ├── router.ts          //路由相关
│   │   └── system.ts          //系统相关
│   ├── config                 //全局常量配置
│   │   ├── map-sdk.ts         //地图插件的sdk配置
│   │   ├── regexp.ts          //常用正则
│   │   └── service.ts         //请求相关配置
│   ├── context                //上下文状态
│   │   └── demo.ts            //上下文状态示例写法
│   ├── directives             //vue指令
│   │   ├── login.ts           //登录指令
│   │   ├── network.ts         //网络检测指令
│   │   └── permission.ts      //权限指令
│   ├── enum                   //TS枚举
│   │   ├── business.ts        //业务相关枚举
│   │   ├── common.ts          //通用枚举
│   │   └── system.ts          //系统相关枚举
│   ├── hooks                  //组合式的函数hooks(状态从函数里面产生)
│   │   ├── business           //业务相关hooks
│   │   │   ├── useCountDown   //倒计时
│   │   │   ├── useImageVerify //图片验证那
│   │   │   └── useSmsCode     //短信验证码
│   │   └── common             //通用hooks
│   │       ├── useBoolean     //boolean
│   │       ├── useContext     //上下文(provide、inject)
│   │       ├── useLoading     //加载
│   │       ├── useLoadingEmpty//加载和空状态
│   │       └── useReload      //重载
│   ├── layouts                //布局组件
│   │   ├── BasicLayout        //基本布局(包含全局头部、多页签、侧边栏、底部等公共部分)
│   │   ├── BlankLayout        //空白布局组件(单个页面)
│   │   └── common             //全局头部、多页签、侧边栏、底部等公共部分组件
│   │       ├── GlobalBackTop  //全局回到顶部
│   │       ├── GlobalContent  //全局主体内容
│   │       ├── GlobalFooter   //全局底部
│   │       ├── GlobalHeader   //全局头部
│   │       ├── GlobalLogo     //全局Logo
│   │       ├── GlobalSearch   //全局搜索
│   │       ├── GlobalSider    //全局侧边栏
│   │       ├── GlobalTab      //全局标签页
│   │       └── SettingDrawer  //项目配置抽屉
│   ├── plugins                //插件
│   │   └── assets.ts          //各种依赖的静态资源导入(css、scss等)
│   ├── router                 //vue路由
│   │   ├── guard              //路由守卫
│   │   ├── helpers            //路由相关的辅助函数
│   │   ├── modules            //静态(static)模式的路由数据
│   │   └── routes             //声明的固定路由
│   ├── service                //网络请求
│   │   ├── adapter            //接口适配器
│   │   ├── api                //接口api
│   │   └── request            //封装的请求函数
│   ├── settings               //项目初始配置
│   │   ├── color.ts           //传统颜色相关信息
│   │   └── theme.ts           //项目主题初始配置
│   ├── store                  //pinia状态管理
│   │   ├── modules            //状态管理划分的模块
│   │   │   ├── app            //app状态(页面重载、菜单折叠、项目配置的抽屉)
│   │   │   ├── auth           //auth状态(用户信息、用户权益)
│   │   │   ├── route          //route状态(动态路由、菜单、路由缓存)
│   │   │   ├── tab            //tab状态(多页签、缓存页面的滚动位置)
│   │   │   └── theme          //theme状态(项目主题配置)
│   │   └── subscribe          //订阅状态(状态变更后执行一些操作)
│   │       ├── app.ts         //订阅app的状态(配置弹窗打开时禁用body的滚动)
│   │       └── theme.ts       //订阅theme的状态(主题颜色变更、暗黑模式变更、页面横向滚动)
│   ├── styles                 //全局样式
│   │   ├── css                //css
│   │   └── scss               //scss
│   ├── typings                //TS类型声明文件(*.d.ts)
│   │   ├── api.d.ts           //请求接口返回的数据的类型声明
│   │   ├── business.d.ts      //业务相关的类型声明
│   │   ├── components.d.ts    //自动导入的组件的类型声明
│   │   ├── env.d.ts           //vue路由描述和请求环境相关的类型声明
│   │   ├── expose.d.ts        //defineExpose暴露出变量的类型
│   │   ├── global.d.ts        //全局通用类型
│   │   ├── package.d.ts       //第三方依赖包的类型声明
│   │   ├── route.d.ts         //路由系统的类型声明
│   │   ├── router.d.ts        //vue的路由描述的类型声明
│   │   ├── system.d.ts        //系统的类型声明
│   │   └── utils.d.ts         //类型工具合集
│   ├── utils                  //全局工具函数(纯函数，不含状态)
│   │   ├── auth               //用户鉴权工具函数
│   │   ├── common             //通用工具函数
│   │   ├── crypto             //数据加密工具函数
│   │   ├── form               //表单相关工具函数
│   │   ├── router             //路由相关工具函数
│   │   ├── service            //请求相关的工具函数
│   │   └── storage            //存储相关工具函数
│   ├── views                  //页面
│   │   ├── about              //关于
│   │   ├── auth-demo          //权限示例
│   │   ├── component          //插件、组件
│   │   ├── dashboard          //仪表盘
│   │   ├── document           //文档
│   │   ├── exception          //异常
│   │   ├── functiuon          //功能
│   │   ├── multi-menu         //多级菜单
│   │   ├── plugin             //插件
│   │   └── system-view        //系统内置页面：登录、异常页等
│   ├── App.vue                //vue文件入口
│   └── main.ts                //项目入口ts文件
├── .cz-config.js              //git cz提交配置
├── .editorconfig              //统一编辑器配置
├── .env                       //环境文件
├── .env-config.ts             //请求环境的配置文件
├── .eslintignore              //忽略eslint检查的配置文件
├── .eslintrc.js               //eslint配置文件
├── .gitattributes             //git配置，统一eol为LF
├── .gitignore                 //忽略git提交的配置文件
├── .prettierrc.js             //prettier代码格式插件配置
├── CHANGELOG.md               //项目变更日志
├── commitlint.config.js       //commitlint提交规范插件配置
├── components.d.ts            //自动引入的组件的类型声明
├── index.html
├── package.json               //npm依赖描述文件
├── pnpm-lock.yaml             //npm包管理器pnpm依赖锁定文件
├── README.md                  //项目介绍文档
├── tsconfig.json              //TS配置
├── uno.config.js              //原子css框架unocss配置
└── vite.config.ts             //vite配置
```
