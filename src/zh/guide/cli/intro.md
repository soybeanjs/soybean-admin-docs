# 命令行

## 概述

项目中的 `sa` 命令行工具提供了一些常用的功能

- `cleanup`: 删除目录: node_modules, dist, 等
- `update-pkg`: 更新 package.json 依赖版本
- `git-commit`: 生成符合 Conventional Commits 标准的提交信息
- `git-commit-verify`: 验证 git 提交信息，确保符合 Conventional Commits 标准
- `changelog`: 生成 changelog
- `release`: 发布，更新版本，生成 changelog，提交代码
- `gen-route`: 生成路由

> `sa` 命令是由 `packages/scripts` 提供
