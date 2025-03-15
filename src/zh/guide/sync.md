# 同步代码

1. 在自己的仓库里面新增`soybean-admin`的git地址

```bash
git remote add otherOrigin https://github.com/soybeanjs/soybean-admin.git
```

2. 拉取代码

```bash
git fetch otherOrigin
```

3. 通过`cherry-pick`挑选需要更新的git提交

```bash
git cherry-pick [commit id]
```

4. 代码有冲突时, 先解决冲突，然后执行下面命令，再执行`vim`保存

```bash
git cherry-pick --continue
```

> `vim`保存操作: `esc`，`:`, `wq`, `enter`回车
