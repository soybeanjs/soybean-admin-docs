import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { defineConfig } from 'vitepress';
import llmstxt, { copyOrDownloadAsMarkdownButtons } from 'vitepress-plugin-llms';
import { qqSvg } from './icon.js';
import zh from './locales/zh.js';
import jp from './locales/jp.js';

const BOM = '\uFEFF';

/** 递归为输出目录中的 .md / .txt 文件添加 UTF-8 BOM，确保浏览器以 UTF-8 解析（避免中文乱码） */
function prependBomToTextFiles(dir: string) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      prependBomToTextFiles(fullPath);
    } else if (entry.name.endsWith('.md') || entry.name.endsWith('.txt')) {
      const content = readFileSync(fullPath, 'utf-8');
      if (!content.startsWith(BOM)) {
        writeFileSync(fullPath, BOM + content);
      }
    }
  }
}

export default defineConfig({
  vite: {
    plugins: [
      // 仅为中文文档（src/zh）生成 llms.txt、llms-full.txt 以及每页的 .md，便于 AI 阅读理解内容。
      // 使用 ignoreFiles 排除非中文文档（而非 workDir），以保留 /zh/ 路径前缀，
      // 这样生成的 .md 路径与页面路径一致，"Copy as Markdown" 按钮才能正确定位到对应文件。
      // '!zh/**' 利用 minimatch 取反：忽略所有不在 zh/ 下的文件（新增的非中文目录会被自动忽略）。
      llmstxt({ ignoreFiles: ['!zh/**'] })
    ]
  },
  markdown: {
    config(md) {
      // 在每个页面的一级标题后自动插入 <CopyOrDownloadAsMarkdownButtons />（按钮组件在主题中按语言注册）
      md.use(copyOrDownloadAsMarkdownButtons);
    }
  },
  // 构建结束后为生成的 llms.txt / llms-full.txt / 每页 .md 补充 UTF-8 BOM，修复浏览器直接打开时的中文乱码
  buildEnd(siteConfig) {
    prependBomToTextFiles(siteConfig.outDir);
  },
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
    search: {
      provider: 'algolia',
      options: {
        appId: '98WN1RY04S',
        apiKey: '13e9f5767b774422a5880723d9c23265',
        indexName: 'soybean'
      }
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
