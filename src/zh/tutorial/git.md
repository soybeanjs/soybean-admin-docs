# Git

## 初始化git

- 设置用户信息

```bash
git config --global user.name "Soybean"
git config --global user.email "soybeanjs@outlook.com"
```
- 生成密钥

```bash
ssh-keygen
```
> 选择过程中直接回车

::: tip 提示
完整命令：
```bash
ssh-keygen -t rsa -C "soybeanjs@outlook.com"
```
> -t rsa表示生成rsa密钥，-C表示注释，后面跟上注释内容
:::

- 上传git密钥

在用户目录下找到 .ssh/id_rsa.pub，打开，将内容复制到git代码平台的ssh keys中

## git常见命令

- 同步main分支最新代码到当前分支

```bash
git pull origin main
git rebase origin/main
```
> 如果当前分支是main分支，可以直接使用`git pull --rebase`

遇到冲突时，解决冲突后，使用以下命令继续rebase

```bash
git add .
git rebase --continue
```

- 修改最近一次commit的时间

```bash
git commit --amend --date="2022-07-29T23:45"
```

- 合并多个commit

```bash
git rebase -i HEAD~n  # n为要合并commit的个数
```

-- 复制commit到当前分支

```bash
git cherry-pick <commit_id>
```
> 默认会保持commit的信息，如果需要不产生提交记录，可以使用`git cherry-pick -n <commit_id>`
