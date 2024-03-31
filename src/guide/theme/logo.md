# Introduction

System Logo is implemented using the SystemLogo component, which is an SFC component that can be styled through props.

```vue
<script lang="ts" setup>
defineOptions({ name: 'SystemLogo' });
</script>

<template>
  <icon-local-logo />
</template>

<style scoped></style>
```
::: tip Code location
src/components/common/system-logo.vue
:::

> The specific implementation principle refers to [Local Icon](/guide/icon/intro)
