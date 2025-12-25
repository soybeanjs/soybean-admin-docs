import { defineConfig } from 'vitepress';
import { qqSvg } from './icon.js';
import zh from './locales/zh.js';
import jp from './locales/jp.js';

export default defineConfig({
  locales: {
    root: {
      label: 'English',
      lang: 'en',
      dir: 'src/en',
      title: 'SoybeanAdmin',
      description: 'a fresh and elegant admin template'
    },
    zh,
    jp
  },
  head: [
    ['meta', { name: 'author', content: 'Soybean' }],
    [
      'meta',
      {
        name: 'keywords',
        content: 'soybean, soybean-admin, soybean-admin docs'
      }
    ],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    [
      'meta',
      {
        name: 'viewport',
        content: 'width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no'
      }
    ],
    ['link', { rel: 'icon', href: '/logo.svg' }]
  ],
  assetsDir: 'public',
  srcDir: 'src',
  themeConfig: {
    logo: '/logo.svg',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/soybeanjs' },
      { icon: 'discord', link: 'https://discord.gg/mEFKh8xm9y' },
      {
        icon: {
          svg: qqSvg
        },
        link: 'https://qm.qq.com/cgi-bin/qm/qr?k=-Seg4nmWwuNanbi78oOpnFDD0hFh-tWh&jump_from=webapi&authKey=NlFJbbh77/j+DcMcR/pAFTUsbhV2nYqWLYHW3BebdTKWpVrnJBjUXUm87udw694U'
      }
    ],
    algolia: {
      appId: '98WN1RY04S',
      apiKey: '13e9f5767b774422a5880723d9c23265',
      indexName: 'soybean'
    },
    footer: {
      message: 'Publish under the MIT license',
      copyright: 'Copyright © 2021 Soybean'
    },
    nav: [
      { text: 'Guide', link: '/guide/intro', activeMatch: '/guide/' },
      { text: 'FAQ', link: '/faq/', activeMatch: '/faq/' },
      { text: 'Standard', link: '/standard/', activeMatch: '/standard/' },
      { text: 'Tutorial', link: '/tutorial/', activeMatch: '/tutorial/' },
      { text: 'EcoSystem', link: '/awesome/', activeMatch: '/awesome/' },
      { text: 'Recommend', link: '/recommend/', activeMatch: '/recommend/' },
      {
        text: 'Donate',
        link: '/other/donate'
      },
      {
        text: 'Links',
        items: [
          {
            text: 'Preview',
            items: [
              {
                text: 'Preview(NaiveUI)',
                link: 'https://naive.soybeanjs.cn'
              },
              {
                text: 'Preview(AntDesignVue)',
                link: 'https://antd.soybeanjs.cn'
              },
              {
                text: 'Preview(ElementPlus)',
                link: 'https://elp.soybeanjs.cn/'
              }
            ]
          },
          {
            text: 'Repository',
            items: [
              {
                text: 'Github(NaiveUI)',
                link: 'https://github.com/soybeanjs/soybean-admin'
              },
              {
                text: 'Github(AntDesignVue)',
                link: 'https://github.com/soybeanjs/soybean-admin-antd'
              },
              {
                text: 'Github(ElementPlus)',
                link: 'https://github.com/soybeanjs/soybean-admin-element-plus'
              },
              {
                text: 'Gitee(NaiveUI)',
                link: 'https://gitee.com/honghuangdc/soybean-admin'
              },
              {
                text: 'Gitee(AntDesignVue)',
                link: 'https://gitee.com/honghuangdc/soybean-admin-antd'
              }
            ]
          },
          {
            text: 'Docs',
            items: [
              {
                text: 'Legacy Docs',
                link: 'https://legacy-docs.soybeanjs.cn'
              },
              {
                text: 'Docs Repository',
                link: 'https://github.com/soybeanjs/soybean-admin-docs'
              }
            ]
          },
          {
            text: 'SoybeanJS repository list',
            link: 'https://github.com/orgs/soybeanjs/repositories?type=source'
          }
        ]
      }
    ],
    sidebar: {
      '/guide/': [
        {
          text: 'Getting Started',
          items: [
            {
              text: 'Introduction',
              link: '/guide/intro'
            },
            {
              text: 'Quick Start',
              link: '/guide/quick-start'
            },
            {
              text: 'Sync Code',
              link: '/guide/sync'
            }
          ]
        },
        {
          text: 'Theme',
          items: [
            {
              text: 'Introduction',
              link: '/guide/theme/intro'
            },
            {
              text: 'Config',
              link: '/guide/theme/config'
            },
            {
              text: 'Theme Tokens',
              link: '/guide/theme/tokens'
            },
            {
              text: 'UnoCSS Theme',
              link: '/guide/theme/unocss'
            },
            {
              text: 'UI Theme',
              link: '/guide/theme/ui'
            },
            {
              text: 'Loading',
              link: '/guide/theme/loading'
            },
            {
              text: 'Logo',
              link: '/guide/theme/logo'
            }
          ]
        },
        {
          text: 'Icon',
          items: [
            {
              text: 'Introduction',
              link: '/guide/icon/intro'
            },
            {
              text: 'Usage',
              link: '/guide/icon/usage'
            }
          ]
        },
        {
          text: 'Router',
          items: [
            {
              text: 'Introduction',
              link: '/guide/router/intro'
            },
            {
              text: 'Route Creation',
              link: '/guide/router/create'
            },
            {
              text: 'Route Structure',
              link: '/guide/router/structure'
            },
            {
              text: 'Route Component',
              link: '/guide/router/component'
            },
            {
              text: 'Route Cache',
              link: '/guide/router/cache'
            },
            {
              text: 'Router Guard',
              link: '/guide/router/guard'
            },
            {
              text: 'Router Push',
              link: '/guide/router/push'
            },
            {
              text: 'Router Dynamic',
              link: '/guide/router/dynamic'
            }
          ]
        },
        {
          text: 'Request',
          items: [
            {
              text: 'Introduction',
              link: '/guide/request/intro'
            },
            {
              text: 'Usage',
              link: '/guide/request/usage'
            },
            {
              text: 'Proxy',
              link: '/guide/request/proxy'
            },
            {
              text: 'Connect Backend',
              link: '/guide/request/backend'
            }
          ]
        },
        {
          text: 'Command Line',
          items: [
            {
              text: 'Introduction',
              link: '/guide/cli/intro'
            },
            {
              text: 'Command',
              link: '/guide/cli/command'
            },
            {
              text: 'Git Hooks',
              link: '/guide/cli/git-hooks'
            }
          ]
        },
        {
          text: 'Hooks Function',
          items: [
            {
              text: 'useTable',
              link: '/guide/hooks/use-table'
            }
          ]
        }
      ],
      '/standard/': [
        {
          text: 'Standard',
          link: '/standard/'
        },
        {
          text: 'Lint',
          link: '/standard/lint'
        },
        {
          text: 'Naming',
          link: '/standard/naming'
        },
        {
          text: 'Vue Writing Style',
          link: '/standard/vue'
        },
        {
          text: 'TS Writing Style',
          link: '/standard/ts'
        },
        {
          text: 'Synthesis',
          link: '/standard/synthesis'
        },
        {
          text: 'Tools',
          link: '/standard/tools'
        }
      ],
      '/tutorial/': [
        {
          text: 'Preface',
          link: '/tutorial/'
        },
        {
          text: 'Git Installation and Usage',
          link: '/tutorial/git'
        },
        {
          text: 'NodeJS Installation',
          link: '/tutorial/nodejs'
        },
        {
          text: 'Debug Tutorial',
          link: '/tutorial/debug'
        },
        {
          text: 'Common Software Installation',
          link: '/tutorial/software'
        },
        {
          text: 'Other',
          link: '/tutorial/other'
        }
      ],
      '/recommend/': [
        {
          text: 'Preface',
          link: '/recommend/'
        },
        {
          text: '@soybeanjs/cli',
          link: '/recommend/soybean-cli'
        },
        {
          text: 'Alova',
          link: '/recommend/alova'
        },
        {
          text: 'PageSpy',
          link: '/recommend/page-spy'
        },
        {
          text: 'Klona',
          link: '/recommend/klona'
        }
      ]
    }
  }
});
