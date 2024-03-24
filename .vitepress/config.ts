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
          }
        ],
        sidebar: {
          '/zh/guide/': [
            {
              text: '开始',
              link: '/zh/guide/'
            },
            {
              text: '介绍',
              link: '/zh/guide/introduction'
            },
            {
              text: '系统加载',
              link: '/zh/guide/loading'
            },
            {
              text: '系统主题',
              link: '/zh/guide/theme'
            },
            {
              text: '系统图标',
              link: '/zh/guide/icon'
            },
            {
              text: '系统路由',
              link: '/zh/guide/router'
            },
            {
              text: '路由守卫',
              link: '/zh/guide/router-guard'
            },
            {
              text: '系统请求',
              link: '/zh/guide/request'
            }
          ],
          '/zh/faq/': [],
          '/zh/standard/': []
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
        link: 'https://qm.qq.com/cgi-bin/qm/qr?k=XTjkqjV1KynFoEAdrqxMd6i71-TtCVGV&jump_from=webapi'
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
      }
    ],
    sidebar: {
      '/guide/': [
        {
          text: 'Start',
          link: '/guide/'
        },
        {
          text: 'Introduction',
          link: '/guide/introduction'
        },
        {
          text: 'System Loading',
          link: '/guide/loading'
        },
        {
          text: 'System Theme',
          link: '/guide/theme'
        },
        {
          text: 'System Icon',
          link: '/guide/icon'
        },
        {
          text: 'System Router',
          link: '/guide/router'
        },
        {
          text: 'Router Guard',
          link: '/guide/router-guard'
        },
        {
          text: 'System Request',
          link: '/guide/request'
        }
      ],
      '/faq/': [],
      '/standard/': []
    }
  }
});
