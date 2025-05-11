# SoybeanAdmin Documentation

[![github stars](https://img.shields.io/github/stars/soybeanjs/soybean-admin-docs)](https://github.com/soybeanjs/soybean-admin-docs)
[![github forks](https://img.shields.io/github/forks/soybeanjs/soybean-admin-docs)](https://github.com/soybeanjs/soybean-admin-docs)
[![gitee stars](https://gitee.com/honghuangdc/soybean-admin-docs/badge/star.svg)](https://gitee.com/honghuangdc/soybean-admin-docs)
[![gitcode star](https://gitcode.com/soybeanjs/soybean-admin-docs/star/badge.svg)](https://gitcode.com/soybeanjs/soybean-admin-docs)

## 简介

这是 [SoybeanAdmin](https://github.com/honghuangdc/soybean-admin) 项目的官方文档。本文档使用 [VitePress](https://vitepress.dev/) 构建，提供多语言支持（中文和日语）。

## SoybeanAdmin 仓库

- **NaiveUI 版本:**
  - [预览地址](https://naive.soybeanjs.cn/)
  - [Github 仓库](https://github.com/soybeanjs/soybean-admin)
  - [Gitee 仓库](https://gitee.com/honghuangdc/soybean-admin)
  - [Gitcode 仓库](https://gitcode.com/soybeanjs/soybean-admin)
- **AntDesignVue 版本:**
  - [预览地址](https://antd.soybeanjs.cn/)
  - [Github 仓库](https://github.com/soybeanjs/soybean-admin-antd)
  - [Gitee 仓库](https://gitee.com/honghuangdc/soybean-admin-antd)
  - [Gitcode 仓库](https://gitcode.com/soybeanjs/soybean-admin-antd)
- **ElementPlus 版本:**
  - [预览地址](https://elp.soybeanjs.cn/)
  - [Github 仓库](https://github.com/soybeanjs/soybean-admin-element-plus)
  - [Gitee 仓库](https://gitee.com/honghuangdc/soybean-admin-element-plus)
  - [Gitcode 仓库](https://gitcode.com/soybeanjs/soybean-admin-element-plus)
- **旧版:**

  - [预览地址](https://legacy.soybeanjs.cn/)
  - [Github 仓库](https://github.com/soybeanjs/soybean-admin/tree/legacy)
  - [Gitee 仓库](https://gitee.com/honghuangdc/soybean-admin/tree/legacy)
  - [Gitcode 仓库](https://gitcode.com/soybeanjs/soybean-admin/tree/legacy)

- **文档仓库:**
  - [Github 仓库](https://github.com/soybeanjs/soybean-admin-docs)
  - [Gitee 仓库](https://gitee.com/honghuangdc/soybean-admin-docs)
  - [Gitcode 仓库](https://gitcode.com/soybeanjs/soybean-admin-docs)

## 克隆

```bash
# github
git clone https://github.com/soybeanjs/soybean-admin-docs.git
# gitee
git clone https://gitee.com/honghuangdc/soybean-admin-docs.git
# gitcode
git clone https://gitcode.com/soybeanjs/soybean-admin-docs.git
```

## 安装

```bash
# 安装依赖
pnpm install
```

## 开发

```bash
# 启动开发服务器
pnpm dev
```

## 构建

```bash
# 构建文档
pnpm build
```

## 预览构建结果

```bash
# 预览构建后的文档
pnpm preview
```

## 项目结构

- [`.vitepress`](.vitepress) - VitePress 配置和主题文件
  - `config.ts` - 主要配置文件
  - `locales/` - 多语言支持文件
- [`src`](src) - 文档内容
  - `zh/` - 中文文档
  - `jp/` - 日语文档
  - `guide/` - 指南
  - `tutorial/` - 教程
  - `awesome/` - 精选资源
  - `standard/` - 规范
  - `faq/` - 常见问题
  - `recommend/` - 推荐内容

## 贡献指南

欢迎为 SoybeanAdmin 文档做出贡献，请参考以下步骤：

1. Fork 本仓库
2. 创建您的特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交您的更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 打开一个 Pull Request

## 许可证

本项目使用 MIT 许可证 进行许可。
