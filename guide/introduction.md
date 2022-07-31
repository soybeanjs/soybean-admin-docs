# 介绍

## 简介

[Soybean Admin](https://github.com/honghuangdc/soybean-admin) 是一个基于 Vue3、Vite3、TypeScript、NaiveUI、Pinia和UnoCSS 的清新优雅的中后台模版，它使用了最新的前端技术栈，内置丰富的主题配置，有着极高的代码规范，基于mock实现的动态权限路由，开箱即用的中后台前端解决方案，也可用于学习参考。

## 特性

- **最新技术栈**：使用 Vue3/vite2 等前端前沿技术开发, 使用高效率的npm包管理器pnpm
- **TypeScript**: 应用程序级 JavaScript 的语言
- **主题**：丰富可配置的主题、暗黑模式，基于原子css框架 - UnoCss的动态主题颜色
- **代码规范**：丰富的规范插件及极高的代码规范
- **权限路由**：简易的路由配置、基于mock的动态路由能快速实现后端动态路由
- **请求函数**：基于axios的完善的请求函数封装，提供Promise和hooks两种请求函数，加入请求结果数据转换的适配器

## 特性细节

- **技术栈**： Vue3 + Vite3 + TypeScript + NaiveUI + Pinia + UnoCss + Axios + ECharts + AntV G2 + @vueuse + iconify

- **严格的代码规范**：

  1. eslint + prettier + eslint-config-airbnb-base + eslint-plugin-vue + eslint-plugin-import + @typescript-eslint/eslint-plugin等插件提供代码全面的格式规范，eslintrc的 import/order 规则规范了导入依赖的顺序
  2. husky + lint-staged + vuetsc + commitlint + commitizen 保证了提交的代码符合eslint规则和TS类型检测，提交的内容规范遵循了angular提交规范
  3. 应用设计模式优化代码：项目里面多次用到策略模式替换if else
  4. 所有页面使用script-setup写法，并遵循特定顺序(用文档规范)
  5. 目录结构组织遵循特定规范，页面的写法严格遵循模块思想，使得每个页面的代码结构清晰明了

- **权限路由**：

  1. 动态的路由数据由mock生成，前端添加动态路由
  2. 指定了mock路由的类型，方便快速对接后端
  3. 菜单由动态路由数据生成，支持隐藏指定菜单，支持多级菜单，支持外链打开
  4. 在多页签中的缓存的页面会记录滚动位置
  5. 面包屑数据由当前路由和菜单数据生成

- **主题**：

  1. 支持各种主题颜色、暗黑模式和各种布局
  2. UnoCss引入各种主题颜色，直接通过class即可应用对应的颜色
  3. 初始化加载适应主题颜色
  4. 支持项目logo自适应主题颜色

- **请求函数**：基于axios封装

  1. 请求实例：可创建多个不同的baseUrl的请求实例

  2. 统一请求结果：将错误信息统一处理成特定格式，和请求成功的数据再按特定格式一起返回

     ```typescript
    	/** 自定义的请求成功结果 */
  		interface SuccessResult<T = any> {
    	  /** 请求错误 */
    	  error: null;
    	  /** 请求数据 */
    	  data: T;
  		}
			/** 请求错误 */
  		interface RequestError {
  		  /** 请求服务的错误类型 */
  		  type: RequestErrorType;
  		  /** 错误码 */
  		  code: string | number;
  		  /** 错误信息 */
  		  msg: string;
  		}
  		/** 自定义的请求失败结果 */
  		interface FailedResult {
    	  /** 请求错误 */
    	  error: RequestError;
    	  /** 请求数据 */
    	  data: null;
  		}
  		/** 自定义的请求结果 */
  		type RequestResult<T = any> = SuccessResult<T> | FailedResult;
     ```

  3. 错误提示：智能提示错误，避免同一种错误在同一时间段显示，通过指定错误码不展示响应错误

  4. token刷新：无感刷新token

  5. 请求参数转换：根据不同的Content-Type转换数据，利用qs序列化数据，支持单文件和多文件上传

  6. 封装的请求函数支持Promise和hooks两种, hooks的请求函数包含loading状态

- **自定义组件**

  1. 布局组件[soybean-admin-layout](https://github.com/honghuangdc/soybean-admin-layout)：
     - 分为header、tab、sider、content、footer五个部分，除了content，其余都可以控制显示隐藏，且可以自定义过度动画
     - 支持vertical和horizontal两种模式，结合局部的现实隐藏，为该项目提供了4种布局模式
     - 高性能组件，相比用UI组件构建的布局，该组件不用考虑很多因素，专注于当前的几种布局模式
  2. 多页签组件[soybean-admin-tab](https://github.com/honghuangdc/soybean-admin-tab)：ChromeTab和ButtonTab
     - 支持主题颜色及暗黑模式
     - ChromeTab类似于浏览器的标签，样式清新
     - 结合BetterScroll，实现多页签组件的左右鼠标滑动(移动端左右触摸滑动)，激活状态的Tab自动居中
  3. LoadingEmptyWrapper
     - 支持现实加载状态、空状态和网络状态的组件
     - 支持主题颜色及暗黑模式
     - 图片文字大小通过属性配置

## 文档

- 文档地址为 [soybean-admin-docs](https://github.com/honghuangdc/soybean-admin-docs)，采用 Vitepress 开发。如发现文档有误，欢迎提 pr 帮助我们改进。

## 需要掌握的基础知识

本项目基于Vue3+Vite3+TS开发，并全部采用了Vue3的**script-setup**写法，建议在开发前先学一下以下内容，提前了解和学习这些知识，会对项目理解非常有帮助:

- [Vue3 文档](https://vuejs.org/)
- [Vue-RFCS](https://github.com/vuejs/rfcs)
- [Vitejs](https://vitejs.dev/)
- [TypeScript](https://jkchao.github.io/typescript-book-chinese/#why)
- [Vue-router](https://router.vuejs.org/)
- [NaiveUI](https://www.naiveui.com/zh-CN/os-theme)
- [Pinia](https://pinia.vuejs.org/)
- [UnoCss](https://uno.antfu.me/)
- [VueUse](https://vueuse.org/)
- [ES6](https://es6.ruanyifeng.com/)

## 浏览器支持

本地开发推荐使用`Chrome 90+` 浏览器

支持现代浏览器, 不支持 IE

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png" alt="IE" width="24px" height="24px"  />](http://godban.github.io/browsers-support-badges/)IE | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)Safari |
| :-: | :-: | :-: | :-: | :-: |
| not support | last 2 versions | last 2 versions | last 2 versions | last 2 versions |

## 如何加入我们

- [Soybean Admin](https://github.com/honghuangdc/soybean-admin) 还在持续更新中，本项目欢迎您的参与，共同维护，逐步完善，将项目做得更强。项目采用MIT开源协议，本着一切免费的原则，原则上不会收取任何费用及版权，可以放心使用。
- 如果你想加入我们，可以多提供一些好的建议或者提交 pr，我们会根据你的活跃度邀请你加入。
