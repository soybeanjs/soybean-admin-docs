import { UserConfig } from 'vitepress';

const config: UserConfig = {
  title: 'Soybean Admin',
  lang: 'zh-CN',
  description: '一个漂亮清新的中后台模版',
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
  themeConfig: {
    repo: 'honghuangdc/soybean-admin',
    logo: '/logo.svg',
    docsBranch: 'main',
    editLinks: true,
    editLinkText: '为此页提供修改建议',
    nav: [
      { text: '指引', link: '/guide/' },
      { text: '规范', link: '/standard/' },
      { text: '教程', link: '/tutorial/' },
      {
        text: '相关链接',
        items: [
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
      '/tutorial/': [
        {
          text: '教程',
          children: [
            {
              text: '开始',
              link: '/tutorial/'
            },
            {
              text: 'iconify图标使用方法',
              link: '/tutorial/iconify'
            }
          ]
        }
      ],
      '/standard/': [
        {
          text: '规范',
          children: [
            {
              text: '开始',
              link: '/standard/'
            },
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
      '/': [
        {
          text: '指引',
          children: [
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
      ]
    }
  }
};

export default config;
