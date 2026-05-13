<script setup lang="ts">
import { ref } from 'vue';

interface PromoStat {
  value: string;
  label: string;
}

defineProps<{
  eyebrow: string;
  mobileEyebrow: string;
  description: string;
  metaItems: string[];
  tags: string[];
  stats: PromoStat[];
  directLinkLabel: string;
  drawerCloseLabel: string;
  githubText: string;
}>();

const promoDrawerOpen = ref(false);
</script>

<template>
  <div class="soybean-ui-promo">
    <div class="soybean-ui-promo__brand">
      <img class="soybean-ui-promo__logo" src="/logo.svg" alt="SoybeanUI logo" />
      <span class="soybean-ui-promo__eyebrow">{{ eyebrow }}</span>
    </div>
    <strong class="soybean-ui-promo__package">SoybeanUI</strong>
    <p class="soybean-ui-promo__desc">
      {{ description }}
    </p>
    <div class="soybean-ui-promo__footer">
      <div class="soybean-ui-promo__meta">
        <span v-for="item in metaItems" :key="item">{{ item }}</span>
      </div>
      <div class="soybean-ui-promo__actions">
        <a
          class="soybean-ui-promo__action soybean-ui-promo__action--brand"
          href="https://ui.soybeanjs.cn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span class="soybean-ui-promo__action-text">
            <strong>ui.soybeanjs.cn</strong>
          </span>
        </a>
        <a
          class="soybean-ui-promo__action soybean-ui-promo__action--alt"
          href="https://github.com/soybeanjs/soybean-ui"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span class="soybean-ui-promo__action-text">
            <strong>{{ githubText }}</strong>
          </span>
        </a>
      </div>
    </div>
  </div>

  <div class="soybean-ui-promo-mobile">
    <div class="soybean-ui-promo-mobile__card">
      <button class="soybean-ui-promo-mobile__toggle" type="button" @click="promoDrawerOpen = true">
        <img class="soybean-ui-promo-mobile__logo" src="/logo.svg" alt="SoybeanUI logo" />
        <span class="soybean-ui-promo-mobile__eyebrow">{{ mobileEyebrow }}</span>
        <strong class="soybean-ui-promo-mobile__title">SoybeanUI</strong>
      </button>
      <a
        class="soybean-ui-promo-mobile__link"
        href="https://ui.soybeanjs.cn"
        target="_blank"
        rel="noopener noreferrer"
        :aria-label="directLinkLabel"
      >
        ↗
      </a>
    </div>

    <Teleport to="body">
      <Transition name="soybean-ui-promo-drawer">
        <div v-if="promoDrawerOpen" class="soybean-ui-promo-drawer">
          <button
            class="soybean-ui-promo-drawer__backdrop"
            type="button"
            :aria-label="drawerCloseLabel"
            @click="promoDrawerOpen = false"
          ></button>
          <div class="soybean-ui-promo-drawer__panel">
            <button
              class="soybean-ui-promo-drawer__close"
              type="button"
              :aria-label="drawerCloseLabel"
              @click="promoDrawerOpen = false"
            >
              ×
            </button>
            <div class="soybean-ui-promo__brand">
              <img class="soybean-ui-promo__logo" src="/logo.svg" alt="SoybeanUI logo" />
              <span class="soybean-ui-promo__eyebrow">{{ eyebrow }}</span>
              <strong class="soybean-ui-promo__package">SoybeanUI</strong>
            </div>
            <p class="soybean-ui-promo__desc">
              {{ description }}
            </p>
            <div class="soybean-ui-promo-drawer__visual" aria-hidden="true">
              <div class="soybean-ui-promo-drawer__chrome">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div class="soybean-ui-promo-drawer__showcase">
                <span v-for="tag in tags" :key="tag" class="soybean-ui-promo-drawer__tag">{{ tag }}</span>
              </div>
              <div class="soybean-ui-promo-drawer__bars">
                <span class="is-primary"></span>
                <span class="is-secondary"></span>
                <span class="is-muted"></span>
              </div>
              <div class="soybean-ui-promo-drawer__stats">
                <div>
                  <strong>{{ stats[0].value }}</strong>
                  <span>{{ stats[0].label }}</span>
                </div>
                <div>
                  <strong>{{ stats[1].value }}</strong>
                  <span>{{ stats[1].label }}</span>
                </div>
              </div>
            </div>
            <div class="soybean-ui-promo__footer soybean-ui-promo__footer--drawer">
              <div class="soybean-ui-promo__meta">
                <span v-for="item in metaItems" :key="item">{{ item }}</span>
              </div>
              <div class="soybean-ui-promo__actions">
                <a
                  class="soybean-ui-promo__action soybean-ui-promo__action--brand"
                  href="https://ui.soybeanjs.cn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span class="soybean-ui-promo__action-text">
                    <strong>ui.soybeanjs.cn</strong>
                  </span>
                </a>
                <a
                  class="soybean-ui-promo__action soybean-ui-promo__action--alt"
                  href="https://github.com/soybeanjs/soybean-ui"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span class="soybean-ui-promo__action-text">
                    <strong>{{ githubText }}</strong>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
