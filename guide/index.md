# 开始

本文会帮助你从头启动项目

## 环境准备

本地环境需要安装 [pnpm 6.x](https://pnpm.io/) 、[Node.js 14.x](http://nodejs.org/) 和 [Git](https://git-scm.com/)

## 工具配置

本项目推荐使用VSCode进行开发，项目里面以内置VSCode配置，包含推荐的插件和设置。

以下为推荐的插件：

- [Auto Close Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-close-tag) - 自动添加HTML/XML结束标签
- [Auto Complete Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-complete-tag) - 为HTML/XML添加关闭标签和自动重命名成对的标签
- [Auto Import](https://marketplace.visualstudio.com/items?itemName=steoates.autoimport) - 自动查找、解析和提供所有可用导入的代码操作和代码完成
- [Auto Rename Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag) - 自动重命名成对的HTML/XML标签
- [Bracket Pair Colorizer](https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer) - 一个可自定义的扩展，用于着色匹配括号
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
- [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.vscode-typescript-vue-plugin) - volar插件，Vue Plugin for TypeScript server
- [Vue Language Features (Volar)](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) - volar插件， Language support for Vue 3
- [WindiCSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=voorjaar.windicss-intellisense) - windicss 提示插件

## 代码获取

::: warning 注意

注意存放代码的目录及所有父级目录不能存在中文、韩文、日文以及空格，否则安装依赖后启动会出错。

:::

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

windows平台下安装：

1.[官网](http://nodejs.cn/download/)下载安装包(.msi结尾)

2.选择自定义安装目录，例如 D:\Program Files\Nodejs

3.安装完成后，在安装目录D:\Program Files\Nodejs下新建两个文件夹node_cache和node_global

4.打开cmd命令窗，依次执行两条命令

```bash
npm config set prefix "D:\Program Files\Nodejs\node_global"

npm config set cache "D:\Program Files\Nodejs\node_cache"
```

5.设置系统变量：

（1）新增环境变量 **NODE_PATH** ： **D:\Program Files\Nodejs\node_global\node_modules**

（2）在PATH变量添加：**D:\Program Files\Nodejs\node_global**

6.设置国内淘宝镜像：

```bash
 npm config set registry=http://registry.npm.taobao.org
```

mac平台下安装：

```bash
brew install node
#安装指定版本
brew install node14
```

安装后，根据提示将环境变量写入.zshrc，然后同上设置国内淘宝镜像

### 安装pnpm 

在 Linux 或 macOS 下：

```bash
curl -fsSL https://get.pnpm.io/install.sh | sh -
```

在 Windows 下（使用PowerShell）：

```bash
Invoke-WebRequest 'https://get.pnpm.io/v6.16.js' -UseBasicParsing -o pnpm.js; node pnpm.js add --global pnpm; Remove-Item pnpm.js
```

### 安装依赖

安装项目依赖

```bash
pnpm i
```

安装全局依赖

```bash
# 用于执行git cz命令，代替git commit
pnpm i -g commitizen
```

## npm script

```json
"scripts": {
    //本地运行
    "dev": "vite",
    //本地运行 prod模式
    "dev:prod": "vite --mode production",
    //本地运行 staging模式
    "dev:staging": "vite --mode staging",
  	//构建打包
    "build": "vue-tsc --noEmit --skipLibCheck && vite build",
  	 //构建打包 dev模式
    "build:dev": "vue-tsc --noEmit --skipLibCheck && vite build --mode development",
    //构建打包 staging模式
    "build:staging": "vue-tsc --noEmit --skipLibCheck && vite build --mode staging",
  	//本地预览构建打包后的代码
    "serve": "vite preview",
  	//检测代码是否符合eslint规范
    "lint": "eslint ./src --ext .vue,.js,jsx,.ts,tsx",
  	//检测代码是否符合eslint规范并自动修复
    "lint:fix": "eslint --fix ./src --ext .vue,.js,jsx,.ts,tsx",
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
├── build                      //vite构建相关配置和插件
│   ├── define                 //定义的全局常量，通过vite构建时注入
│   ├── env                    //.env环境文件内容加载插件
│   └── plugins                //构建插件
│       ├── html.ts            //html插件(注入变量，压缩代码等)
│       ├── iconify.ts         //iconify图标插件
│       ├── visualizer.ts      //构建的依赖大小占比分析插件
│       ├── vue.ts             //vue相关vite插件
│       └── windicss.ts        //css框架插件
├── public                     //公共目录(文件夹里面的资源打包后会在根目录下)
│   ├── resource               //资源文件夹
│   └── favicon.ico            //网站标签图标
├── src
│   ├── assets                 //静态资源
│   ├── components             //全局组件
│   │   ├── business           //业务相关组件
│   │   ├── common             //公共组件
│   │   └── custom             //自定义组件
│   ├── composables            //组合式函数(从外部引入状态+内部状态)
│   │   ├── business           //业务相关composables
│   │   └── common             //通用composables
│   ├── config                 //全局常量配置
│   │   ├── business           //业务相关常量
│   │   └── common             //通用常量
│   ├── context                //上下文(通过provide和inject实现，用于组件之间的状态共享)
│   │   ├── app                //从app.vue注入的上下文
│   │   └── part               //局部组件注入的上下文
│   ├── directives             //vue指令
│   ├── enum                   //TS枚举
│   │   ├── business           //业务相关枚举
│   │   └── common             //通用枚举
│   ├── hooks                  //组合式的函数hooks(状态从函数里面产生)
│   │   ├── business           //业务相关hooks
│   │   └── common             //通用hooks
│   ├── interface              //TS类型接口
│   │   ├── business           //业务相关类型接口
│   │   └── common             //通用类型接口
│   ├── layouts                //布局组件
│   │   ├── BasicLayout        //基本布局(包含全局头部、多页签、侧边栏、底部等公共部分)
│   │   ├── BlankLayout        //空白布局组件(单个页面)
│   │   └── RouterViewLayout   //路由组件(作为多级路由之间的桥接)
│   ├── plugins                //插件
│   │   └── assets.ts          //各种依赖的静态资源导入(css、scss等)
│   ├── router                 //vue路由
│   │   ├── constant           //路由的名称、路径、标题声明
│   │   ├── modules            //按模块划分的路由页面
│   │   ├── guard              //路由守卫
│   │   ├── routes         		 //声明的路由
│   │   └── setup              //路由挂载函数
│   ├── service                //网络请求
│   │   ├── api                //接口api
│   │   ├── middleware         //请求结果的处理中间件
│   │   └── request            //封装的请求函数
│   ├── settings               //项目初始配置
│   │   └── theme.ts           //项目主题初始配置
│   ├── store                  //pinia状态管理
│   │   └── modules            //状态管理划分的模块
│   ├── styles                 //全局样式
│   │   ├── css                //css
│   │   └── scss               //scss
│   ├── typings                //TS类型声明文件(*.d.ts)
│   ├── utils                  //全局工具函数
│   │   ├── auth               //用户鉴权
│   │   ├── common             //通用工具函数
│   │   ├── package            //npm依赖
│   │   ├── router             //路由
│   │   ├── service            //请求相关的工具函数
│   │   └── storage            //存储
│   ├── views                  //页面
│   │   ├── about              //关于
│   │   ├── component          //插件、组件
│   │   ├── dashboard          //仪表盘
│   │   ├── document           //文档
│   │   ├── feat               //功能示例
│   │   ├── multi-menu         //多级菜单
│   │   └── system             //系统内置页面：登录、异常页等
│   ├── App.vue                //vue文件入口
│   ├── AppProvider.vue        //配置naive UI的vue文件(国际化,loadingBar、message等组件)
│   └── main.ts                //项目入口ts文件
├── .cz-config.js              //git cz提交配置
├── .editorconfig              //统一编辑器配置
├── .env                       //环境文件
├── .env.development           //环境文件(开发模式)
├── .env.production            //环境文件(生产模式)
├── .env.staging               //环境文件(自定义staging模式)
├── .eslintignore              //忽略eslint检查的配置文件
├── .eslintrc.js               //eslint配置文件
├── .gitignore                 //忽略git提交的配置文件
├── .prettierrc.js             //prettier代码格式插件配置
├── CHANGELOG.md               //项目变更日志
├── commitlint.config.js       //commitlint提交规范插件配置
├── index.html
├── package.json               //npm依赖描述文件
├── pnpm-lock.yaml             //npm包管理器pnpm依赖锁定文件
├── README.md                  //项目介绍文档
├── tsconfig.json              //TS配置
├── vite.config.ts             //vite配置
└── windi.config.ts            //windicss框架配置
```
