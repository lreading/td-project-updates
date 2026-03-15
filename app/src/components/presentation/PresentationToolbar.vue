<script setup lang="ts">
defineProps<{
  slideNumber: number
  slideTotal: number
}>()

defineEmits<{
  previous: []
  next: []
  toggleMode: []
}>()
</script>

<template>
  <div class="toolbar">
    <div class="toolbar-group toolbar-group--nav" aria-label="Slide navigation">
      <button
        type="button"
        class="toolbar-icon-button"
        aria-label="Previous slide"
        title="Previous slide"
        @click="$emit('previous')"
      >
        <FontAwesomeIcon :icon="['fas', 'arrow-left']" />
      </button>

      <span class="toolbar-counter">{{ slideNumber }} / {{ slideTotal }}</span>

      <button
        type="button"
        class="toolbar-icon-button"
        aria-label="Next slide"
        title="Next slide"
        @click="$emit('next')"
      >
        <FontAwesomeIcon :icon="['fas', 'arrow-right']" />
      </button>
    </div>

    <div class="toolbar-group toolbar-group--meta">
      <button type="button" class="toolbar-mode-button" @click="$emit('toggleMode')">
        Presentation mode
      </button>
    </div>
  </div>
</template>

<style scoped>
.toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
  justify-content: space-between;
}

.toolbar-group {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
}

.toolbar-group--nav {
  gap: 0.5rem;
}

.toolbar-icon-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 999px;
  background-color: rgba(28, 35, 51, 0.34);
  color: var(--primary-text);
  cursor: pointer;
  transition:
    border-color 160ms ease,
    background-color 160ms ease,
    color 160ms ease,
    transform 160ms ease;
}

.toolbar-icon-button:hover {
  transform: translateY(-1px);
  border-color: rgba(232, 52, 28, 0.56);
  background-color: rgba(232, 52, 28, 0.14);
  color: var(--brand);
}

.toolbar-icon-button:focus-visible,
.toolbar-mode-button:focus-visible {
  outline: 2px solid rgba(232, 52, 28, 0.6);
  outline-offset: 2px;
}

.toolbar-counter {
  color: var(--muted-text);
  font: 500 0.95rem/1 var(--font-mono);
  min-width: 4.5rem;
  text-align: center;
}

.toolbar-mode-button {
  border: 1px solid rgba(255, 133, 108, 0.65);
  border-radius: 999px;
  background: linear-gradient(180deg, #f04d32 0%, #e8341c 100%);
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.04) inset,
    0 10px 24px rgba(232, 52, 28, 0.28);
  color: #fff7f3;
  padding: 0.85rem 1.35rem;
  font-weight: 500;
  cursor: pointer;
  transition:
    border-color 160ms ease,
    background-color 160ms ease,
    box-shadow 160ms ease,
    transform 160ms ease;
}

.toolbar-mode-button:hover {
  transform: translateY(-1px);
  border-color: rgba(255, 160, 138, 0.75);
  background: linear-gradient(180deg, #f45d44 0%, #ea3c22 100%);
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.06) inset,
    0 14px 30px rgba(232, 52, 28, 0.34);
}

@media (max-width: 640px) {
  .toolbar {
    justify-content: center;
  }

  .toolbar-group--meta {
    width: 100%;
    justify-content: center;
  }
}
</style>
