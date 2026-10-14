import type { LoginPayload } from '@/models/auth/auth-model'
import { defineStore } from 'pinia'
import { useApiConnection } from '@/composables/api/api-connection'

export const useAuthStore = defineStore('AuthStore', () => {
  async function login(payload: LoginPayload) {
    const { statusCode } = await useApiConnection('/auth/web/login').post(payload).json()

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

    return {
      statusCode,
    }
  }

  return {
    login,
    refresh,
    logout,
  }
})
