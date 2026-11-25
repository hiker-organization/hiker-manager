import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth/auth-store'
import { useToast } from '@/composables/notify/toastify'

export function useLogout() {
  const router = useRouter()

  const authStore = useAuthStore()

  const { notify } = useToast()

  async function handleLogout() {
    // A sessão local é limpa pelo store mesmo se a API falhar, então sempre vai ao login.

    await authStore.logout()

    notify.success('Sessão encerrada.')

    router.push({
      name: 'login',
    })
  }

  return {
    handleLogout,
  }
}
