<script setup lang="ts">
import mascotUrl from '../../assets/mascot.png'
import AccentDivider from '../ui/AccentDivider.vue'
import FloatingMascot from '../ui/FloatingMascot.vue'
import HeroDecor from '../ui/HeroDecor.vue'

import type {
  GeneratedPresentationData,
  PresentationDeck,
  SiteContent,
  ThankYouSlide,
} from '../../types/content'

defineProps<{
  deck: PresentationDeck
  generated: GeneratedPresentationData
  site: SiteContent
  slide: ThankYouSlide
}>()
</script>

<template>
  <div class="slide-container">
    <HeroDecor
      primary-corner="top-left"
      secondary-corner="bottom-right"
      :primary-opacity="0.13"
      :secondary-opacity="0.05"
    />

    <div class="content-wrap">
      <div class="relative group mascot-wrap">
        <FloatingMascot
          :src="mascotUrl"
          alt="Cupcake Mascot"
          size="clamp(150px, 20vw, 200px)"
          :glow-opacity="0.5"
        />
      </div>

      <div class="text-block">
        <h1 class="hero-title">Thank <span class="accent-text">You!</span></h1>
        <AccentDivider width="4rem" :opacity="0.8" padding="0.5rem 0" />
        <h2 class="hero-subtitle">See you next quarter 🐉</h2>
      </div>

      <div class="actions">
        <a :href="site.links.repository.url" target="_blank" rel="noreferrer" class="pill-btn">
          <i class="fab fa-github pill-icon"></i>
          <div class="pill-copy">
            <span class="pill-eyebrow">Source Code</span>
            <span class="pill-title">GitHub Repo</span>
          </div>
        </a>
        <a :href="site.links.docs.url" target="_blank" rel="noreferrer" class="pill-btn">
          <i class="fas fa-book pill-icon"></i>
          <div class="pill-copy">
            <span class="pill-eyebrow">Documentation</span>
            <span class="pill-title">Read the Docs</span>
          </div>
        </a>
        <a :href="site.links.owasp.url" target="_blank" rel="noreferrer" class="pill-btn">
          <i class="fas fa-shield-alt pill-icon"></i>
          <div class="pill-copy">
            <span class="pill-eyebrow">Foundation</span>
            <span class="pill-title">OWASP Project</span>
          </div>
        </a>
      </div>
    </div>

    <div class="footer-wrap">
      <p class="footer-quote">"making threat modeling less threatening"</p>
    </div>

    <div class="deck-mark">
      <span class="deck-mark__name">Threat Dragon</span>
      <span class="deck-mark__subtitle">{{ deck.subtitle }}</span>
    </div>
  </div>
</template>

<style scoped>
.slide-container {
  width: 100%;
  min-height: min(80vh, 720px);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #1e1e2e;
  color: #ffffff;
  overflow: hidden;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.content-wrap {
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2.5rem;
  width: 100%;
  max-width: 64rem;
  padding: clamp(1.5rem, 4vh, 2.75rem) 2rem 6.5rem;
}

.mascot-wrap {
  margin-bottom: 0.5rem;
}

.text-block {
  text-align: center;
}

.hero-title {
  margin: 0;
  font-size: 4.5rem;
  line-height: 1;
  font-weight: 700;
  letter-spacing: -0.025em;
}

.accent-text {
  color: #e8341c;
}

.hero-subtitle {
  margin: 0;
  font-size: 1.875rem;
  line-height: 2.25rem;
  font-weight: 300;
  letter-spacing: 0.025em;
  color: #d0d0e8;
}

.actions {
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
  margin-top: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
}

.pill-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  border-radius: 9999px;
  background-color: rgba(37, 37, 53, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  backdrop-filter: blur(4px);
}

.pill-btn:hover {
  border-color: #e8341c;
  background-color: rgba(232, 52, 28, 0.1);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.pill-icon {
  font-size: 1.5rem;
  color: #d1d5db;
  transition: color 0.3s ease;
}

.pill-btn:hover .pill-icon {
  color: #e8341c;
}

.pill-copy {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.pill-eyebrow {
  font-size: 0.75rem;
  line-height: 1rem;
  color: #9ca3af;
  font-family: var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.pill-title {
  color: #ffffff;
  font-weight: 600;
}

.footer-wrap {
  position: absolute;
  right: 0;
  bottom: 0.9rem;
  left: 0;
  width: 100%;
  z-index: 10;
  text-align: center;
}

.footer-quote {
  margin: 0;
  font-size: 1.125rem;
  line-height: 1.75rem;
  font-style: italic;
  font-weight: 300;
  font-family: var(--font-mono);
  color: #6b7280;
  opacity: 0.6;
  letter-spacing: 0.05em;
}

.deck-mark {
  position: absolute;
  right: 2rem;
  bottom: 1.7rem;
  z-index: 10;
  display: inline-flex;
  align-items: baseline;
  gap: 0.45rem;
  color: #d0d0e8;
  font-family: var(--font-mono);
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.deck-mark__name {
  color: #9ca3af;
  font-weight: 500;
}

.deck-mark__subtitle {
  color: #e8341c;
  font-weight: 700;
}

@media (max-width: 959px) {
  .hero-title {
    font-size: clamp(3rem, 8vw, 4.5rem);
  }

  .hero-subtitle {
    font-size: clamp(1.4rem, 3.8vw, 1.875rem);
    line-height: 1.3;
  }
}

@media (max-width: 767px) {
  .slide-container {
    min-height: 100%;
    padding: 3rem 0 5rem;
  }

  .content-wrap {
    gap: 2rem;
    padding: 0 1.5rem 5.5rem;
  }

  .hero-title {
    font-size: clamp(2.5rem, 10vw, 3.5rem);
  }

  .hero-subtitle {
    font-size: 1.25rem;
  }

  .actions {
    flex-direction: column;
    width: 100%;
  }

  .pill-btn {
    justify-content: center;
    width: 100%;
  }

  .footer-wrap {
    position: relative;
    right: auto;
    bottom: auto;
    left: auto;
    margin-top: 1rem;
  }

  .deck-mark {
    position: relative;
    right: auto;
    bottom: auto;
    margin-top: 1rem;
  }
}
</style>
