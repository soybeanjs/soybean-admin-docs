import DefaultTheme from 'vitepress/theme';
import CustomLayout from './CustomLayout.vue';
import './style.css';

export default {
  extends: DefaultTheme,
  Layout: CustomLayout
};
