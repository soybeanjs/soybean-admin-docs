# 配置

用于修改项目的配色、布局、缓存等

## 项目配置

项目配置包含主题配置、导航配置、全局头部、底部的高度、多页签、面包屑和页面的相关配置。

默认的配置在 src/settings/theme.json里面，只要在开发时通过项目配置抽屉更改设置，然后拷贝设置，在将拷贝的设置覆盖theme.json就能成为默认的配置了。

### 主题配置

```typescript
{
  /** 深色模式 */
  darkMode: boolean;
  /** 主题颜色 */
  themeColor: string;
  /** 主题颜色列表 */
  themeColorList: string[];
  /** 其他颜色 */
  otherColor: {
    /** 信息 */
  	info: string;
	  /** 成功 */
  	success: string;
	  /** 警告 */
  	warning: string;
	  /** 错误 */
  	error: string;
  };
}
```

主题相关的配置都会通过 themeStore 状态组合成 符合 naiveUI框架的NConfigProvider组件的themeOverrids;

#### themeStore的 themeOverrids

通过 themeColor, info, success, warning, error五种颜色，'' | 'Suppl' | 'Hover' | 'Pressed' | 'Active'五种颜色场景， 在函数 **getThemeColors**的作用下产生了 25种不同的颜色注入到了NConfigProvider组件的themeOverrids

#### AppProvider

AppProvider组件里面通过添加NElement组件可以获取到naiveUI框架生成的各种css vars，那么在NElement组件里面的子元素都能获取到css vars.

```vue
<template>
  <n-config-provider
    class="h-full"
    :locale="zhCN"
    :date-locale="dateZhCN"
    :theme="naiveTheme"
    :theme-overrides="theme.themeOverrids"
  >
    <n-element class="h-full">
      <naive-provider>
        <slot></slot>
      </naive-provider>
    </n-element>
  </n-config-provider>
</template>
```

#### 结合windicss

在windicss配置里面添加extends colors, 各个css vars就是NElement组件上的css vars，在vue里面就能通过windicss使用各种颜色在不同场景上。

例如： 下面的class里面就应用了不同的颜色

```css
class="border border-primary bg-success text-error"
```

```typescript
colors: {
	primary: 'var(--primary-color)',
	'primary-hover': 'var(--primary-color-hover)',
	'primary-pressed': 'var(--primary-color-pressed)',
	'primary-active': 'var(--primary-color-active)',
	info: 'var(--info-color)',
	'info-hover': 'var(--info-color-hover)',
	'info-pressed': 'var(--info-color-pressed)',
	'info-active': 'var(--info-color-active)',
	success: 'var(--success-color)',
	'success-hover': 'var(--success-color-hover)',
	'success-pressed': 'var(--success-color-pressed)',
	'success-active': 'var(--success-color-active)',
	warning: 'var(--warning-color)',
	'warning-hover': 'var(--warning-color-hover)',
	'warning-pressed': 'var(--warning-color-pressed)',
	'warning-active': 'var(--warning-color-active)',
	error: 'var(--error-color)',
	'error-hover': 'var(--error-color-hover)',
	'error-pressed': 'var(--error-color-pressed)',
	'error-active': 'var(--error-color-active)',
},
```

