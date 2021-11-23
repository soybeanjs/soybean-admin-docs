import { HeadConfig } from 'vitepress';

const config: HeadConfig[] = [
  ['meta', { name: 'author', content: 'Soybean' }],
  [
    'meta',
    {
      name: 'keywords',
      content: 'soybean, soybean-admin, vite, vue, vue3, soybean-admin docs'
    }
  ],
  ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.png' }],
  [
    'meta',
    {
      name: 'viewport',
      content: 'width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no'
    }
  ],
  ['link', { rel: 'icon', href: '/favicon.ico' }]
];

export default config;
