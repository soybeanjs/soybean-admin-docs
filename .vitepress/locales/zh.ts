export default {
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
      { text: '指引', link: '/zh/guide/intro', activeMatch: '/zh/guide/' },
      { text: '常见问题', link: '/zh/faq/', activeMatch: '/zh/faq/' },
      { text: '规范', link: '/zh/standard/', activeMatch: '/zh/standard/' },
      { text: '教程', link: '/zh/tutorial/', activeMatch: '/zh/tutorial/' },
      {
        text: '合作',
        link: '/zh/cooperate/',
        activeMatch: '/zh/cooperate/'
      },
      { text: '生态', link: '/zh/awesome/', activeMatch: '/zh/awesome/' },
      { text: '技术推荐', link: '/zh/recommend/', activeMatch: '/zh/recommend/' },
      {
        text: '捐赠',
        link: '/zh/other/donate'
      },
      {
        text: '链接',
        items: [
          {
            text: '预览',
            items: [
              {
                text: '在线预览(NaiveUI)',
                link: 'https://naive.soybeanjs.cn'
              },
              {
                text: '在线预览(AntDesignVue)',
                link: 'https://antd.soybeanjs.cn'
              }
            ]
          },
          {
            text: '源码仓库',
            items: [
              {
                text: 'Github(NaiveUI) 仓库',
                link: 'https://github.com/soybeanjs/soybean-admin'
              },
              {
                text: 'Github(AntDesignVue) 仓库',
                link: 'https://github.com/soybeanjs/soybean-admin-antd'
              },
              {
                text: 'Gitee(NaiveUI) 仓库',
                link: 'https://gitee.com/honghuangdc/soybean-admin'
              },
              {
                text: 'Gitee(AntDesignVue) 仓库',
                link: 'https://gitee.com/honghuangdc/soybean-admin-antd'
              }
            ]
          },
          {
            text: '文档',
            items: [
              {
                text: '旧版文档',
                link: 'https://legacy-docs.soybeanjs.cn'
              },
              {
                text: '文档源码',
                link: 'https://github.com/soybeanjs/soybean-admin-docs'
              }
            ]
          },
          {
            text: 'SoybeanJS 仓库列表',
            link: 'https://github.com/orgs/soybeanjs/repositories?type=source'
          }
        ]
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
            },
            {
              text: '同步代码',
              link: '/zh/guide/sync'
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
              text: '路由结构',
              link: '/zh/guide/router/structure'
            },
            {
              text: '路由组件',
              link: '/zh/guide/router/component'
            },
            {
              text: '路由缓存',
              link: '/zh/guide/router/cache'
            },
            {
              text: '路由守卫',
              link: '/zh/guide/router/guard'
            },
            {
              text: '路由跳转',
              link: '/zh/guide/router/push'
            },
            {
              text: '路由权限',
              link: '/zh/guide/router/dynamic'
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
            },
            {
              text: 'Git Hooks',
              link: '/zh/guide/cli/git-hooks'
            }
          ]
        },
        {
          text: 'Hooks 函数',
          items: [
            {
              text: 'useTable',
              link: 'zh/guide/hooks/use-table'
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
          text: '格式化检查',
          link: '/zh/standard/lint'
        },
        {
          text: '命名',
          link: '/zh/standard/naming'
        },
        {
          text: 'Vue 写法规范',
          link: '/zh/standard/vue'
        },
        {
          text: 'TS 写法规范',
          link: '/zh/standard/ts'
        },
        {
          text: '综合',
          link: '/zh/standard/synthesis'
        },
        {
          text: '工具规范',
          link: '/zh/standard/tools'
        }
      ],
      '/zh/tutorial/': [
        {
          text: '前言',
          link: '/zh/tutorial/'
        },
        {
          text: 'Git 安装与使用',
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
          link: '/zh/tutorial/other'
        }
      ],
      '/zh/recommend/': [
        {
          text: '前言',
          link: '/zh/recommend/'
        },
        {
          text: '@soybeanjs/cli-脚手架工具',
          link: '/zh/recommend/soybean-cli'
        },
        {
          text: 'Alova-下一代请求工具',
          link: '/zh/recommend/alova'
        },
        {
          text: 'PageSpy-多端远程调试平台',
          link: '/zh/recommend/page-spy'
        }
      ]
    }
  }
};
