<script setup>
import DefaultTheme from 'vitepress/theme'
import NoticeBar from './NoticeBar.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #layout-top>
      <NoticeBar />
    </template>
  </Layout>
</template>
