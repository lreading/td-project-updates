<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    href?: string
    target?: string
    rel?: string
    interactive?: boolean
    hoverShift?: 'none' | 'x' | 'y'
    accent?: 'none' | 'left' | 'top'
    accentVisibility?: 'always' | 'hover'
    accentSize?: string
    border?: boolean
    radius?: 'md' | 'lg'
    padding?: string
    minHeight?: string
    maxHeight?: string
    background?: string
    hoverBackground?: string
  }>(),
  {
    target: '_blank',
    rel: undefined,
    interactive: false,
    hoverShift: 'none',
    accent: 'none',
    accentVisibility: 'hover',
    accentSize: '3px',
    border: true,
    radius: 'md',
    padding: '20px',
    minHeight: undefined,
    maxHeight: undefined,
    background: '#252535',
    hoverBackground: '#2a2a3e',
  },
)

const tagName = computed(() => (props.href ? 'a' : 'div'))

const componentProps = computed(() =>
  props.href
    ? {
        href: props.href,
        target: props.target,
        rel: props.rel ?? (props.target === '_blank' ? 'noreferrer' : undefined),
      }
    : {},
)

const styleVars = computed(() => ({
  '--surface-card-padding': props.padding,
  '--surface-card-min-height': props.minHeight,
  '--surface-card-max-height': props.maxHeight,
  '--surface-card-background': props.background,
  '--surface-card-hover-background': props.hoverBackground,
  '--surface-card-accent-size': props.accentSize,
}))
</script>

<template>
  <component
    :is="tagName"
    v-bind="componentProps"
    class="surface-card"
    :class="[
      `surface-card--radius-${radius}`,
      `surface-card--accent-${accent}`,
      `surface-card--accent-${accentVisibility}`,
      `surface-card--shift-${hoverShift}`,
      {
        'surface-card--interactive': interactive,
        'surface-card--borderless': !border,
      },
    ]"
    :style="styleVars"
  >
    <slot />
  </component>
</template>

<style scoped>
.surface-card {
  position: relative;
  overflow: hidden;
  background-color: var(--surface-card-background);
  padding: var(--surface-card-padding);
  min-height: var(--surface-card-min-height);
  max-height: var(--surface-card-max-height);
  text-decoration: none;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease;
}

.surface-card--radius-md {
  border-radius: 8px;
}

.surface-card--radius-lg {
  border-radius: 12px;
}

.surface-card:not(.surface-card--borderless) {
  border: 1px solid #333344;
}

.surface-card--accent-left::before,
.surface-card--accent-top::before {
  content: '';
  position: absolute;
  background-color: #e8341c;
  transition: opacity 0.2s ease;
}

.surface-card--accent-left::before {
  top: 0;
  bottom: 0;
  left: 0;
  width: var(--surface-card-accent-size);
}

.surface-card--accent-top::before {
  top: 0;
  right: 0;
  left: 0;
  height: var(--surface-card-accent-size);
}

.surface-card--accent-always::before {
  opacity: 1;
}

.surface-card--accent-hover::before {
  opacity: 0;
}

.surface-card--interactive:hover {
  background-color: var(--surface-card-hover-background);
}

.surface-card--interactive:hover::before {
  opacity: 1;
}

.surface-card--shift-x:hover {
  transform: translateX(5px);
}

.surface-card--shift-y:hover {
  transform: translateY(-5px);
}
</style>
