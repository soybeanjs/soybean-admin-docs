# 概要

システムロゴは `SystemLogo` コンポーネントによって実装されており、これは `SFC` コンポーネントです。`props` を使用してスタイルを設定できます。

```vue
<script lang="ts" setup>
defineOptions({ name: 'SystemLogo' });
</script>

<template>
  <icon-local-logo />
</template>

<style scoped></style>
```

::: tip コードの位置
src/components/common/system-logo.vue
:::

> 詳しい実装原理については [本地Icon](/zh/guide/icon/intro) を参照してください。
