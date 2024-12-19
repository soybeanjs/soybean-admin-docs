# Git

## Initialize git

- Set user information

```bash
git config --global user.name "Soybean"
git config --global user.email "soybeanjs@outlook.com"
```

- Generate SSH key

```bash
ssh-keygen
```

> Press Enter during the process

::: tip
Complete command:

```bash
ssh-keygen -t rsa -C "soybeanjs@outlook.com"
```

> -t rsa indicates generating an RSA key, -C indicates a comment, followed by the comment content

:::

- Upload git SSH key

Find .ssh/id_rsa.pub in the user directory, open it, and copy the content to the SSH keys section of your git code platform.

## Common git commands

- Sync the latest code from the main branch to the current branch

```bash
git pull origin main
git rebase origin/main
```

> If the current branch is the main branch, you can directly use `git pull --rebase`

When encountering conflicts, resolve the conflicts and use the following command to continue the rebase

```bash
git add .
git rebase --continue
```

- Modify the date of the most recent commit

```bash
git commit --amend --date="2022-07-29T23:45"
```

- Merge multiple commits

```bash
git rebase -i HEAD~n  # n is the number of commits to merge
```

- Cherry-pick a commit to the current branch

```bash
git cherry-pick <commit_id>
```

> By default, it will keep the commit information. If you need to avoid creating a commit record, you can use `git cherry-pick -n <commit_id>`
