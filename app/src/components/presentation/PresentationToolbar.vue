<script setup lang="ts">
defineProps<{
  isPresentationMode: boolean
  isFullscreenAvailable: boolean
  isFullscreenActive: boolean
  slideNumber: number
  slideTotal: number
}>()

defineEmits<{
  first: []
  previous: []
  next: []
  last: []
  toggleMode: []
  toggleFullscreen: []
}>()
</script>

<template>
  <div class="toolbar">
    <div class="toolbar-group">
      <button type="button" class="toolbar-button" @click="$emit('first')">First</button>
      <button type="button" class="toolbar-button" @click="$emit('previous')">Previous</button>
      <button type="button" class="toolbar-button" @click="$emit('next')">Next</button>
      <button type="button" class="toolbar-button" @click="$emit('last')">Last</button>
    </div>

    <div class="toolbar-group toolbar-group--meta">
      <span class="toolbar-counter">{{ slideNumber }} / {{ slideTotal }}</span>
      <button type="button" class="toolbar-button" @click="$emit('toggleMode')">
        {{ isPresentationMode ? 'Exit presentation' : 'Presentation mode' }}
      </button>
      <button
        v-if="isFullscreenAvailable"
        type="button"
        class="toolbar-button"
        @click="$emit('toggleFullscreen')"
      >
        {{ isFullscreenActive ? 'Exit fullscreen' : 'Fullscreen' }}
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
}

.toolbar-group--meta {
  align-items: center;
}

.toolbar-button {
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 999px;
  background-color: rgba(28, 35, 51, 0.84);
  color: var(--primary-text);
  padding: 0.7rem 1rem;
  cursor: pointer;
}

.toolbar-button:hover {
  border-color: rgba(232, 52, 28, 0.5);
  background-color: rgba(232, 52, 28, 0.12);
}

.toolbar-counter {
  color: var(--muted-text);
  font: 500 0.95rem/1 var(--font-mono);
}
</style>
