import { UserConfig } from 'vitepress';
import { headConfig } from './configs';

const config: UserConfig = {
  title: 'Soybean Admin',
  lang: 'zh-CN',
  description: '一个漂亮清新的中后台模版',
  head: headConfig
};

export default config;
