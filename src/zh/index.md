---
layout: home

title: SoybeanAdmin
titleTemplate: 一个清新优雅的中后台模版

hero:
  name: SoybeanAdmin
  text: 清新优雅的中后台模版
  tagline: 基于 Vue3、Vite5、TypeScript 和 UnoCSS
  image:
    src: /logo.svg
    alt: SoybeanAdmin
  actions:
    - theme: brand
      text: 开始
      link: /zh/guide/quick-start
    - theme: alt
      text: 介绍
      link: /zh/guide/intro
    - theme: alt
      text: 在 GitHub 上查看
      link: https://github.com/soybeanjs/soybean-admin
    - theme: alt
      text: React 版本文档 ->
      link: https://react-soybean-docs.ohh-889.com/index-cn

features:
  - icon: 🆕
    title: 社区流行的最新技术栈
    details: Vue3,Vite5,TypeScript 和 UnoCSS
  - icon: 🔄
    title: 多框架支持
    details: 同时支持 Vue3 和 React，让您可灵活选择前端开发技术栈
  - icon: 🎨
    title: 多组件库集成
    details: 适配 Element Plus、Naive UI、Ant Design、Ant Design Vue 等多种组件库，满足多样化 UI 需求。
  - icon: 🦋
    title: 清晰的项目结构
    details: 采用 pnpm monorepo，结构清晰优雅，易于维护。代码规范性极高
  - icon: 🛠️
    title: TypeScript
    details: 严格的类型检查，易于团队开发和维护
  - icon: 🔩
    title: 主题配置
    details: 内置丰富的主题配置，轻松结合 UnoCSS进行拓展
  - icon: 🔗
    title: 文件路由系统
    details: 自动化、智能化的文件路由系统
  - icon: 🔑
    title: 权限路由
    details: 支持前端静态路由和后端动态路由
  - icon: ⚙️
    title: 扩展 Script 脚本
    details: 提供一键升级依赖、自动生成 ChangeLog、生成提交信息等多种脚本功能，显著提升开发效率。
---

<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers,
  VPTeamPageSection
} from 'vitepress/theme';

const partners = [
  {
    avatar: '	https://avatars.githubusercontent.com/u/49704545?v=4',
    name: 'Soybean',
    title: '作者',
    desc: 'SoybeanJS团队创建者，SoybeanAdmin作者。',
    links: [
      { icon: 'github', link: 'https://github.com/honghuangdc' }
    ]
  },
  {
    avatar: '	https://avatars.githubusercontent.com/u/79054161?v=4',
    name: '青菜白玉汤',
    title: '前端开发 · 广东',
    desc: '负责前端周边开发维护，文档编写，社区维护。',
    links: [
      { icon: 'github', link: 'https://github.com/Azir-11' }
    ]
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/18189346?v=4',
    name: 'paynezhuang',
    links: [
      { icon: 'github', link: 'https://github.com/paynezhuang' }
    ]
  },
  {
    avatar: '	https://avatars.githubusercontent.com/u/35002714?v=4',
    name: 'fonghehe',
    desc:'热衷新技术，探究新技术的应用和实践，并在实际的项目中使用',
    links: [
      { icon: 'github', link: 'https://github.com/fonghehe' }
    ]
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/37368500?v=4',
    name: '我问这瓜保熟吗',
    links: [
      { icon: 'github', link: 'https://github.com/ByteByteBrew' }
    ]
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/43030980?v=4',
    name: 'yanbowen',
    links: [
      { icon: 'github', link: 'https://github.com/yanbowe' }
    ]
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/53158783?v=4',
    name: 'lisong',
    links: [
      { icon: 'github', link: 'https://github.com/SonyLeo' }
    ]
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/155351881?v=4',
    name: 'Ohh',
    title: '前端开发 · 郑州',
    links: [
      { icon: 'github', link: 'https://github.com/mufeng889' }
    ]
  },
  {
    avatar: '	https://avatars.githubusercontent.com/u/23544762?s=96&v=4',
    name: '一寸灰',
    title: '前端开发 · 北京',
    desc: 'Why not',
    links: [
      { icon: 'github', link: 'https://github.com/skyfeiz' }
    ]
  },
]
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>SoybeanJs 团队</template>
  </VPTeamPageTitle>
  <VPTeamPageSection>
    <template #members>
      <VPTeamMembers size="small" :members="partners" />
    </template>
  </VPTeamPageSection>
</VPTeamPage>
