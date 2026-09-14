import type { BeforeFetchContext, AfterFetchContext } from '@vueuse/core'
import { createFetch } from '@vueuse/core'
import { apiHost } from '@/config/env'
import { useAuthStore } from '@/stores/auth/auth-store'

export const useApiConnection = createFetch({
  baseUrl: apiHost,
  options: {
    beforeFetch: (context: BeforeFetchContext) => {
      const { options } = context

      const authStore = useAuthStore()

      let headers: HeadersInit | undefined = {
        ...options.headers,
        'Content-Type': 'application/json',
      }

      if (authStore.isAuthenticated) {
        headers = {
          ...headers,
          Authorization: `Bearer ${authStore.getAuthToken()}`,
        }
      }

      options.headers = headers

      return context
    },
    afterFetch: (context: AfterFetchContext) => {
      const { response } = context

      const authStore = useAuthStore()

      if (response.status === 401) {
        authStore.revokeAuth()
      }

      return context
    },
  },
  fetchOptions: {
    mode: 'cors',
  },
})
