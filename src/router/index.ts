import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '@/router/routes'

const router = createRouter({
  routes: routes,
  history: createWebHistory(import.meta.env.BASE_URL),
})

router.afterEach((to) => {
  document.title = String(to.meta.title) || 'App'
})

export default router
