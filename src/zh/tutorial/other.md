# 其他

除了 Git、Node.js 和调试工具之外，搭建一个顺手的前端开发环境还需要一个合适的包管理器、稳定的镜像源以及趁手的编辑器配置。本节整理了一些通用且常用的小技巧，帮助你少踩坑、提高效率。

## 安装与使用 pnpm

SoybeanAdmin 使用 [pnpm](https://pnpm.io/zh/) 作为包管理器，它安装速度快、节省磁盘空间，并且能严格管理依赖。

推荐使用 Node.js 自带的 [Corepack](https://nodejs.org/api/corepack.html) 来启用 pnpm（Node.js 16.13 及以上版本内置）：

```bash
# 启用 corepack
corepack enable

# 准备并激活指定版本的 pnpm（可选，指定版本更可控）
corepack prepare pnpm@latest --activate
```

如果你不想使用 corepack，也可以直接用 npm 全局安装：

```bash
npm i -g pnpm
```

安装完成后，验证版本：

```bash
pnpm -v
```

> 项目的 `package.json` 中通过 `engines` 字段约束了运行环境（Node.js `>=20.19.0`、pnpm `>=8.7.0`），请确保本地版本满足要求，否则安装依赖时可能会报错。

常用命令一览：

```bash
pnpm install   # 安装依赖
pnpm dev       # 启动本地开发服务
pnpm build     # 构建生产包
```

## 配置镜像源

国内网络环境下，直接从官方源安装依赖可能会比较慢。可以将镜像源切换到 [npmmirror](https://npmmirror.com/)（淘宝镜像）来加速。

查看与设置 npm 镜像源：

```bash
# 查看当前镜像源
npm config get registry

# 设置为 npmmirror 镜像
npm config set registry https://registry.npmmirror.com

# 恢复为官方源
npm config set registry https://registry.npmjs.org
```

pnpm 的设置方式与 npm 类似：

```bash
pnpm config set registry https://registry.npmmirror.com
```

如果你经常需要在多个镜像源之间切换，可以使用 [nrm](https://github.com/Pana/nrm) 来管理：

```bash
# 全局安装 nrm
npm i -g nrm

# 列出所有可用的镜像源
nrm ls

# 切换到 taobao 镜像
nrm use taobao
```

## 推荐的 VS Code 插件

下面这些插件能显著提升使用 SoybeanAdmin 进行开发的体验：

- **Vue - Official**（Volar）：Vue 3 官方插件，提供语法高亮、类型检查和模板智能提示。
- **ESLint**：在编辑器中实时显示代码规范问题，并支持保存时自动修复。
- **UnoCSS**：为原子化 CSS 提供智能提示与高亮（项目使用 UnoCSS）。
- **TypeScript Vue Plugin**：增强 `.vue` 文件中的 TypeScript 支持。
- **Iconify IntelliSense**：在代码中预览图标。

> 提示：项目通常会在 `.vscode/extensions.json` 中预置推荐插件列表，打开项目后 VS Code 会自动提示安装。

一个常用的设置是开启「保存时自动格式化与修复」，在 VS Code 的 `settings.json` 中加入：

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  }
}
```

## 常见问题排查

在依赖安装或启动项目遇到异常时，可以按下面的思路逐步排查：

- **Node 版本不匹配**：先用 `node -v` 确认版本是否满足项目要求，必要时通过 fnm / nvm 切换（参见 Node.js 章节）。
- **依赖安装失败或行为异常**：尝试删除 `node_modules` 与 lockfile 后重新安装。

  ```bash
  rm -rf node_modules pnpm-lock.yaml
  pnpm install
  ```

  > 注意：删除 `pnpm-lock.yaml` 会重新计算依赖版本，团队协作时一般应保留 lockfile，仅在确有需要时删除。

- **缓存导致的怪异问题**：清理 pnpm 的缓存与存储。

  ```bash
  pnpm store prune
  ```

- **包管理器混用**：同一项目应统一使用 pnpm，避免与 npm / yarn 混用产生多份 lockfile。
