# Formatting Check

## Code Formatting with vite-plus

The SoybeanJS team uses [`vite-plus`](https://viteplus.dev/) to unify code formatting and linting, with rules provided by [`@soybeanjs/oxc-config`](https://github.com/soybeanjs/oxc-config).

The formatting and linting configuration lives in `vite.config.ts`:

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

Two commands map to it:

```bash
# Format
pnpm fmt

# Lint and auto-fix
pnpm lint
```

## Code Check

### vp staged

`vite-plus` replaces `lint-staged` with `vp staged`. The rule for which staged files to check lives in the `staged` field of `vite.config.ts`:

```ts
import { defineConfig } from 'vite-plus';

export default defineConfig({
  staged: {
    '*': 'vp check --fix'
  }
});
```

### vp config (Git hooks)

`vite-plus` replaces `simple-git-hooks` with `vp config`. Hook scripts live in the `.vite-hooks/` directory; `pre-commit` contains a single line:

```shell
vp staged
```

Add a script to `package.json` so hooks are installed during dependency installation:

```json
{
  "scripts": {
    "prepare": "vp config --no-agent"
  }
}
```

::: tip
After changing the `staged` configuration in `vite.config.ts` or editing scripts under `.vite-hooks/`, run `pnpm run prepare` again to apply the changes. In this repository `core.hooksPath` points to `.vite-hooks/_`.
:::
