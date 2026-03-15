<script setup lang="ts">
defineProps<{
  eyebrow: string
  title: string
  subtitle: string
  quote?: string
}>()
</script>

<template>
  <section class="hero-slide">
    <div class="hero-pattern"></div>
    <div class="hero-content">
      <p class="hero-eyebrow">{{ eyebrow }}</p>
      <h1 class="hero-title">{{ title }}</h1>
      <p class="hero-subtitle">{{ subtitle }}</p>
      <p v-if="quote" class="hero-quote">"{{ quote }}"</p>
      <slot />
    </div>
  </section>
</template>

<style scoped>
.hero-slide {
  position: relative;
  display: grid;
  place-items: center;
  min-height: min(80vh, 58rem);
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 1.5rem;
  overflow: hidden;
  background:
    radial-gradient(circle at top right, rgba(232, 52, 28, 0.12), transparent 18rem),
    rgba(18, 24, 36, 0.92);
}

.hero-pattern {
  position: absolute;
  inset: 0;
  opacity: 0.08;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.24) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.24) 1px, transparent 1px);
  background-size: 2.5rem 2.5rem;
}

.hero-content {
  position: relative;
  z-index: 1;
  display: grid;
  gap: 1rem;
  text-align: center;
  max-width: 56rem;
}

.hero-eyebrow {
  margin: 0;
  color: var(--accent-soft);
  font: 600 0.875rem/1.2 var(--font-mono);
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.hero-title {
  margin: 0;
  font-size: clamp(2.5rem, 7vw, 5.5rem);
  line-height: 0.95;
}

.hero-subtitle {
  margin: 0;
  color: var(--muted-text);
  font-size: clamp(1.125rem, 2vw, 1.75rem);
}

.hero-quote {
  margin: 0.5rem 0 0;
  color: var(--muted-text);
  font-style: italic;
}
</style>
