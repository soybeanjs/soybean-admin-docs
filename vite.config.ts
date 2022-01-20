import { defineConfig } from 'vite';
import path from 'path';
import Icons from 'unplugin-icons/vite'; // iconify图标
import IconsResolver from 'unplugin-icons/resolver';
import Components from 'unplugin-vue-components/vite'; // 从指定目录自动导入组件
import windiCSS from 'vite-plugin-windicss';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './.vitepress/theme')
    }
  },
  plugins: [
    Components({
      resolvers: [IconsResolver({ componentPrefix: 'icon' })]
    }),
    Icons(),
    windiCSS()
  ],
  server: {
    fs: {
      strict: false
    },
    host: '0.0.0.0',
    port: 3210,
    open: true
  }
});
