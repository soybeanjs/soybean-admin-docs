# Formatting Check

## Code Formatting with ESLint and Prettier

The SoybeanJS team uses @soybeanjs/eslint-config for code formatting. This configuration includes ESLint and Prettier settings, as well as some custom rules.

## Code Check

### lint-staged

Install `lint-staged`:

```bash
pnpm i lint-staged -D
```

Add to [`package.json`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fsoybean%2FWeb%2FProjects%2FSoybeanJS%2Fsoybean-admin-docs%2Fpackage.json%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22b28280bf-b8f5-4383-b503-4edb7f54a6d5%22%5D "/Users/soybean/Web/Projects/SoybeanJS/soybean-admin-docs/package.json"):

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

Add git hooks to [`package.json`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fsoybean%2FWeb%2FProjects%2FSoybeanJS%2Fsoybean-admin-docs%2Fpackage.json%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22b28280bf-b8f5-4383-b503-4edb7f54a6d5%22%5D "/Users/soybean/Web/Projects/SoybeanJS/soybean-admin-docs/package.json"):

```json
{
  "simple-git-hooks": {
    "commit-msg": "pnpm sa git-commit-verify",
    "pre-commit": "pnpm typecheck && pnpm lint-staged"
  }
}
```

Add scripts to [`package.json`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fsoybean%2FWeb%2FProjects%2FSoybeanJS%2Fsoybean-admin-docs%2Fpackage.json%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22b28280bf-b8f5-4383-b503-4edb7f54a6d5%22%5D "/Users/soybean/Web/Projects/SoybeanJS/soybean-admin-docs/package.json"):

```json
{
  "scripts": {
    "prepare": "simple-git-hooks"
  }
}
```

::: tip
When changing the `simple-git-hooks` configuration or removing `simple-git-hooks`, first update the corresponding configuration in [`package.json`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fsoybean%2FWeb%2FProjects%2FSoybeanJS%2Fsoybean-admin-docs%2Fpackage.json%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22b28280bf-b8f5-4383-b503-4edb7f54a6d5%22%5D "/Users/soybean/Web/Projects/SoybeanJS/soybean-admin-docs/package.json"), then run `pnpm run prepare` to apply the changes.
:::
