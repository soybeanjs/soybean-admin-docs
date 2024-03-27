import process from 'node:process';
import path from 'node:path';
import { defineConfig } from 'vitepress';
import { qqSvg } from './icon.js';

export default defineConfig({
  locales: {
    root: {
      label: 'English',
      lang: 'en',
      dir: 'src/en',
      title: 'SoybeanAdmin',
      description: 'a fresh and elegant admin template'
    },
    zh: {
      label: '简体中文',
      lang: 'zh',
      dir: 'src/zh',
      title: 'SoybeanAdmin',
      description: '一个清新优雅的后台管理模板',
      themeConfig: {
        footer: {
          message: '根据 MIT 许可证发布',
          copyright: 'Copyright © 2021 Soybean'
        },
        nav: [
          { text: '指引', link: '/zh/guide/introduction', activeMatch: '/zh/guide/' },
          { text: '常见问题', link: '/zh/faq/', activeMatch: '/zh/faq/' },
          { text: '规范', link: '/zh/standard/', activeMatch: '/zh/standard/' },
          { text: '教程', link: '/zh/tutorial/', activeMatch: '/zh/tutorial/' },
          {
            text: '捐赠',
            link: '/zh/other/donate'
          },
          {
            text: '链接',
            items: [
              {
                text: '在线预览(NaiveUI)',
                link: 'https://naive.soybeanjs.cn'
              },
              {
                text: '在线预览(AntDesignVue)',
                link: 'https://antd.soybeanjs.cn'
              },
              {
                text: 'Github 仓库',
                link: 'https://github.com/soybeanjs/soybean-admin'
              },
              {
                text: 'Gitee 仓库',
                link: 'https://gitee.com/honghuangdc/soybean-admin'
              },
              {
                text: '旧版文档',
                link: 'https://legacy-docs.soybeanjs.cn'
              }
            ]
          },
          {
            text: '博客',
            link: '/zh/blogs/',
            activeMatch: '/zh/blogs/'
          }
        ],
        sidebar: {
          '/zh/guide/': [
            {
              text: '开始',
              items: [
                {
                  text: '简介',
                  link: '/zh/guide/intro'
                },
                {
                  text: '快速上手',
                  link: '/zh/guide/quick-start'
                }
              ]
            },
            {
              text: '主题',
              items: [
                {
                  text: '概述',
                  link: '/zh/guide/theme/intro'
                },
                {
                  text: '配置',
                  link: '/zh/guide/theme/config'
                },
                {
                  text: '主题 Tokens',
                  link: '/zh/guide/theme/tokens'
                },
                {
                  text: 'UnoCSS 主题',
                  link: '/zh/guide/theme/unocss'
                },
                {
                  text: 'UI 主题',
                  link: '/zh/guide/theme/ui'
                },
                {
                  text: '加载',
                  link: '/zh/guide/theme/loading'
                },
                {
                  text: 'Logo',
                  link: '/zh/guide/theme/logo'
                }
              ]
            },
            {
              text: '系统图标',
              items: [
                {
                  text: '概述',
                  link: '/zh/guide/icon/intro'
                },
                {
                  text: '使用',
                  link: '/zh/guide/icon/usage'
                }
              ]
            },
            {
              text: '路由',
              items: [
                {
                  text: '概述',
                  link: '/zh/guide/router/intro'
                },
                {
                  text: '路由创建',
                  link: '/zh/guide/router/create'
                },
                {
                  text: '路由说明',
                  link: '/zh/guide/router/instruction'
                },
                {
                  text: '路由缓存',
                  link: '/zh/guide/router/cache'
                },
                {
                  text: '路由守卫',
                  link: '/zh/guide/router/guard'
                }
              ]
            },
            {
              text: '请求',
              items: [
                {
                  text: '概述',
                  link: '/zh/guide/request/intro'
                },
                {
                  text: '使用',
                  link: '/zh/guide/request/usage'
                },
                {
                  text: '代理',
                  link: '/zh/guide/request/proxy'
                },
                {
                  text: '对接后端',
                  link: '/zh/guide/request/backend'
                }
              ]
            },
            {
              text: '命令行',
              items: [
                {
                  text: '概述',
                  link: '/zh/guide/cli/intro'
                },
                {
                  text: '命令',
                  link: '/zh/guide/cli/command'
                }
              ]
            }
          ],
          '/zh/standard/': [
            {
              text: '规范',
              link: '/zh/standard/'
            },
            {
              text: '命名',
              link: '/zh/standard/naming'
            },
            {
              text: 'Vue 写法',
              link: '/zh/standard/vue'
            },
            {
              text: 'TS 写法',
              link: '/zh/standard/ts'
            },
            {
              text: '综合',
              link: '/zh/standard/synthesis'
            },
            {
              text: '工具',
              link: '/zh/standard/tools'
            }
          ],
          '/zh/tutorial/': [
            {
              text: '前言',
              link: '/zh/tutorial/'
            },
            {
              text: 'Git 安装',
              link: '/zh/tutorial/git'
            },
            {
              text: 'NodeJS 安装',
              link: '/zh/tutorial/nodejs'
            },
            {
              text: 'Debug 教程',
              link: '/zh/tutorial/debug'
            },
            {
              text: '常用软件安装',
              link: '/zh/tutorial/software'
            },
            {
              text: '其他',
              link: '/zh/tutorial/software'
            }
          ],
          '/zh/blogs/': [
            {
              text: '博客',
              link: '/zh/blogs/'
            },
            {
              text: '高阶教程',
              items: [
                {
                  text: '开发一个依赖包',
                  link: '/zh/blogs/advanced/pkg'
                }
              ]
            },
            {
              text: '日常',
              items: [
                {
                  text: '2024-03-30',
                  link: '/zh/blogs/daily/2024-03-30'
                }
              ]
            }
          ]
        }
      }
    }
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
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  assetsDir: path.join(process.cwd(), 'public'),
  srcDir: path.join(process.cwd(), 'src'),
  themeConfig: {
    logo: '/logo.svg',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/soybeanjs' },
      { icon: 'discord', link: 'https://discord.gg/mEFKh8xm9y' },
      {
        icon: {
          svg: qqSvg
        },
        link: 'https://qm.qq.com/cgi-bin/qm/qr?k=WBX5tYiXMmmeid0Vw4yaqtSFqdBugAYY&jump_from=webapi&authKey=DNjXMlJRUf0EMrM+WV9fed2D1PaB3isk8Ph/6GYyruQeR2W/eIz5V6sk1FLJUP98'
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
      { text: 'Guide', link: '/guide/introduction', activeMatch: '/guide/' },
      { text: 'FAQ', link: '/faq/', activeMatch: '/faq/' },
      { text: 'Standard', link: '/standard/', activeMatch: '/standard/' },
      { text: 'Tutorial', link: '/tutorial/', activeMatch: '/tutorial/' },
      {
        text: 'Donate',
        link: '/other/donate'
      },
      {
        text: 'Links',
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
            text: 'Github Repository',
            link: 'https://github.com/soybeanjs/soybean-admin'
          },
          {
            text: 'Gitee Repository',
            link: 'https://gitee.com/honghuangdc/soybean-admin'
          },
          {
            text: 'Legacy Docs',
            link: 'https://legacy-docs.soybeanjs.cn'
          }
        ]
      },
      {
        text: 'Blog',
        link: '/blogs/',
        activeMatch: '/blogs/'
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
              text: 'Router Creation',
              link: '/guide/router/create'
            },
            {
              text: 'Router Instruction',
              link: '/guide/router/instruction'
            },
            {
              text: 'Router Cache',
              link: '/guide/router/cache'
            },
            {
              text: 'Router Guard',
              link: '/guide/router/guard'
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
          text: 'Naming',
          link: '/standard/naming'
        },
        {
          text: 'Vue Writing',
          link: '/standard/vue'
        },
        {
          text: 'TS Writing',
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
          text: 'Git Installation',
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
          link: '/tutorial/software'
        }
      ],
      '/blogs/': [
        {
          text: 'Blog',
          link: '/blogs/'
        },
        {
          text: 'Advanced Tutorial',
          items: [
            {
              text: 'Develop a Dependency Package',
              link: '/blogs/advanced/pkg'
            }
          ]
        },
        {
          text: 'Daily',
          items: [
            {
              text: '2024-03-30',
              link: '/blogs/daily/2024-03-30'
            }
          ]
        }
      ]
    }
  }
});
