# 工具规范

SoybeanAdmin 通过一套统一的工具链来保证代码质量、规范 Git 工作流并提升开发效率。本页对项目中实际使用的工具做整体概览，包括代码质量工具、Git 工作流工具、包管理以及 `@soybeanjs/cli` 命令行，帮助你快速了解各工具的职责与协作方式。

## 工具链概览

| 类别       | 工具                                                                                                             | 作用                         |
| ---------- | ---------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| 代码质量   | [`vite-plus`](https://viteplus.dev/)（`vp`）+ [`@soybeanjs/oxc-config`](https://github.com/soybeanjs/oxc-config) | 代码检查与格式化             |
| Vue 规则   | [`@soybeanjs/eslint-config-vue`](https://github.com/soybeanjs/eslint-config-vue)（ESLint）                       | Vue 单文件组件的规则校验     |
| Git 工作流 | `vp staged`、`vp config`                                                                                         | 提交前检查与 Git 钩子安装    |
| 命令行     | [`@soybeanjs/cli`](https://github.com/soybeanjs/cli)（`soy` / `sa`）                                             | 提交、清理、发布、更新依赖等 |
| 包管理     | `pnpm`                                                                                                           | 安装、运行脚本与版本管理     |

## 代码质量：vite-plus + oxc-config

项目用 [`vite-plus`](https://viteplus.dev/) 统一承接格式化与检查能力，替代了原先分散的 Prettier、ESLint、`lint-staged`、`simple-git-hooks` 等工具。相关配置集中在根目录的 `vite.config.ts`：

```ts
import { defineConfig } from 'vite-plus';
import { fmt, lint } from '@soybeanjs/oxc-config';

export default defineConfig({
  staged: {
    '*': 'vp check --fix'
  },
  lint,
  fmt: {
    ...fmt,
    ignorePatterns: ['CHANGELOG.md']
  },
  resolve: {
    tsconfigPaths: true
  }
});
```

- `lint` 与 `fmt` 来自 [`@soybeanjs/oxc-config`](https://github.com/soybeanjs/oxc-config)，统一了规则与格式化风格（120 列、单引号、导入排序等）。
- `staged` 定义了暂存文件的检查方式，等价于原先的 `lint-staged` 配置。
- `resolve.tsconfigPaths: true` 让构建直接读取 `tsconfig.json` 的 `paths` 别名，无需在配置中重复声明。

执行格式化与检查：

```bash
# 格式化
pnpm fmt

# 检查并自动修复（vp lint + Vue 规则 eslint）
pnpm lint
```

> Vue 文件的专项规则由 `eslint.config.mjs` 提供，见 [规范总览](./synthesis)。

## Git 工作流工具

项目不再依赖 `simple-git-hooks` 与 `lint-staged`，改由 `vite-plus` 统一管理 Git 钩子：

- `.vite-hooks/pre-commit` 中只写了一行 `vp staged`。提交前由 `vp staged` 按 `vite.config.ts` 的 `staged` 配置检查暂存文件。
- `package.json` 的 `prepare` 脚本执行 `vp config --no-agent`，在安装依赖时自动把 Git 钩子目录指向 `.vite-hooks/_`。
- 提交信息规范仍由 `@soybeanjs/cli` 保障：`soy git-commit` 负责交互式生成，`soy git-commit-verify` 用于校验。

推荐使用交互式提交命令来生成规范的提交信息，避免手写出错：

```bash
# 交互式生成符合 Conventional Commits 规范的提交信息
pnpm commit

# 生成中文提交信息
pnpm commit:zh
```

> 如需了解 Git 钩子的设计初衷与移除方式，请参阅 [Git Hooks](../guide/cli/git-hooks)。

## 包管理：pnpm

项目使用 [`pnpm`](https://pnpm.io/) 作为包管理器，并在 `package.json` 的 `engines` 中约束了运行环境：

```json
{
  "engines": {
    "node": ">=22.18.0",
    "pnpm": ">=10.0.0"
  }
}
```

常用命令：

```bash
# 安装依赖
pnpm install

# 启动文档开发服务
pnpm dev

# 构建文档
pnpm build
```

## 命令行工具：@soybeanjs/cli

[`@soybeanjs/cli`](https://github.com/soybeanjs/cli) 提供了 `soy`（亦可用 `sa`）命令，封装了一系列常用的工程化能力。这些命令已在 `package.json` 的 `scripts` 中按需绑定：

| 命令                | 说明                                               | 对应脚本       |
| ------------------- | -------------------------------------------------- | -------------- |
| `git-commit`        | 交互式生成符合 Conventional Commits 规范的提交信息 | `pnpm commit`  |
| `git-commit-verify` | 校验提交信息是否符合规范（用于 `commit-msg` 钩子） | —              |
| `cleanup`           | 删除 `node_modules`、`dist` 等目录                 | `pnpm cleanup` |
| `ncu`               | 更新 `package.json` 中的依赖版本                   | `pnpm upkg`    |
| `release`           | 更新版本、生成 changelog 并提交代码                | `pnpm release` |
| `changelog`         | 生成 changelog                                     | —              |

> 命令的完整列表与说明请参阅 [命令行](../guide/cli/intro) 与 [命令](../guide/cli/command)。

## 推荐的编辑器与插件

推荐使用 [Visual Studio Code](https://code.visualstudio.com/) 进行开发，并安装以下插件以获得完整的开发体验：

- **Vue - Official（Volar）**：提供 Vue 单文件组件的语法高亮、类型推断与智能提示。
- **Oxc**：提供格式化与检查能力，是项目的默认格式化器，对应 `settings.json` 里的 `"editor.defaultFormatter": "oxc.oxc-vscode"`。
- **ESLint**：校验 Vue 文件的专项规则，与项目的 `@soybeanjs/eslint-config-vue` 配合使用。

为配合保存时修复，建议在 VS Code 的 `settings.json` 中开启：

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.fixAll.oxc": "explicit"
  }
}
```
