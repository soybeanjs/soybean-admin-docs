# 格式化检查

## 使用 vite-plus 进行代码格式化

SoybeanJS 团队使用 [`vite-plus`](https://viteplus.dev/) 统一代码的格式化与检查，规则来自 [`@soybeanjs/oxc-config`](https://github.com/soybeanjs/oxc-config)。

格式化与检查的配置写在 `vite.config.ts` 中：

```ts
import { defineConfig } from 'vite-plus';
import { fmt, lint } from '@soybeanjs/oxc-config';

export default defineConfig({
  lint,
  fmt: {
    ...fmt,
    ignorePatterns: ['CHANGELOG.md']
  }
});
```

对应两条命令：

```bash
# 格式化
pnpm fmt

# 检查并自动修复
pnpm lint
```

## 代码检查

### vp staged

`vite-plus` 用 `vp staged` 取代了 `lint-staged`。要检查的暂存文件规则写在 `vite.config.ts` 的 `staged` 字段：

```ts
import { defineConfig } from 'vite-plus';

export default defineConfig({
  staged: {
    '*': 'vp check --fix'
  }
});
```

### vp config（Git 钩子）

`vite-plus` 用 `vp config` 取代了 `simple-git-hooks`。钩子脚本放在 `.vite-hooks/` 目录，`pre-commit` 内容只有一行：

```shell
vp staged
```

在 `package.json` 中添加脚本，让安装依赖时自动安装钩子：

```json
{
  "scripts": {
    "prepare": "vp config --no-agent"
  }
}
```

::: tip 提示
变更 `vite.config.ts` 中的 `staged` 配置或改动 `.vite-hooks/` 下的脚本后，重新执行 `pnpm run prepare` 即可让钩子生效。当前仓库的 `core.hooksPath` 指向 `.vite-hooks/_`。
:::
