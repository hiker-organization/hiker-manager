import type { LoginPayload, LoginResponse } from '@/models/auth/auth-model'
import { useSessionStorage } from '@vueuse/core'
import { computed } from 'vue'
import { defineStore } from 'pinia'
import { useApiConnection } from '@/composables/api/api-connection'

export const useAuthStore = defineStore('AuthStore', () => {
  const authToken = useSessionStorage<string | null>('auth-token', null)

  const isAuthenticated = computed<boolean>(() => authToken.value !== null)

  function getAuthToken() {
    return authToken.value || ''
  }

  function applyAuth(token: string) {
    authToken.value = token || null
  }

  function revokeAuth() {
    authToken.value = null
  }

  async function executeAuth(payload: LoginPayload) {
    const { data, statusCode } = await useApiConnection('/auth/login')
      .post(payload)
      .json<LoginResponse>()

    if (statusCode.value === 201 && data.value) {
      applyAuth(data.value.access_token)
    }

    return {
      statusCode,
    }
  }

  return {
    isAuthenticated,
    getAuthToken,
    executeAuth,
    revokeAuth,
  }
})
