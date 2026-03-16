<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    width?: string
    opacity?: number
    padding?: string
  }>(),
  {
    width: '6rem',
    opacity: 1,
    padding: '0.6rem 0 0.8rem',
  },
)

const dividerStyle = computed(() => ({
  '--accent-divider-width': props.width,
  '--accent-divider-opacity': String(props.opacity),
  '--accent-divider-padding': props.padding,
}))
</script>

<template>
  <div class="accent-divider" :style="dividerStyle">
    <div class="accent-divider__line"></div>
  </div>
</template>

<style scoped>
.accent-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--accent-divider-padding);
}

.accent-divider__line {
  width: var(--accent-divider-width);
  height: 0.25rem;
  border-radius: 9999px;
  background-color: #e8341c;
  opacity: var(--accent-divider-opacity);
}
</style>
