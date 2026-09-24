import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '@/router/routes'

export const router = createRouter({
  routes: routes,
  history: createWebHistory(),
})

router.afterEach((to) => {
  document.title = String(to.meta.title) || 'Hiker'
})

export default router
