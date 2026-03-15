<script setup lang="ts">
import { computed } from 'vue'

import { contentRepository } from '../content/ContentRepository'

const site = contentRepository.getSiteContent()
const presentations = contentRepository.listPresentations()

const featuredPresentation = computed(() => presentations.find((entry) => entry.featured) ?? presentations[0])
</script>

<template>
  <main class="page page--centered">
    <section class="hero-card">
      <p class="eyebrow">{{ site.eyebrow }}</p>
      <h1 class="hero-title">{{ site.title }}</h1>
      <p class="hero-subtitle">{{ featuredPresentation.title }}</p>
      <p class="hero-copy">{{ site.home_intro }}</p>

      <div class="hero-actions">
        <RouterLink
          :to="{ name: 'presentation', params: { presentationId: featuredPresentation.id } }"
          class="button button--primary"
        >
          {{ site.home_cta_label }}
        </RouterLink>
        <RouterLink :to="{ name: 'archive' }" class="button button--secondary">
          {{ site.archive_cta_label }}
        </RouterLink>
      </div>

      <div class="hero-links">
        <a
          v-for="link in Object.values(site.links)"
          :key="link.url"
          :href="link.url"
          target="_blank"
          rel="noreferrer"
          class="hero-link"
        >
          {{ link.label }}
        </a>
      </div>
    </section>
  </main>
</template>

<style scoped>
.hero-card {
  display: grid;
  gap: 1rem;
  width: min(100%, 64rem);
  padding: clamp(1.5rem, 4vw, 3rem);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 1.5rem;
  background:
    radial-gradient(circle at top right, rgba(232, 52, 28, 0.14), transparent 18rem),
    rgba(18, 24, 36, 0.92);
  text-align: center;
}

.eyebrow,
.hero-subtitle,
.hero-copy {
  margin: 0;
}

.eyebrow {
  color: var(--accent-soft);
  font: 600 0.875rem/1.2 var(--font-mono);
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.hero-title {
  margin: 0;
  font-size: clamp(2.5rem, 8vw, 5rem);
  line-height: 0.95;
}

.hero-subtitle,
.hero-copy {
  color: var(--secondary-text);
}

.hero-actions,
.hero-links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
}

.hero-link {
  color: var(--secondary-text);
}
</style>
