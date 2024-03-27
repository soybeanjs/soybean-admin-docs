# 系统加载

![](../../../assets/loading01.png)

## 样式

- 系统初始化时的加载样式通过html代码方式实现

  ::: tip 组件位置
  src/plugins/loading.ts
  :::

- 系统的 Logo 使用 SystemLogo 组件实现

  [系统Logo](./logo.md)

## 渲染原理

创建 setupLoading 函数, 它的主要功能是设置页面加载时的动画效果。
这个加载动画包括一个系统Logo、旋转的点阵动画和标题文字，并且所有元素的颜色均基于从本地存储获取的主题色 themeColor 动态生成。
并且在DOM中查找ID为app的元素作为加载动画的挂载点, 如果找到了这个元素，则将其内部HTML替换为刚刚构建的加载动画HTML结构

```ts
export function setupLoading() {
  const themeColor = localStg.get('themeColor') || '#DB5A6B';

  const { r, g, b } = getRgbOfColor(themeColor);

  const primaryColor = `--primary-color: ${r} ${g} ${b}`;

  const loadingClasses = [
    'left-0 top-0',
    'left-0 bottom-0 animate-delay-500',
    'right-0 top-0 animate-delay-1000',
    'right-0 bottom-0 animate-delay-1500'
  ];

  const logoWithClass = systemLogo.replace('<svg', `<svg class="size-128px text-primary"`);

  const dot = loadingClasses
    .map(item => {
      return `<div class="absolute w-16px h-16px bg-primary rounded-8px animate-pulse ${item}"></div>`;
    })
    .join('\n');

  const loading = `
<div class="fixed-center flex-col" style="${primaryColor}">
  ${logoWithClass}
  <div class="w-56px h-56px my-36px">
    <div class="relative h-full animate-spin">
      ${dot}
    </div>
  </div>
  <h2 class="text-28px font-500 text-#646464">${$t('system.title')}</h2>
</div>`;

  const app = document.getElementById('app');

  if (app) {
    app.innerHTML = loading;
  }
}

```

::: tip 代码位置
src/plugins/loading.ts
:::

最后要将 setupLoading 函数注册到 main.ts 中

```typescript
async function setupApp() {
  setupLoading();
  app.mount('#app');
}
```
