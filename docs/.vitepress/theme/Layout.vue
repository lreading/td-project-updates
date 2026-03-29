<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'

import ImageLightbox from './ImageLightbox.vue'

const { frontmatter } = useData()
</script>

<template>
  <DefaultTheme.Layout>
    <template v-if="frontmatter.layout === 'home'" #home-hero-image>
      <div class="hero-video-wrap">
        <video autoplay loop muted playsinline>
          <source src="/readme-demo.mp4" type="video/mp4" />
        </video>
      </div>
    </template>
  </DefaultTheme.Layout>
  <ImageLightbox />
</template>

<style scoped>
.hero-video-wrap {
  width: 100%;
  max-width: 460px;
  margin: 0 auto;
}

.hero-video-wrap video {
  width: 100%;
  height: auto;
  border-radius: 14px;
  box-shadow: 0 24px 60px rgba(7, 10, 22, 0.28);
}
</style>
