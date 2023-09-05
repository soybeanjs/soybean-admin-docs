import { defineConfig } from 'vitepress';
import path from 'path';
import { qqSvg } from './icon';

export default defineConfig({
  title: 'Soybean Admin',
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
      message: '根据 MIT 许可证发布',
      copyright: 'Copyright © 2021 Soybean'
    },
    nav: [
      { text: '项目指南', link: '/guide/', activeMatch: '/guide/' },
      { text: '常见问题', link: '/faq/', activeMatch: '/faq/' },
      {
        text: '相关链接',
        items: [
          {
            text: '预览地址',
            link: 'https://admin.soybeanjs.cn'
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
          text: '项目指南',
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
              text: '系统加载',
              link: '/guide/loading'
            },
            {
              text: '系统主题',
              link: '/guide/theme'
            },
            {
              text: '系统图标',
              link: '/guide/icon'
            },
            {
              text: '系统路由',
              link: '/guide/router'
            },
            {
              text: '系统请求',
              link: '/guide/request'
            },
            {
              text: '系统菜单',
              link: '/guide/menu'
            },
            {
              text: '系统标签',
              link: '/guide/tab'
            }
          ]
        }
      ]
    }
  }
});
