import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '@/router/routes'
import { useAuthStore } from '@/stores/auth/auth-store'
import { useToast } from '@/composables/notify/toastify'

const router = createRouter({
  routes: routes,
  history: createWebHistory(import.meta.env.BASE_URL),
})

router.beforeEach((to) => {
  const authStore = useAuthStore()

  if (to.name !== 'login' && !authStore.isAuthenticated) {
    return {
      name: 'login',
      query: {
        authError: 'invalid',
      },
    }
  }

  return true
})

router.afterEach((to) => {
  const { notify } = useToast()

  document.title = String(to.meta.title) || 'Hiker'

  if (to.name === 'login' && to.query.authError === 'invalid') {
    notify.error('Autenticação inválida.')
  }
})

export default router
