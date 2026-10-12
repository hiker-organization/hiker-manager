import type { BeforeFetchContext, OnFetchErrorContext } from '@vueuse/core'
import { createFetch } from '@vueuse/core'
import { router } from '@/router/index'
import { apiHost } from '@/config/env'
import { useAuthStore } from '@/stores/auth/auth-store'

export const useApiConnection = createFetch({
  baseUrl: apiHost,
  options: {
    beforeFetch: (context: BeforeFetchContext) => {
      const { options } = context

      const headers: HeadersInit | undefined = {
        ...options.headers,
        'Content-Type': 'application/json',
      }

      options.headers = headers

      return context
    },
    onFetchError: async (context: OnFetchErrorContext) => {
      const { response, execute } = context

      const authStore = useAuthStore()

      if (!response || ![401, 403].includes(response.status)) {
        return context
      }

      if (response.status === 403) {
        router.push({
          name: 'restrict',
        })

        return context
      }

      if (response.url.includes('/auth/web/refresh')) {
        router.push({
          name: 'login',
          query: {
            authError: 'invalid',
          },
        })

        return context
      }

      const { statusCode } = await authStore.refresh()

      if (statusCode.value !== 200) {
        router.push({
          name: 'login',
          query: {
            authError: 'invalid',
          },
        })

        return context
      }

      return execute()
    },
  },
  fetchOptions: {
    mode: 'cors',
    credentials: 'include',
  },
})
