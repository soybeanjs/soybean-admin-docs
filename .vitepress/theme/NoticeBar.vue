<template>
  <div v-if="notice" class="notice-bar">
    <div class="notice-content">
      <span class="notice-text">{{ notice.text }}</span>
      <a
        href="https://www.bilibili.com/video/BV1YKdRYXELC"
        target="_blank"
        class="notice-link"
      >
        {{ notice.linkText }}
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch, ref, onMounted } from 'vue'
import { useData } from 'vitepress'

const { lang, site } = useData()

interface NoticeData {
  text: string;
  linkText: string;
}

const notice = ref<NoticeData | null>(null)

function updateNotice(langValue: string) {
  if (langValue === 'en') {
    notice.value = {
      text: '🎉 The video tutorial has been released and is gradually being updated',
      linkText: 'Click to view →'
    }
    return
  }
  const localeConfig = site.value.locales[langValue]
  notice.value = localeConfig?.notice || null
}

onMounted(() => {
  updateNotice(lang.value)
})

watch(lang, updateNotice)
</script>

<style scoped>
.notice-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  height: 40px;
  min-height: 40px;
}

.notice-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.notice-text {
  font-weight: 500;
}

.notice-link {
  color: #ffd700;
  text-decoration: none;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 4px;
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.notice-link:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
  text-decoration: none;
}

.close-btn {
  position: absolute;
  right: 16px;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 4px;
  border-radius: 2px;
  opacity: 0.8;
  transition: opacity 0.3s ease;
}

.close-btn:hover {
  opacity: 1;
  background: rgba(255, 255, 255, 0.1);
}

@media (max-width: 768px) {
  .notice-bar {
    padding: 6px 12px;
    font-size: 13px;
    height: 35px;
    min-height: 35px;
  }

  .notice-content {
    gap: 8px;
  }

  .close-btn {
    right: 12px;
  }
}
</style>
