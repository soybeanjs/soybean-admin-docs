# 工具规范

SoybeanAdmin 通过一套统一的工具链来保证代码质量、规范 Git 工作流并提升开发效率。本页对项目中实际使用的工具做整体概览，包括代码质量工具、Git 工作流工具、包管理以及 `@soybeanjs/cli` 命令行，帮助你快速了解各工具的职责与协作方式。

## 工具链概览

| 类别 | 工具 | 作用 |
| --- | --- | --- |
| 代码质量 | [`@soybeanjs/eslint-config`](https://github.com/soybeanjs/eslint-config)（ESLint + Prettier） | 代码检查与格式化 |
| Git 工作流 | `simple-git-hooks`、`lint-staged` | 提交前校验与暂存文件检查 |
| 命令行 | [`@soybeanjs/cli`](https://github.com/soybeanjs/cli)（`soy` / `sa`） | 提交、清理、发布、更新依赖等 |
| 包管理 | `pnpm` | 安装、运行脚本与版本管理 |

## 代码质量：ESLint + Prettier

项目使用 [`@soybeanjs/eslint-config`](https://github.com/soybeanjs/eslint-config) 统一处理代码检查与格式化，它在内部整合了 ESLint 与 Prettier，并附带一系列自定义规则。

`eslint.config.js` 使用 Flat Config 形式，按需开启 `vue` 与 `markdown` 等能力：

```js
import { defineConfig } from '@soybeanjs/eslint-config';

export default defineConfig({
  vue: true,
  formatter: {
    markdown: true
  }
});
```

执行检查与自动修复：

```bash
pnpm lint
```

> 该脚本对应 `eslint . --fix`。更多关于 ESLint、Prettier 与 `lint-staged`、`simple-git-hooks` 的配置细节，请参阅 [格式化检查](./lint)。

## Git 工作流工具

为保证每次提交的质量与提交信息的规范，项目通过 `simple-git-hooks` 配置 Git 钩子，并配合 `lint-staged` 仅检查本次暂存的文件：

```json
{
  "simple-git-hooks": {
    "commit-msg": "pnpm sa git-commit-verify",
    "pre-commit": "pnpm typecheck && pnpm lint-staged"
  },
  "lint-staged": {
    "*": "eslint --fix"
  }
}
```

- `pre-commit`：提交前先做类型检查（`typecheck`），再对暂存文件执行 ESLint 自动修复。
- `commit-msg`：通过 `sa git-commit-verify` 校验提交信息是否符合 [Conventional Commits](https://www.conventionalcommits.org/) 规范。

推荐使用 `@soybeanjs/cli` 提供的交互式提交命令来生成规范的提交信息，避免手写出错：

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
    "node": ">=20.19.0",
    "pnpm": ">=8.7.0"
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

| 命令 | 说明 | 对应脚本 |
| --- | --- | --- |
| `git-commit` | 交互式生成符合 Conventional Commits 规范的提交信息 | `pnpm commit` |
| `git-commit-verify` | 校验提交信息是否符合规范（用于 `commit-msg` 钩子） | — |
| `cleanup` | 删除 `node_modules`、`dist` 等目录 | `pnpm cleanup` |
| `ncu` | 更新 `package.json` 中的依赖版本 | `pnpm update-pkg` |
| `release` | 更新版本、生成 changelog 并提交代码 | `pnpm release` |
| `changelog` | 生成 changelog | — |

> 命令的完整列表与说明请参阅 [命令行](../guide/cli/intro) 与 [命令](../guide/cli/command)。

## 推荐的编辑器与插件

推荐使用 [Visual Studio Code](https://code.visualstudio.com/) 进行开发，并安装以下插件以获得完整的开发体验：

- **Vue - Official（Volar）**：提供 Vue 单文件组件的语法高亮、类型推断与智能提示。
- **ESLint**：实时显示并在保存时自动修复代码风格问题，与项目的 `@soybeanjs/eslint-config` 配合使用。

为配合 ESLint 自动修复，建议在 VS Code 的 `settings.json` 中开启保存时修复：

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  }
}
```
