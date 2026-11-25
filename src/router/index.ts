import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '@/router/routes'
import { useAuthStore } from '@/stores/auth/auth-store'

export const router = createRouter({
  routes: routes,
  history: createWebHistory(),
})

/*
  Verifica a sessão antes de renderizar qualquer rota protegida, para que a estrutura
  do painel não apareça para quem não está autenticado ou não é administrador.
*/

router.beforeEach(async (to) => {
  if (!to.matched.some((record) => record.meta.requiresAuth)) {
    return true
  }

  const authStore = useAuthStore()

  // Sem login neste navegador, vai direto ao login sem chamar a API.

  if (!authStore.hasSessionHint) {
    return { name: 'login' }
  }

  // A API só é consultada na primeira navegação, depois o resultado fica no store.

  if (!authStore.sessionUser) {
    await authStore.fetchSession()
  }

  if (!authStore.sessionUser) {
    return { name: 'login', query: { authError: 'invalid' } }
  }

  if (authStore.sessionUser.cargo !== 'ADM') {
    return { name: 'restrict' }
  }

  return true
})

router.afterEach((to) => {
  document.title = String(to.meta.title) || 'Hiker'
})

export default router
