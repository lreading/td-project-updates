<script setup lang="ts">
import { computed } from 'vue'

import mascotUrl from '../assets/mascot.png'
import ActionButton from '../components/ui/ActionButton.vue'
import ProjectBadgePill from '../components/ui/ProjectBadgePill.vue'
import SiteFooterLinks from '../components/ui/SiteFooterLinks.vue'
import { getProjectBadgeDisplay } from '../content/projectBadge'
import { contentRepository } from '../content/ContentRepository'

const site = contentRepository.getSiteContent()
const presentations = contentRepository.listPresentations()

const featuredPresentation = computed(() => presentations.find((entry) => entry.featured) ?? presentations[0])
const badge = computed(() => getProjectBadgeDisplay(site))
</script>

<template>
  <main class="home-page">
    <div class="bg-pattern"></div>

    <svg class="decor-circle decor-circle--top-right" viewBox="0 0 100 100" aria-hidden="true">
      <circle cx="50" cy="50" r="50"></circle>
    </svg>
    <svg class="decor-circle decor-circle--bottom-left" viewBox="0 0 100 100" aria-hidden="true">
      <circle cx="50" cy="50" r="50"></circle>
    </svg>

    <div class="hero-shell">
      <ProjectBadgePill v-if="badge" :badge="badge" class="hero-badge" />

      <div class="hero-actions">
        <ActionButton
          :to="{ name: 'presentation', params: { presentationId: featuredPresentation.id } }"
          class="hero-cta"
        >
          <span class="hero-cta__single">{{ site.home_cta_label }}</span>
        </ActionButton>
        <ActionButton :to="{ name: 'presentations' }" variant="secondary" class="hero-cta">
          <span class="hero-cta__single">{{ site.presentations_cta_label }}</span>
        </ActionButton>
      </div>

      <div class="mascot-wrap">
        <img :src="mascotUrl" alt="Cupcake Mascot" class="mascot-glow mascot" />
      </div>

      <div class="hero-copy">
        <h1 class="hero-title">OWASP <span class="accent-text">Threat Dragon</span></h1>
        <div class="divider-wrap">
          <div class="divider"></div>
        </div>
        <h2 class="hero-subtitle">
          Community Updates
        </h2>
        <p class="hero-description">
          roadmap, releases, community and more
        </p>
      </div>
    </div>

    <div class="footer-wrap">
      <SiteFooterLinks :site="site" />
    </div>

    <div class="bottom-strip"></div>
  </main>
</template>

<style scoped>
.home-page {
  width: 100%;
  min-height: 100%;
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: #1e1e2e;
  color: #ffffff;
  padding: 2.5rem var(--page-gutter) 3.5rem;
}

.bg-pattern {
  position: absolute;
  inset: 0;
  z-index: 0;
  opacity: 0.05;
  background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm1 1h38v38H1V1z' fill='%23ffffff' fill-rule='evenodd'/%3E%3C/svg%3E");
}

.decor-circle {
  position: absolute;
  fill: #ffffff;
  pointer-events: none;
}

.decor-circle--top-right {
  top: 0;
  right: 0;
  width: 16rem;
  height: 16rem;
  opacity: 0.5;
  transform: translate(33.333333%, -33.333333%);
}

.decor-circle--bottom-left {
  bottom: 0;
  left: 0;
  width: 24rem;
  height: 24rem;
  opacity: 0.3;
  transform: translate(-33.333333%, 33.333333%);
}

.hero-shell {
  position: relative;
  z-index: 1;
  width: min(100%, 70rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  text-align: center;
}

.hero-badge {
  margin-bottom: 1rem;
}

.mascot-wrap {
  position: relative;
}

.mascot {
  width: clamp(9rem, 18vw, 12rem);
  height: clamp(9rem, 18vw, 12rem);
  object-fit: contain;
}

.mascot-glow {
  filter: drop-shadow(0 0 20px rgba(232, 52, 28, 0.4));
  animation: float 6s ease-in-out infinite;
}

.hero-copy {
  display: grid;
  gap: 0.75rem;
}

.hero-title {
  margin: 0;
  font-size: clamp(3.5rem, 8vw, 5.8rem);
  line-height: 0.95;
  font-weight: 700;
  letter-spacing: -0.03em;
}

.accent-text {
  color: #e8341c;
}

.divider-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.6rem 0 0.8rem;
}

.divider {
  width: 6rem;
  height: 0.25rem;
  border-radius: 9999px;
  background-color: #e8341c;
}

.hero-subtitle {
  margin: 0;
  font-size: clamp(1.55rem, 3vw, 2.35rem);
  line-height: 1.2;
  font-weight: 300;
  color: #d0d0e8;
}

.hero-subtitle-strong {
  color: #ffffff;
  font-weight: 600;
}

.hero-description {
  max-width: 44rem;
  padding-top: 0.5rem;
  padding-bottom: 1.5rem;
  margin: 0 auto;
  font-size: clamp(1rem, 1.8vw, 1.2rem);
  line-height: 1.7;
  color: #9ca3af;
}

@keyframes float {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: stretch;
  gap: 1rem;
}

.hero-cta {
  flex: 0 0 13.5rem;
  min-width: 13rem;
  min-height: 3.8rem;
}

.hero-cta__single {
  display: block;
  font-size: 1.05rem;
  line-height: 1.1;
  font-weight: 500;
}

.footer-wrap {
  position: absolute;
  right: 0;
  bottom: 2rem;
  left: 0;
  z-index: 1;
}

.bottom-strip {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 0.25rem;
  background-color: #e8341c;
}

@media (max-width: 767px) {
  .home-page {
    justify-content: flex-start;
    padding-top: 3rem;
  }

  .hero-shell {
    gap: 1.5rem;
  }

  .hero-actions {
    width: 100%;
    flex-direction: column;
  }

  .hero-cta {
    width: 100%;
  }

  .footer-wrap {
    position: relative;
    bottom: auto;
    margin-top: 2.5rem;
  }

  :deep(.site-footer-links) {
    flex-direction: column;
    gap: 0.75rem;
    text-align: center;
  }

  :deep(.site-footer-links__separator) {
    display: none;
  }
}
</style>
