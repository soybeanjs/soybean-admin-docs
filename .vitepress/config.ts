import { defineConfig } from 'vitepress';
import path from 'path';

export default defineConfig({
  title: 'Soybean Admin',
  lang: 'zh-CN',
  description: '一个优雅、清新、漂亮的中后台模版',
  head: [
    ['meta', { name: 'author', content: 'Soybean' }],
    [
      'meta',
      {
        name: 'keywords',
        content: 'soybean, soybean-admin, vite, vue, vue3, soybean-admin docs'
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
  srcDir: `${path.resolve(process.cwd())}/src`,
  themeConfig: {
    logo: '/logo.svg',
    editLink: {
      text: '为此页提供修改建议',
      pattern: 'https://github.com/honghuangdc/soybean-admin-docs/tree/main/:path'
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/honghuangdc/soybean-admin' },
      { icon: 'discord', link: 'https://qm.qq.com/cgi-bin/qm/qr?k=XTjkqjV1KynFoEAdrqxMd6i71-TtCVGV&jump_from=webapi' }
    ],
    localeLinks: {
      text: '简体中文',
      items: []
    },
    algolia: {
      appId: '98WN1RY04S',
      apiKey: '13e9f5767b774422a5880723d9c23265',
      indexName: 'soybean'
    },
    footer: {
      message: '根据 MIT 许可证发布。',
      copyright: 'Copyright © 2021-present Soybean'
    },
    nav: [
      { text: '指引', link: '/guide/', activeMatch: '/guide/' },
      { text: '规范', link: '/standard/category', activeMatch: '/standard' },
      { text: '教程', link: '/tutorial/install', activeMatch: '/tutorial/' },
      {
        text: '相关链接',
        items: [
          {
            text: 'Discord Chat',
            link: 'https://discord.com/invite/CgUJzKpj'
          },
          {
            text: '预览地址',
            link: 'https://soybean.pro'
          },
          {
            text: '项目源码',
            link: 'https://github.com/honghuangdc/soybean-admin'
          },
          {
            text: '文档源码',
            link: 'https://github.com/honghuangdc/soybean-admin-docs'
          },
          {
            text: '更新日志',
            link: 'https://github.com/honghuangdc/soybean-admin/blob/main/CHANGELOG.md'
          }
        ]
      },
      {
        text: '赞助',
        link: '/other/donate'
      }
    ],
    sidebar: {
      '/guide/': [
        {
          text: '指引',
          items: [
            {
              text: '介绍',
              link: '/guide/introduction'
            },
            {
              text: '开始',
              link: '/guide/'
            },
            {
              text: '项目配置',
              link: '/guide/settings'
            },
            {
              text: '路由',
              link: '/guide/router'
            },
            {
              text: '菜单',
              link: '/guide/menu'
            },
            {
              text: '权限',
              link: '/guide/auth'
            }
          ]
        }
      ],
      '/standard/': [
        {
          text: '规范',
          items: [
            {
              text: '目录规范',
              link: '/standard/category'
            },
            {
              text: '命名规范',
              link: '/standard/name'
            },
            {
              text: 'css规范',
              link: '/standard/css'
            },
            {
              text: 'ts规范',
              link: '/standard/ts'
            },
            {
              text: 'vue规范',
              link: '/standard/vue'
            }
          ]
        }
      ],
      '/tutorial/': [
        {
          text: '教程',
          items: [
            {
              text: '安装教程',
              link: '/tutorial/install'
            },
            {
              text: 'iconify图标使用方法',
              link: '/tutorial/iconify'
            }
          ]
        }
      ]
    }
  }
});
