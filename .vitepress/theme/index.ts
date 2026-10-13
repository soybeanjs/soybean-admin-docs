import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import CopyAsMarkdown from './CopyAsMarkdown.vue';
import CustomLayout from './CustomLayout.vue';
import './style.css';

export default {
  extends: DefaultTheme,
  Layout: CustomLayout,
  enhanceApp({ app }) {
    // 注册 markdown-it 自动插入的按钮组件（内部按语言控制是否显示）
    app.component('CopyOrDownloadAsMarkdownButtons', CopyAsMarkdown);
  }
} satisfies Theme;
