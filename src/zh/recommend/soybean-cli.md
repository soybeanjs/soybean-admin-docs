# @soybeanjs/cli

## 相关链接

- [文档](https://github.com/soybeanjs/cli/blob/main/README.md)
- [GitHub](https://github.com/soybeanjs/cli)

## 介绍

SoybeanJS 的命令行工具，包含六种便捷命令：

| 命令              | 作用                                                                                 |
| ----------------- | ------------------------------------------------------------------------------------ |
| git-commit        | 生成符合 Angular 规范的 git 提交信息 (在提交信息添加前缀`!`可以表示破坏性更新的提交) |
| git-commit-verify | 校验 git 的提交信息是否符合 Angular 规范                                             |
| cleanup           | 快速、完整的清空依赖和构建产物                                                       |
| ncu               | 命令 npm-check-updates, 升级依赖                                                     |
| changelog         | 根据两次 tag 生成 changelog (--total: 根据所有 tag 生成 changelog)                   |
| release           | 发布：更新版本号、生成 changelog、提交代码                                           |
