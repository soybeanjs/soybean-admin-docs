---
layout: home
title: SoybeanAdmin
titleTemplate: 洗練されたエレガントなバックエンドテンプレート

hero:
  name: SoybeanAdmin
  text: 洗練されたエレガントなバックエンドテンプレート
  tagline: Vue3、Vite6、TypeScript、UnoCSS に基づいて
  image:
    src: /logo.svg
    alt: SoybeanAdmin
  actions:
    - theme: brand
      text: 開始
      link: /jp/guide/quick-start
    - theme: alt
      text: 紹介
      link: /jp/guide/intro
    - theme: alt
      text: GitHubで見る
      link: https://github.com/soybeanjs/soybean-admin
    - theme: alt
      text: React版ドキュメント ->
      link: https://react-docs.soybeanjs.cn/

features:
  - icon: 🆕
    title: 最新の人気技術スタック
    details: Vue3、Vite6、TypeScript、UnoCSS
  - icon: 🔄
    title: マルチフレームワーク対応
    details: Vue3とReactの両方をサポートし、フロントエンド技術スタックを柔軟に選択可能
  - icon: 🎨
    title: 多様なコンポーネントライブラリ統合
    details: Element Plus、Naive UI、Ant Design、Ant Design Vue など複数のコンポーネントライブラリに対応し、多様なUIニーズを満たす
  - icon: 🦋
    title: 明確なプロジェクト構造
    details: pnpm monorepoを採用し、構造が明確でエレガント、保守が容易。コードの規範性も非常に高い
  - icon: 🛠️
    title: TypeScript
    details: 厳格な型チェックにより、チーム開発と保守が容易
  - icon: 🔩
    title: テーマ設定
    details: 豊富なテーマ設定が組み込まれており、UnoCSSと簡単に組み合わせて拡張可能
  - icon: 🔗
    title: ファイルルーティングシステム
    details: 自動化・インテリジェントなファイルルーティングシステム
  - icon: 🔑
    title: 権限ルーティング
    details: フロントエンドの静的ルーティングとバックエンドの動的ルーティングをサポート
  - icon: ⚙️
    title: 拡張スクリプト
    details: 依存関係のワンクリックアップグレード、ChangeLogの自動生成、コミットメッセージの生成などのスクリプト機能を提供し、開発効率を大幅に向上。
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
    <template #title>SoybeanJs チーム</template>
  </VPTeamPageTitle>
  <VPTeamPageSection>
    <template #members>
      <VPTeamMembers size="small" :members="partners" />
    </template>
  </VPTeamPageSection>
</VPTeamPage>
