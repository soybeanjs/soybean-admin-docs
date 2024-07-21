---
layout: page
---
<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers,
  VPTeamPageSection
} from 'vitepress/theme';

const coreMembers = [
  {
    avatar: '	https://avatars.githubusercontent.com/u/49704545?v=4',
    name: 'Soybean',
    title: '作者',
    desc: 'SoybeanAdmin项目作者，负责项目的整体开发，基础设施建设。',
    links: [
      { icon: 'github', link: 'https://github.com/honghuangdc' }
    ]
  },
];
const partners = [
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
    avatar: '	https://avatars.githubusercontent.com/u/155351881?v=4',
    name: 'Ohh',
    title: '前端开发 · 郑州',
    links: [
      { icon: 'github', link: 'https://github.com/mufeng889' }
    ]
  },
]
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>研发团队</template>
  </VPTeamPageTitle>
  <VPTeamMembers size="medium" :members="coreMembers" />
  <VPTeamPageSection>
    <template #title>核心成员</template>
    <template #members>
      <VPTeamMembers size="small" :members="partners" />
    </template>
  </VPTeamPageSection>
</VPTeamPage>
