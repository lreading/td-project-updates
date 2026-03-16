<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'solid' | 'dashed'
    align?: 'split' | 'center'
    padding?: string
  }>(),
  {
    variant: 'solid',
    align: 'split',
    padding: '15px 24px',
  },
)
</script>

<template>
  <div
    class="callout-banner"
    :class="[`callout-banner--${variant}`, `callout-banner--${align}`]"
    :style="{ '--callout-banner-padding': padding }"
  >
    <div class="callout-banner__main">
      <slot />
    </div>
    <div v-if="$slots.action" class="callout-banner__action">
      <slot name="action" />
    </div>
  </div>
</template>

<style scoped>
.callout-banner {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: var(--callout-banner-padding);
  border-radius: 8px;
}

.callout-banner--solid {
  background-color: #252535;
  border-top: 1px solid #333344;
}

.callout-banner--dashed {
  background-color: rgba(232, 52, 28, 0.05);
  border: 1px dashed rgba(232, 52, 28, 0.3);
}

.callout-banner--split {
  justify-content: space-between;
}

.callout-banner--center {
  justify-content: center;
  text-align: center;
}

.callout-banner__main {
  min-width: 0;
}

.callout-banner__action {
  flex-shrink: 0;
}

@media (max-width: 959px) {
  .callout-banner--split {
    align-items: flex-start;
    flex-direction: column;
  }

  .callout-banner__action {
    width: 100%;
  }
}
</style>
