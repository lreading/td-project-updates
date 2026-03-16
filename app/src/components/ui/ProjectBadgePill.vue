<script setup lang="ts">
import type { ProjectBadgeDisplay } from '../../content/projectBadge'

defineProps<{
  badge: ProjectBadgeDisplay
}>()
</script>

<template>
  <div class="project-badge-pill">
    <p class="project-badge-pill__text">
      <span class="project-badge-pill__section">
        <i
          v-if="badge.iconClass && badge.iconPosition === 'before'"
          :class="[badge.iconClass, 'project-badge-pill__icon']"
        ></i>
        <span v-if="badge.label">{{ badge.label }}</span>
        <i
          v-if="badge.iconClass && badge.iconPosition === 'after'"
          :class="[badge.iconClass, 'project-badge-pill__icon project-badge-pill__icon--after']"
        ></i>
      </span>
    </p>
  </div>
</template>

<style scoped>
.project-badge-pill {
  padding: 0.25rem 1rem;
  border-radius: 9999px;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(4px);
}

.project-badge-pill__text {
  margin: 0;
  color: #d1d5db;
  display: inline-flex;
  align-items: center;
  font: 400 0.75rem/1rem var(--font-mono);
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.project-badge-pill__section {
  display: inline-flex;
  align-items: center;
}

.project-badge-pill__icon {
  margin-right: 0.5rem;
  color: #e8341c;
}

.project-badge-pill__icon--after {
  margin-right: 0;
  margin-left: 0.5rem;
}
</style>
