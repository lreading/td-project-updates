import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import ArchiveView from '../views/ArchiveView.vue'
import DeckView from '../views/DeckView.vue'
import HomeView from '../views/HomeView.vue'

export const appRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/presentations',
    name: 'archive',
    component: ArchiveView,
  },
  {
    path: '/presentations/:presentationId',
    name: 'presentation',
    component: DeckView,
  },
]

export const createAppRouter = (useMemoryHistory = false) =>
  createRouter({
    history: useMemoryHistory
      ? createMemoryHistory(import.meta.env.BASE_URL)
      : createWebHistory(import.meta.env.BASE_URL),
    routes: appRoutes,
  })

export const router = createAppRouter()
