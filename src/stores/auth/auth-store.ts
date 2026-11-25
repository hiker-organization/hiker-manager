import type { ApiResponse } from '@/models/api/api-model'
import type { LoginPayload, SessionUser } from '@/models/auth/auth-model'
import { useLocalStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useApiConnection } from '@/composables/api/api-connection'

export const useAuthStore = defineStore('AuthStore', () => {
  /*
    Indica que houve um login neste navegador. Não garante a sessão (os cookies são
    httpOnly), só evita chamar a API quando com certeza não há sessão.
  */

  const hasSessionHint = useLocalStorage<boolean>('hiker-manager-session', false)

  // Usuário da sessão, verificado na API na primeira navegação.

  const sessionUser = ref<SessionUser | null>(null)

  const isCheckingSession = ref<boolean>(false)

  async function login(payload: LoginPayload) {
    const { statusCode } = await useApiConnection('/auth/web/login').post(payload).json()

    if (statusCode.value === 201) {
      hasSessionHint.value = true

      sessionUser.value = null
    }

    return {
      statusCode,
    }
  }

  async function refresh() {
    const { statusCode } = await useApiConnection('/auth/web/refresh').post().json()

    return {
      statusCode,
    }
  }

  async function logout() {
    const { statusCode } = await useApiConnection('/auth/web/logout').post().json()

    clearSession()

    return {
      statusCode,
    }
  }

  async function fetchSession() {
    isCheckingSession.value = true

    const { data, statusCode } = await useApiConnection('/auth/web/me')
      .get()
      .json<ApiResponse<SessionUser>>()

    isCheckingSession.value = false

    if (statusCode.value === 200 && data.value) {
      sessionUser.value = data.value.data

      return
    }

    clearSession()
  }

  function clearSession() {
    hasSessionHint.value = false

    sessionUser.value = null
  }

  return {
    hasSessionHint,
    sessionUser,
    isCheckingSession,
    login,
    refresh,
    logout,
    fetchSession,
    clearSession,
  }
})
