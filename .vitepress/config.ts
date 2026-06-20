import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { type HeadConfig, defineConfig } from 'vitepress';
import llmstxt, { copyOrDownloadAsMarkdownButtons } from 'vitepress-plugin-llms';
import { qqSvg } from './icon.js';
import zh from './locales/zh.js';
import jp from './locales/jp.js';

/** 文档站点的规范域名，用于 sitemap、robots、Open Graph、llms.txt 等绝对链接 */
const HOSTNAME = 'https://docs.soybeanjs.cn';

const BOM = '\uFEFF';

/** 递归为输出目录中的 .md / .txt 文件添加 UTF-8 BOM，确保浏览器以 UTF-8 解析（避免中文乱码） */
function prependBomToTextFiles(dir: string) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      prependBomToTextFiles(fullPath);
    } else if ((entry.name.endsWith('.md') || entry.name.endsWith('.txt')) && entry.name !== 'robots.txt') {
      const content = readFileSync(fullPath, 'utf-8');
      if (!content.startsWith(BOM)) {
        writeFileSync(fullPath, BOM + content);
      }
    }
  }
}


/** 从 Markdown 正文中提取首段纯文本，作为页面级 description（利于 SEO 与 AI 摘要抽取） */
function extractDescription(raw: string): string {
  const body = raw
    .replace(/^﻿/, '')
    .replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '') // 去除 frontmatter
    .replace(/```[\s\S]*?```/g, '') // 去除围栏代码块
    .replace(/^:::.*$/gm, ''); // 去除自定义容器标记

  for (const line of body.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    // 跳过标题、引用、表格、HTML、脚本；列表项保留（去除标记后作为正文）
    if (/^(#|>|\||<|import\s|export\s)/.test(trimmed)) continue;
    const text = trimmed
      .replace(/^([-*+]|\d+\.)\s+/, '') // 去除列表项标记
      .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1') // 链接/图片 -> 文本
      .replace(/[*_`~]/g, '') // 去除强调 / 行内代码标记
      .replace(/<[^>]+>/g, '') // 去除行内 HTML
      .trim();
    if (text.length < 10) continue;
    return text.length > 160 ? `${text.slice(0, 157).trimEnd()}…` : text;
  }
  return '';
}

export default defineConfig({
  vite: {
    plugins: [
      // 仅为中文文档（src/zh）生成 llms.txt、llms-full.txt 以及每页的 .md，便于 AI 阅读理解内容。
      // 使用 ignoreFiles 排除非中文文档（而非 workDir），以保留 /zh/ 路径前缀，
      // 这样生成的 .md 路径与页面路径一致，"Copy as Markdown" 按钮才能正确定位到对应文件。
      // '!zh/**' 利用 minimatch 取反：忽略所有不在 zh/ 下的文件（新增的非中文目录会被自动忽略）。
      llmstxt({
        ignoreFiles: ['!zh/**'],
        // 传入中文侧边栏，使 llms.txt 目录按主题分组（插件默认仅读取顶层英文 themeConfig.sidebar）
        sidebar: zh.themeConfig.sidebar,
        domain: HOSTNAME,
        title: 'SoybeanAdmin',
        description: '清新优雅的中后台模版'
      })
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
  // 生成 sitemap.xml，便于常规 SEO 与 AI 爬虫发现页面
  sitemap: {
    hostname: HOSTNAME
  },
  // 为没有显式 description 的页面，依据正文首段生成页面级描述
  transformPageData(pageData, ctx) {
    if (pageData.frontmatter.description) return;
    try {
      const raw = readFileSync(join(ctx.siteConfig.srcDir, pageData.relativePath), 'utf-8');
      const description = extractDescription(raw);
      if (description) pageData.description = description;
    } catch {
      // 忽略无法读取的虚拟页面（如 404）
    }
  },
  // 注入机器可读的 head 信号：Open Graph / Twitter Card，以及指向 Markdown 版本的 alternate 链接
  transformHead({ pageData, title, description, siteConfig }) {
    const { relativePath } = pageData;
    const cleanPath = relativePath.replace(/\.md$/, '').replace(/(^|\/)index$/, '$1');
    const url = `${HOSTNAME}/${cleanPath}`;
    const image = `${HOSTNAME}/logo.svg`;

    const head: HeadConfig[] = [
      ['meta', { property: 'og:type', content: 'website' }],
      ['meta', { property: 'og:site_name', content: 'SoybeanAdmin' }],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: description }],
      ['meta', { property: 'og:url', content: url }],
      ['meta', { property: 'og:image', content: image }],
      ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
      ['meta', { name: 'twitter:title', content: title }],
      ['meta', { name: 'twitter:description', content: description }],
      ['meta', { name: 'twitter:image', content: image }]
    ];

    // 仅当该页面确实生成了 .md（当前为中文文档）时，提供标准的 Markdown 备用链接
    if (existsSync(join(siteConfig.outDir, relativePath))) {
      head.push(['link', { rel: 'alternate', type: 'text/markdown', href: `${HOSTNAME}/${relativePath}` }]);
    }

    return head;
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
