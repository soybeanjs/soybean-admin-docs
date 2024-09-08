# 格式化检查

## 使用 ESLint 和 Prettier 进行代码格式化

SoybeanJS团队使用[`@soybeanjs/eslint-config`](@soybeanjs/eslint-config)来进行代码格式化。这个配置包含了ESLint和Prettier的配置，以及一些自定义的规则。

## 代码检查

### lint-staged

安装 `lint-staged`:

```bash
pnpm i lint-staged -D
```

在 `package.json` 中添加:

```json
{
  "lint-staged": {
    "*": "eslint --fix"
  },
}
```

### simple-git-hooks

安装 `simple-git-hooks`:

```bash
pnpm i simple-git-hooks -D
```

在 `package.json` 中添加git钩子:

```json
{
  "simple-git-hooks": {
    "commit-msg": "pnpm sa git-commit-verify",
    "pre-commit": "pnpm typecheck && pnpm lint-staged"
  }
}
```

在 `package.json` 中添加脚本:

```json
{
  "scripts": {
    "prepare": "simple-git-hooks"
  }
}
```

::: tip 提示
变更 `simple-git-hooks` 配置或取消 `simple-git-hooks` 时，先更改 `package.json` 中的`simple-git-hooks`对应的配置，然后运行 `pnpm run prepare`使其生效。
:::
