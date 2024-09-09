# Formatting Check

## Code Formatting with ESLint and Prettier

The SoybeanJS team uses [`@soybeanjs/eslint-config`](https://github.com/soybeanjs/eslint-config) for code formatting. This configuration includes ESLint and Prettier settings, as well as some custom rules.

## Code Check

### lint-staged

Install `lint-staged`:

```bash
pnpm i lint-staged -D
```

Add to `package.json`:

```json
{
  "lint-staged": {
    "*": "eslint --fix"
  }
}
```

### simple-git-hooks

Install `simple-git-hooks`:

```bash
pnpm i simple-git-hooks -D
```

Add git hooks to `package.json`:

```json
{
  "simple-git-hooks": {
    "commit-msg": "pnpm sa git-commit-verify",
    "pre-commit": "pnpm typecheck && pnpm lint-staged"
  }
}
```

Add scripts to `package.json`:

```json
{
  "scripts": {
    "prepare": "simple-git-hooks"
  }
}
```

::: tip
When changing the `simple-git-hooks` configuration or removing `simple-git-hooks`, first update the corresponding configuration in `package.json`, then run `pnpm run prepare` to apply the changes.
:::
