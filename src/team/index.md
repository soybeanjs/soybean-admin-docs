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
    title: 'Author',
    desc: 'SoybeanAdmin project author, responsible for the overall development of the project, infrastructure construction.',
    links: [
      { icon: 'github', link: 'https://github.com/honghuangdc' }
    ]
  },
];
const partners = [
  {
    avatar: '	https://avatars.githubusercontent.com/u/79054161?v=4',
    name: '青菜白玉汤',
    title: 'Front-end development · Guangdong',
    desc: 'Responsible for front-end development and maintenance, documentation, community maintenance.',
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
    desc:'Be keen on new technology, explore the application and practice of new technology, and use it in real projects',
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
]
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>R&D team</template>
  </VPTeamPageTitle>
  <VPTeamMembers size="medium" :members="coreMembers" />
  <VPTeamPageSection>
    <template #title>Core member</template>
    <template #members>
      <VPTeamMembers size="small" :members="partners" />
    </template>
  </VPTeamPageSection>
</VPTeamPage>
