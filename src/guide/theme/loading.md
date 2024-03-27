# System Loading

![](../../assets/loading01.png)

## Style

- The loading style during system initialization is implemented through HTML code

  ::: tip Component location
  src/plugins/loading.ts
  :::

- The system's Logo is implemented using the SystemLogo component

  [System Logo](./logo.md)

## Rendering Principle

Create a setupLoading function, its main function is to set the animation effect when the page is loading.
This loading animation includes a system Logo, a rotating dot matrix animation, and title text, and all element colors are dynamically generated based on the theme color themeColor obtained from local storage.
And find the element with ID 'app' in the DOM as the mounting point for the loading animation. If this element is found, its internal HTML will be replaced with the just constructed loading animation HTML structure

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

::: tip Code location
src/plugins/loading.ts
:::

Finally, the setupLoading function needs to be registered in main.ts

```typescript
async function setupApp() {
  setupLoading();
  app.mount('#app');
}
