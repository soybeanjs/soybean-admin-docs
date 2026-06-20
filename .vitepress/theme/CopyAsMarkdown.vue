<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vitepress';
import { useCopyOrDownloadAsMarkdownButtons } from 'vitepress-plugin-llms/vitepress-components';

const route = useRoute();

// 仅为中文文档（/zh/ 下，存在对应的 .md 文件）显示按钮，避免在英文/日文页面点击后 404
const visible = computed(() => route.path.startsWith('/zh/'));

const { aiProviders, copied, copyAsMarkdown, downloadMarkdown, openInAI, viewAsMarkdown } =
  useCopyOrDownloadAsMarkdownButtons();
</script>

<template>
  <div v-if="visible" class="copy-as-markdown">
    <button type="button" class="cam-btn cam-primary" :class="{ 'is-done': copied }" @click="copyAsMarkdown">
      {{ copied ? '已复制' : '复制 Markdown' }}
    </button>
    <button type="button" class="cam-btn" @click="viewAsMarkdown">查看 Markdown</button>
    <button
      v-for="provider in aiProviders"
      :key="provider.name"
      type="button"
      class="cam-btn"
      @click="openInAI(provider)"
    >
      在 {{ provider.name }} 中打开
    </button>
    <button type="button" class="cam-btn" @click="downloadMarkdown">下载</button>
  </div>
</template>

<style scoped>
.copy-as-markdown {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 12px 0 24px;
}

.cam-btn {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  font-size: 13px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  cursor: pointer;
  transition:
    color 0.25s,
    border-color 0.25s,
    background-color 0.25s;
}

.cam-btn:hover {
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
}

.cam-primary {
  color: var(--vp-c-text-1);
  font-weight: 500;
}

.cam-primary.is-done {
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
}
</style>
