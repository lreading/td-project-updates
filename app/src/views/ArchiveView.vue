<script setup lang="ts">
import { computed, ref, watch } from 'vue'

import { ArchiveCatalog } from '../content/ArchiveCatalog'
import { buildArchivePagination } from '../content/ArchivePagination'
import { contentRepository } from '../content/ContentRepository'

const presentations = contentRepository.listPresentations()
const catalog = new ArchiveCatalog(presentations)

const search = ref('')
const selectedYear = ref<string>('all')
const currentPage = ref(1)
const pageSize = 12

const availableYears = computed(() => catalog.listYears())
const activeYear = computed(() =>
  selectedYear.value === 'all' ? null : Number.parseInt(selectedYear.value, 10),
)
const pageResult = computed(() =>
  catalog.getPage({
    page: currentPage.value,
    pageSize,
    search: search.value,
    year: activeYear.value,
  }),
)
const paginationItems = computed(() =>
  buildArchivePagination(pageResult.value.totalPages, pageResult.value.page),
)

watch([search, selectedYear], () => {
  currentPage.value = 1
})

watch(pageResult, (result) => {
  if (result.page !== currentPage.value) {
    currentPage.value = result.page
  }
})

function goToPage(page: number): void {
  currentPage.value = page
}
</script>

<template>
  <main class="page">
    <div class="page-header archive-header">
      <div class="archive-heading">
        <p class="archive-eyebrow">All presentations</p>
      </div>
    </div>

    <section class="archive-panel">
      <div class="archive-toolbar">
        <label class="archive-field">
          <span class="archive-field__label">Search</span>
          <input
            v-model="search"
            class="archive-input"
            type="search"
            placeholder="Search title, summary, quarter, or year"
          />
        </label>

        <label class="archive-field archive-field--year">
          <span class="archive-field__label">Year</span>
          <select v-model="selectedYear" class="archive-select">
            <option value="all">All years</option>
            <option v-for="year in availableYears" :key="year" :value="String(year)">
              {{ year }}
            </option>
          </select>
        </label>
      </div>

      <div class="archive-results-summary">
        <p>
          <strong>{{ pageResult.totalItems }}</strong> presentation{{
            pageResult.totalItems === 1 ? '' : 's'
          }}
          total
        </p>
        <p v-if="pageResult.totalItems > 0">
          Page {{ pageResult.page }} of {{ pageResult.totalPages }} · Showing
          {{ pageResult.startItem }}-{{ pageResult.endItem }}
        </p>
      </div>

      <div v-if="pageResult.items.length" class="archive-list">
        <article v-for="entry in pageResult.items" :key="entry.id" class="archive-row">
          <div class="archive-meta">
            <p class="archive-quarter">Q{{ entry.quarter }} {{ entry.year }}</p>
            <p class="archive-id">{{ entry.id }}</p>
          </div>

          <div class="archive-copy">
            <h2 class="archive-title">{{ entry.title }}</h2>
            <p class="archive-summary">{{ entry.summary }}</p>
          </div>

          <div class="archive-actions">
            <RouterLink
              :to="{ name: 'presentation', params: { presentationId: entry.id } }"
              class="archive-link"
            >
              Open presentation
            </RouterLink>
          </div>
        </article>
      </div>

      <div v-else class="archive-empty">
        <h2>No matching presentations</h2>
        <p>Try a different year or a broader search term.</p>
      </div>

      <div v-if="pageResult.totalPages > 1" class="archive-pagination">
        <button
          class="archive-page-button"
          :disabled="pageResult.page === 1"
          type="button"
          @click="goToPage(pageResult.page - 1)"
        >
          Previous
        </button>

        <button
          v-for="item in paginationItems"
          :key="item.key"
          class="archive-page-button"
          :class="{
            'archive-page-button--active': item.current,
            'archive-page-button--ellipsis': item.ellipsis,
          }"
          :disabled="item.ellipsis"
          type="button"
          @click="item.page && goToPage(item.page)"
        >
          {{ item.label }}
        </button>

        <button
          class="archive-page-button"
          :disabled="pageResult.page === pageResult.totalPages"
          type="button"
          @click="goToPage(pageResult.page + 1)"
        >
          Next
        </button>
      </div>
    </section>
  </main>
</template>

<style scoped>
.archive-id,
.archive-summary,
.archive-results-summary p {
  margin: 0;
}

.archive-header {
  gap: 1.5rem;
  align-items: end;
}

.archive-heading {
  display: grid;
}

.archive-eyebrow {
  color: var(--accent-soft);
  font: 700 0.95rem/1.2 var(--font-mono);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  opacity: 0.95;
}

.archive-panel {
  display: grid;
  gap: 1.25rem;
  padding: 1.25rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 1rem;
  background:
    linear-gradient(180deg, rgba(232, 52, 28, 0.06), rgba(232, 52, 28, 0)),
    rgba(18, 24, 36, 0.92);
}

.archive-toolbar {
  display: grid;
  gap: 1rem;
  grid-template-columns: minmax(0, 1fr) 180px;
}

.archive-field {
  display: grid;
  gap: 1.2rem;
}

.archive-field__label {
  color: var(--secondary-text);
  font: 600 0.8rem/1.2 var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.archive-input,
.archive-select {
  width: 100%;
  min-height: 2.75rem;
  padding: 0.75rem 0.9rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.75rem;
  background-color: rgba(37, 37, 53, 0.95);
  color: var(--primary-text);
  font: inherit;
}

.archive-input::placeholder {
  color: rgba(208, 208, 232, 0.45);
}

.archive-input:focus,
.archive-select:focus {
  outline: 2px solid rgba(232, 52, 28, 0.45);
  outline-offset: 2px;
  border-color: rgba(232, 52, 28, 0.35);
}

.archive-results-summary {
  display: flex;
  gap: 0.75rem;
  align-items: baseline;
  justify-content: space-between;
  color: var(--secondary-text);
  font-size: 0.95rem;
}

.archive-list {
  display: grid;
  gap: 0.9rem;
}

.archive-row {
  display: grid;
  gap: 1rem;
  align-items: center;
  grid-template-columns: 140px minmax(0, 1fr) auto;
  padding: 1rem 1.1rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 0.95rem;
  background-color: rgba(37, 37, 53, 0.78);
}

.archive-meta {
  display: grid;
  gap: 0.35rem;
}

.archive-quarter {
  color: var(--accent-soft);
  font: 600 0.875rem/1.2 var(--font-mono);
  margin: 0;
}

.archive-id {
  color: rgba(208, 208, 232, 0.55);
  font: 500 0.78rem/1.2 var(--font-mono);
}

.archive-title {
  margin: 0;
  font-size: 1.15rem;
}

.archive-summary {
  color: var(--secondary-text);
}

.archive-copy {
  display: grid;
  gap: 0.45rem;
}

.archive-actions {
  display: flex;
  justify-content: flex-end;
}

.archive-link,
.archive-page-button {
  appearance: none;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 999px;
  background-color: rgba(232, 52, 28, 0.1);
  color: var(--primary-text);
  cursor: pointer;
  text-decoration: none;
  transition:
    border-color 0.2s ease,
    background-color 0.2s ease,
    color 0.2s ease,
    transform 0.2s ease;
}

.archive-link {
  padding: 0.75rem 1rem;
  border-color: rgba(255, 133, 108, 0.65);
  background: linear-gradient(180deg, #f04d32 0%, #e8341c 100%);
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.04) inset,
    0 10px 24px rgba(232, 52, 28, 0.28);
  font-size: 1.02rem;
  font-weight: 500;
  white-space: nowrap;
}

.archive-page-button {
  padding: 0.55rem 0.9rem;
  font: 600 0.9rem/1 var(--font-mono);
}

.archive-link:hover,
.archive-page-button:hover:not(:disabled),
.archive-page-button--active {
  border-color: rgba(232, 52, 28, 0.5);
  background-color: rgba(232, 52, 28, 0.2);
  color: #ffffff;
  transform: translateY(-1px);
}

.archive-link:hover {
  border-color: rgba(255, 160, 138, 0.75);
  background: linear-gradient(180deg, #f45d44 0%, #ea3c22 100%);
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.06) inset,
    0 14px 30px rgba(232, 52, 28, 0.34);
}

.archive-page-button:disabled {
  cursor: not-allowed;
  opacity: 0.45;
}

.archive-page-button--ellipsis {
  border-color: transparent;
  background-color: transparent;
  transform: none;
}

.archive-pagination {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: flex-end;
}

.archive-empty {
  display: grid;
  gap: 0.35rem;
  padding: 2rem 1rem;
  text-align: center;
  border: 1px dashed rgba(255, 255, 255, 0.16);
  border-radius: 1rem;
  color: var(--secondary-text);
}

.archive-empty h2 {
  margin: 0;
  color: var(--primary-text);
}

@media (max-width: 900px) {
  .archive-header {
    align-items: start;
  }

  .archive-toolbar,
  .archive-row {
    grid-template-columns: 1fr;
  }

  .archive-results-summary {
    align-items: flex-start;
    flex-direction: column;
  }

  .archive-actions,
  .archive-pagination {
    justify-content: flex-start;
  }
}
</style>
