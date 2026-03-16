<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary'
    to?: unknown
    href?: string
    target?: string
    rel?: string
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
    block?: boolean
  }>(),
  {
    variant: 'primary',
    target: '_self',
    rel: undefined,
    type: 'button',
    disabled: false,
    block: false,
  },
)

const tagName = computed(() => {
  if (props.to) {
    return 'RouterLink'
  }

  if (props.href) {
    return 'a'
  }

  return 'button'
})

const componentProps = computed(() => {
  if (props.to) {
    return { to: props.to }
  }

  if (props.href) {
    return {
      href: props.href,
      target: props.target,
      rel: props.rel ?? (props.target === '_blank' ? 'noreferrer' : undefined),
    }
  }

  return {
    type: props.type,
    disabled: props.disabled,
  }
})
</script>

<template>
  <component
    :is="tagName"
    v-bind="componentProps"
    class="action-button"
    :class="[
      `action-button--${variant}`,
      { 'action-button--block': block, 'action-button--disabled': disabled && !to && !href },
    ]"
  >
    <slot />
  </component>
</template>

<style scoped>
.action-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  min-height: 3rem;
  padding: 0.85rem 1.35rem;
  border-radius: 999px;
  border: 1px solid transparent;
  text-align: center;
  text-decoration: none;
  font-weight: 500;
  cursor: pointer;
  transition:
    border-color 160ms ease,
    background 160ms ease,
    background-color 160ms ease,
    box-shadow 160ms ease,
    color 160ms ease,
    transform 160ms ease;
}

.action-button:hover {
  transform: translateY(-1px);
}

.action-button:focus-visible {
  outline: 2px solid rgba(232, 52, 28, 0.6);
  outline-offset: 2px;
}

.action-button--block {
  width: 100%;
}

.action-button--disabled {
  opacity: 0.6;
  cursor: not-allowed;
  pointer-events: none;
}

.action-button--primary {
  border-color: rgba(255, 133, 108, 0.65);
  background: linear-gradient(180deg, #f04d32 0%, #e8341c 100%);
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.04) inset,
    0 10px 24px rgba(232, 52, 28, 0.28);
  color: #fff7f3;
}

.action-button--primary:hover {
  border-color: rgba(255, 160, 138, 0.75);
  background: linear-gradient(180deg, #f45d44 0%, #ea3c22 100%);
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.06) inset,
    0 14px 30px rgba(232, 52, 28, 0.34);
}

.action-button--secondary {
  border-color: rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.08);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.04),
    0 10px 24px rgba(5, 8, 15, 0.16);
  color: var(--primary-text);
}

.action-button--secondary:hover {
  border-color: rgba(255, 255, 255, 0.18);
  background: rgba(255, 255, 255, 0.12);
}
</style>
