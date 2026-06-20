# 综合

除了格式化、命名、Vue 与 TypeScript 等单项规范外，项目的工程化质量还体现在目录组织、导入习惯、注释、环境变量与协作流程这些贯穿全局的约定上。本页汇总这类「综合规范」，作为对其它规范页的补充。以下内容多为业界通行的最佳实践与推荐约定，团队可结合实际情况裁剪。

## 目录与文件组织

按「功能 / 模块」而非「文件类型」组织代码，让一个功能相关的文件尽量内聚在一起，降低跨目录跳转的成本。

- 单一职责：一个文件、一个组件、一个函数只做一件事，文件过大时及时拆分。
- 就近原则：仅在某个模块内部使用的组件、类型、工具函数，放在该模块目录下；被多处复用时再上移到公共目录。
- 命名一致：目录与文件名遵循[命名规范](./naming)，统一使用小写加连字符 `-`。

```text
views
└── user
    ├── index.vue          # 页面入口
    ├── modules            # 仅本页使用的局部组件
    │   └── user-search.vue
    └── components         # 可在本模块复用的组件
```

> 这是一种推荐的组织思路，具体目录结构请以项目实际为准。

## 导入顺序与路径别名

项目约定使用 `@/` 作为 `src` 目录的路径别名，避免出现 `../../../` 这类难以维护的相对路径。

```ts
// 推荐：使用别名
import { useAppStore } from '@/store/modules/app';

// 不推荐：深层相对路径
import { useAppStore } from '../../../store/modules/app';
```

导入语句建议按「第三方依赖 → 项目内部（别名）→ 相对路径」分组，组与组之间用空行分隔；仅导入类型时使用 `import type`。Vue 单文件组件内部更细致的导入顺序详见 [Vue 写法规范](./vue)。

```ts
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

import { useAppStore } from '@/store/modules/app';
import type { MenuItem } from '@/typings/menu';

import { formatTitle } from './shared';
```

## 注释规范

好的代码以「自解释」为先，注释用来补充代码无法表达的信息，而非复述代码本身。

- 解释「为什么」而非「做什么」：记录设计取舍、边界条件、踩坑由来等背景信息。
- 公共函数、复杂逻辑与对外暴露的 API 建议使用 JSDoc 标注参数与返回值，便于编辑器提示。
- 避免无意义注释，及时删除被注释掉的「死代码」（版本历史交给 Git 管理）。
- 临时方案统一用 `// TODO:` / `// FIXME:` 标记，方便检索与后续跟进。

```ts
/**
 * 将菜单数组转换为路由树
 *
 * @param menus 后端返回的扁平菜单列表
 * @returns 嵌套的路由配置
 */
function transformMenuToRoutes(menus: MenuItem[]) {
  // 后端不保证顺序，这里需按 order 字段排序后再构建树
  // ...
}
```

## 环境变量管理

项目基于 Vite，约定通过 `.env` 系列文件管理环境变量，不同环境使用不同文件：

- `.env`：所有环境共享的基础变量。
- `.env.development` / `.env.production`：分别对应开发与生产环境。
- 仅 `VITE_` 前缀的变量会被注入到客户端代码中（通过 `import.meta.env.VITE_xxx` 访问）；未加前缀的变量仅在构建期可见，**切勿**用前缀变量存放密钥等敏感信息。

```bash
# .env
VITE_APP_TITLE=SoybeanAdmin

# .env.development
VITE_SERVICE_BASE_URL=http://localhost:8080
```

> 上述变量名仅为示例。真实的环境变量请以项目根目录下的 `.env` 文件为准，包含敏感信息的本地文件应通过 `.gitignore` 排除，不要提交到仓库。

## Git 提交信息规范

提交信息统一遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范，格式为 `type(scope): subject`，便于自动生成 changelog 并保持提交历史清晰。常用 `type` 包括 `feat`、`fix`、`docs`、`refactor`、`perf`、`chore` 等。

```text
feat(router): 支持动态路由权限校验
fix(request): 修复 token 过期未刷新的问题
```

推荐使用 `@soybeanjs/cli` 提供的交互式命令生成规范提交信息，并由 Git 钩子在提交时自动校验。相关工具与命令详见[工具规范](./tools)。

## 代码评审（PR）约定

代码合入主分支前应经过 Pull Request 评审，这是保证质量、沉淀团队共识的关键环节。推荐遵循以下基本约定：

- **小而聚焦**：一个 PR 只解决一个问题，控制改动规模，便于评审与回溯。
- **描述清晰**：在 PR 描述中说明改动背景、方案与影响范围，必要时附上截图或复现步骤。
- **自检先行**：提交前确保本地 `pnpm typecheck` 与 `pnpm lint` 通过，CI 全绿后再请求评审。
- **对事不对人**：评审意见聚焦代码本身；作者对每条意见给出回应或修改，达成一致后再合并。
