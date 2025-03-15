# Sync code

1. Add the `soybean-admin` git address to your own repository

```bash
git remote add otherOrigin https://github.com/soybeanjs/soybean-admin.git
```

2. Pull the code

```bash
git fetch otherOrigin
```

3. Pick the git commit that needs to be updated through `cherry-pick`

```bash
git cherry-pick [commit id]
```

4. When there is a conflict in the code, resolve the conflict, then excute the following command, and then execute `vim` to save

```bash
git cherry-pick --continue
```

> `vim` save operation: `esc`, `:`, `wq`, `enter`
