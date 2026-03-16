<script setup lang="ts">
import { computed } from 'vue'

type Corner = 'top-right' | 'top-left' | 'bottom-left' | 'bottom-right'

const props = withDefaults(
  defineProps<{
    primaryCorner?: Corner
    secondaryCorner?: Corner
    primaryOpacity?: number
    secondaryOpacity?: number
    primarySize?: string
    secondarySize?: string
    bottomStrip?: boolean
  }>(),
  {
    primaryCorner: 'top-right',
    secondaryCorner: 'bottom-left',
    primaryOpacity: 0.13,
    secondaryOpacity: 0.07,
    primarySize: '16rem',
    secondarySize: '24rem',
    bottomStrip: true,
  },
)

const primaryStyle = computed(() => ({
  '--hero-decor-size': props.primarySize,
  '--hero-decor-opacity': String(props.primaryOpacity),
}))

const secondaryStyle = computed(() => ({
  '--hero-decor-size': props.secondarySize,
  '--hero-decor-opacity': String(props.secondaryOpacity),
}))
</script>

<template>
  <div class="hero-decor__pattern"></div>

  <svg
    class="hero-decor__circle"
    :class="`hero-decor__circle--${primaryCorner}`"
    :style="primaryStyle"
    viewBox="0 0 100 100"
    aria-hidden="true"
  >
    <circle cx="50" cy="50" r="50"></circle>
  </svg>

  <svg
    class="hero-decor__circle"
    :class="`hero-decor__circle--${secondaryCorner}`"
    :style="secondaryStyle"
    viewBox="0 0 100 100"
    aria-hidden="true"
  >
    <circle cx="50" cy="50" r="50"></circle>
  </svg>

  <div v-if="bottomStrip" class="hero-decor__bottom-strip"></div>
</template>

<style scoped>
.hero-decor__pattern {
  position: absolute;
  inset: 0;
  z-index: 0;
  opacity: 0.05;
  background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm1 1h38v38H1V1z' fill='%23ffffff' fill-rule='evenodd'/%3E%3C/svg%3E");
}

.hero-decor__circle {
  position: absolute;
  fill: #ffffff;
  width: var(--hero-decor-size);
  height: var(--hero-decor-size);
  opacity: var(--hero-decor-opacity);
  pointer-events: none;
}

.hero-decor__circle--top-right {
  top: 0;
  right: 0;
  transform: translate(33.333333%, -33.333333%);
}

.hero-decor__circle--top-left {
  top: 0;
  left: 0;
  transform: translate(-25%, -25%);
}

.hero-decor__circle--bottom-left {
  bottom: 0;
  left: 0;
  transform: translate(-33.333333%, 33.333333%);
}

.hero-decor__circle--bottom-right {
  right: 0;
  bottom: 0;
  transform: translate(33.333333%, 33.333333%);
}

.hero-decor__bottom-strip {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 0.25rem;
  background-color: #e8341c;
}
</style>
