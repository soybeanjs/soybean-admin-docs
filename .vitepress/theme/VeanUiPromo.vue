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
  <div class="vean-ui-promo">
    <div class="vean-ui-promo__brand">
      <img class="vean-ui-promo__logo" src="/vean-ui-logo.svg" alt="VeanUI logo" />
      <span class="vean-ui-promo__eyebrow">{{ eyebrow }}</span>
    </div>
    <strong class="vean-ui-promo__package">VeanUI</strong>
    <p class="vean-ui-promo__desc">
      {{ description }}
    </p>
    <div class="vean-ui-promo__footer">
      <div class="vean-ui-promo__meta">
        <span v-for="item in metaItems" :key="item">{{ item }}</span>
      </div>
      <div class="vean-ui-promo__actions">
        <a
          class="vean-ui-promo__action vean-ui-promo__action--brand"
          href="https://veanui.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span class="vean-ui-promo__action-text">
            <strong>veanui.com</strong>
          </span>
        </a>
        <a
          class="vean-ui-promo__action vean-ui-promo__action--alt"
          href="https://github.com/soybeanjs/vean-ui"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span class="vean-ui-promo__action-text">
            <strong>{{ githubText }}</strong>
          </span>
        </a>
      </div>
    </div>
  </div>

  <div class="vean-ui-promo-mobile">
    <div class="vean-ui-promo-mobile__card">
      <button class="vean-ui-promo-mobile__toggle" type="button" @click="promoDrawerOpen = true">
        <img class="vean-ui-promo-mobile__logo" src="/vean-ui-logo.svg" alt="VeanUI logo" />
        <span class="vean-ui-promo-mobile__eyebrow">{{ mobileEyebrow }}</span>
        <strong class="vean-ui-promo-mobile__title">VeanUI</strong>
      </button>
      <a
        class="vean-ui-promo-mobile__link"
        href="https://veanui.com"
        target="_blank"
        rel="noopener noreferrer"
        :aria-label="directLinkLabel"
      >
        ↗
      </a>
    </div>

    <Teleport to="body">
      <Transition name="vean-ui-promo-drawer">
        <div v-if="promoDrawerOpen" class="vean-ui-promo-drawer">
          <button
            class="vean-ui-promo-drawer__backdrop"
            type="button"
            :aria-label="drawerCloseLabel"
            @click="promoDrawerOpen = false"
          ></button>
          <div class="vean-ui-promo-drawer__panel">
            <button
              class="vean-ui-promo-drawer__close"
              type="button"
              :aria-label="drawerCloseLabel"
              @click="promoDrawerOpen = false"
            >
              ×
            </button>
            <div class="vean-ui-promo__brand">
              <img class="vean-ui-promo__logo" src="/vean-ui-logo.svg" alt="VeanUI logo" />
              <span class="vean-ui-promo__eyebrow">{{ eyebrow }}</span>
              <strong class="vean-ui-promo__package">VeanUI</strong>
            </div>
            <p class="vean-ui-promo__desc">
              {{ description }}
            </p>
            <div class="vean-ui-promo-drawer__visual" aria-hidden="true">
              <div class="vean-ui-promo-drawer__chrome">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div class="vean-ui-promo-drawer__showcase">
                <span v-for="tag in tags" :key="tag" class="vean-ui-promo-drawer__tag">{{ tag }}</span>
              </div>
              <div class="vean-ui-promo-drawer__bars">
                <span class="is-primary"></span>
                <span class="is-secondary"></span>
                <span class="is-muted"></span>
              </div>
              <div class="vean-ui-promo-drawer__stats">
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
            <div class="vean-ui-promo__footer vean-ui-promo__footer--drawer">
              <div class="vean-ui-promo__meta">
                <span v-for="item in metaItems" :key="item">{{ item }}</span>
              </div>
              <div class="vean-ui-promo__actions">
                <a
                  class="vean-ui-promo__action vean-ui-promo__action--brand"
                  href="https://veanui.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span class="vean-ui-promo__action-text">
                    <strong>veanui.com</strong>
                  </span>
                </a>
                <a
                  class="vean-ui-promo__action vean-ui-promo__action--alt"
                  href="https://github.com/soybeanjs/vean-ui"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span class="vean-ui-promo__action-text">
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
