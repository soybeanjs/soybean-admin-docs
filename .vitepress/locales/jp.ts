export default {
  label: '日本語',
  lang: 'jp',
  dir: 'src/jp',
  title: 'SoybeanAdmin',
  description: '爽やかでエレガントな管理システムテンプレート',
  themeConfig: {
    footer: {
      message: 'MITライセンスの下で公開',
      copyright: 'Copyright © 2021 Soybean'
    },
    nav: [
      { text: 'ガイド', link: '/jp/guide/intro', activeMatch: '/jp/guide/' },
      { text: 'よくある質問', link: '/jp/faq/', activeMatch: '/jp/faq/' },
      { text: '規範', link: '/jp/standard/', activeMatch: '/jp/standard/' },
      { text: 'チュートリアル', link: '/jp/tutorial/', activeMatch: '/jp/tutorial/' },
      {
        text: '協力',
        link: '/jp/cooperate/',
        activeMatch: '/jp/cooperate/'
      },
      { text: 'エコシステム', link: '/jp/awesome/', activeMatch: '/jp/awesome/' },
      { text: '技術推薦', link: '/jp/recommend/', activeMatch: '/jp/recommend/' },
      {
        text: 'ドネーション',
        link: '/jp/other/donate'
      },
      {
        text: 'リンク',
        items: [
          {
            text: 'プレビュー',
            items: [
              {
                text: 'オンラインプレビュー (NaiveUI)',
                link: 'https://naive.soybeanjs.cn'
              },
              {
                text: 'オンラインプレビュー (AntDesignVue)',
                link: 'https://antd.soybeanjs.cn'
              },
              {
                text: 'オンラインプレビュー (ElementPlus)',
                link: 'https://elp.soybeanjs.cn/'
              }
            ]
          },
          {
            text: 'ソースコードリポジトリ',
            items: [
              {
                text: 'GitHub (NaiveUI) リポジトリ',
                link: 'https://github.com/soybeanjs/soybean-admin'
              },
              {
                text: 'GitHub (AntDesignVue) リポジトリ',
                link: 'https://github.com/soybeanjs/soybean-admin-antd'
              },
              {
                text: 'Github(ElementPlus) リポジトリ',
                link: 'https://github.com/soybeanjs/soybean-admin-element-plus'
              },
              {
                text: 'Gitee (NaiveUI) リポジトリ',
                link: 'https://gitee.com/honghuangdc/soybean-admin'
              },
              {
                text: 'Gitee (AntDesignVue) リポジトリ',
                link: 'https://gitee.com/honghuangdc/soybean-admin-antd'
              }
            ]
          },
          {
            text: 'ドキュメント',
            items: [
              {
                text: '旧バージョンドキュメント',
                link: 'https://legacy-docs.soybeanjs.cn'
              },
              {
                text: 'ドキュメントソースコード',
                link: 'https://github.com/soybeanjs/soybean-admin-docs'
              }
            ]
          },
          {
            text: 'SoybeanJS リポジトリ一覧',
            link: 'https://github.com/orgs/soybeanjs/repositories?type=source'
          }
        ]
      }
    ],
    sidebar: {
      '/jp/guide/': [
        {
          text: '開始',
          items: [
            {
              text: '概要',
              link: '/jp/guide/intro'
            },
            {
              text: 'クイックスタート',
              link: '/jp/guide/quick-start'
            },
            {
              text: 'コード同期',
              link: '/jp/guide/sync'
            }
          ]
        },
        {
          text: 'テーマ',
          items: [
            {
              text: '概要',
              link: '/jp/guide/theme/intro'
            },
            {
              text: '設定',
              link: '/jp/guide/theme/config'
            },
            {
              text: 'テーマトークン',
              link: '/jp/guide/theme/tokens'
            },
            {
              text: 'UnoCSS テーマ',
              link: '/jp/guide/theme/unocss'
            },
            {
              text: 'UI テーマ',
              link: '/jp/guide/theme/ui'
            },
            {
              text: 'ローディング',
              link: '/jp/guide/theme/loading'
            },
            {
              text: 'ロゴ',
              link: '/jp/guide/theme/logo'
            }
          ]
        },
        {
          text: 'システムアイコン',
          items: [
            {
              text: '概要',
              link: '/jp/guide/icon/intro'
            },
            {
              text: '使用方法',
              link: '/jp/guide/icon/usage'
            }
          ]
        },
        {
          text: 'ルーティング',
          items: [
            {
              text: '概要',
              link: '/jp/guide/router/intro'
            },
            {
              text: 'ルートの作成',
              link: '/jp/guide/router/create'
            },
            {
              text: 'ルート構造',
              link: '/jp/guide/router/structure'
            },
            {
              text: 'ルートコンポーネント',
              link: '/jp/guide/router/component'
            },
            {
              text: 'ルートキャッシュ',
              link: '/jp/guide/router/cache'
            },
            {
              text: 'ルートガード',
              link: '/jp/guide/router/guard'
            },
            {
              text: 'ルート遷移',
              link: '/jp/guide/router/push'
            },
            {
              text: 'ルート権限',
              link: '/jp/guide/router/dynamic'
            }
          ]
        },
        {
          text: 'リクエスト',
          items: [
            {
              text: '概要',
              link: '/jp/guide/request/intro'
            },
            {
              text: '使用方法',
              link: '/jp/guide/request/usage'
            },
            {
              text: 'プロキシ',
              link: '/jp/guide/request/proxy'
            },
            {
              text: 'バックエンドとの連携',
              link: '/jp/guide/request/backend'
            }
          ]
        },
        {
          text: 'コマンドライン',
          items: [
            {
              text: '概要',
              link: '/jp/guide/cli/intro'
            },
            {
              text: 'コマンド',
              link: '/jp/guide/cli/command'
            },
            {
              text: 'Git Hooks',
              link: '/jp/guide/cli/git-hooks'
            }
          ]
        },
        {
          text: 'Hooks 関数',
          items: [
            {
              text: 'useTable',
              link: '/jp/guide/hooks/use-table'
            }
          ]
        }
      ],
      '/jp/standard/': [
        {
          text: '規範',
          link: '/jp/standard/'
        },
        {
          text: 'フォーマットチェック',
          link: '/jp/standard/lint'
        },
        {
          text: '命名規則',
          link: '/jp/standard/naming'
        },
        {
          text: 'Vue コーディング規範',
          link: '/jp/standard/vue'
        },
        {
          text: 'TS コーディング規範',
          link: '/jp/standard/ts'
        },
        {
          text: '総合',
          link: '/jp/standard/synthesis'
        },
        {
          text: 'ツール規範',
          link: '/jp/standard/tools'
        }
      ],
      '/jp/tutorial/': [
        {
          text: 'チュートリアル',
          link: '/jp/tutorial/'
        },
        {
          text: 'Git のインストールと使用',
          link: '/jp/tutorial/git'
        },
        {
          text: 'NodeJS のインストール',
          link: '/jp/tutorial/nodejs'
        },
        {
          text: 'デバッグチュートリアル',
          link: '/jp/tutorial/debug'
        },
        {
          text: 'ソフトウェアのインストールガイド',
          link: '/jp/tutorial/software'
        },
        {
          text: 'その他',
          link: '/jp/tutorial/other'
        }
      ],
      '/jp/recommend/': [
        {
          text: '前書き',
          link: '/jp/recommend/'
        },
        {
          text: '@soybeanjs/cli - スキャフォールディングツール',
          link: '/jp/recommend/soybean-cli'
        },
        {
          text: 'Alova - 次世代リクエストツール',
          link: '/jp/recommend/alova'
        },
        {
          text: 'PageSpy - マルチプラットフォーム対応のリモートデバッグツール',
          link: '/jp/recommend/page-spy'
        },
        {
          text: 'Klona - 深クローンツール',
          link: '/jp/recommend/klona'
        }
      ]
    }
  }
};
