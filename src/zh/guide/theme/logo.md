# 概述

系统Logo 由组件 `SystemLogo` 来实现，它是一个 `SFC` 组件，可以通过 `props` 来设置它的样式。

```vue
<script lang="ts" setup>
defineOptions({ name: 'SystemLogo' });
</script>

<template>
  <icon-local-logo />
</template>

<style scoped></style>
```
::: tip 代码位置
src/components/common/system-logo.vue
:::

> 具体实现原理参考 [本地Icon](/zh/guide/icon/intro)
