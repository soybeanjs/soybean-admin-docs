# システムロード

![](../../../assets/loading01.png)

## 样式

- システム初期化時のロードスタイルはHTMLコードで実装されています

  ::: tip 组件位置
  src/plugins/loading.ts
  :::

- システムのロゴは SystemLogo コンポーネントで実現されています。

  [系统Logo](./logo.md)

## 描画原理

setupLoading 関数を作成し、その主な機能はページ読み込み時のアニメーション効果を設定することです。このロードアニメーションには、システムロゴ、回転するドットアニメーション、そしてタイトル文字が含まれます。すべての要素の色は、ローカルストレージから取得したテーマカラー themeColor を基に動的に生成されます。さらに、DOM内でIDが app の要素を探し、見つかった場合はその内部HTMLを先程構築したロードアニメーションのHTML構造に置き換えます。

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

::: tip コードの位置
src/plugins/loading.ts
:::

最後に setupLoading 関数を main.ts に登録します。

```typescript
async function setupApp() {
  setupLoading();
  app.mount('#app');
}
```
