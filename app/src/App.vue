<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { RouterView, useRoute } from 'vue-router'

import AppFooter from './components/AppFooter.vue'
import AppNav from './components/AppNav.vue'

const route = useRoute()
const fullscreenActive = ref(false)

const syncFullscreenState = (): void => {
  fullscreenActive.value = Boolean(document.fullscreenElement)
}

const showChrome = computed(
  () => !(route.name === 'presentation' && fullscreenActive.value),
)

onMounted(() => {
  syncFullscreenState()
  document.addEventListener('fullscreenchange', syncFullscreenState)
})

onUnmounted(() => {
  document.removeEventListener('fullscreenchange', syncFullscreenState)
})
</script>

<template>
  <div class="app-shell">
    <AppNav v-if="showChrome" />
    <div class="app-shell__view" :class="{ 'app-shell__view--nav-hidden': !showChrome }">
      <RouterView />
    </div>
    <AppFooter v-if="showChrome" />
  </div>
</template>

<style scoped>
.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-shell__view {
  flex: 1;
  min-height: 0;
}

.app-shell__view--nav-hidden {
  flex: 1;
  min-height: 0;
}
</style>
