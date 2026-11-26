import type { BeforeFetchContext, OnFetchErrorContext } from '@vueuse/core'
import { createFetch } from '@vueuse/core'
import { router } from '@/router/index'
import { apiHost } from '@/config/env'
import { useAuthStore } from '@/stores/auth/auth-store'

// Rotas de autenticação cujo 401 é a resposta final (credenciais erradas, refresh inválido).

const NO_REFRESH_ROUTES = ['/auth/web/login', '/auth/web/refresh']

/*
  Refresh em andamento, compartilhado pelas requisições que recebem 401 ao mesmo tempo.
  O refresh token é trocado a cada uso, então um segundo refresh com o token antigo
  falharia e encerraria uma sessão válida.
*/

let pendingRefresh: Promise<boolean> | null = null

function refreshSession(): Promise<boolean> {
  if (!pendingRefresh) {
    pendingRefresh = useAuthStore()
      .refresh()
      .then(({ statusCode }) => statusCode.value === 201)
      .finally(() => {
        pendingRefresh = null
      })
  }

  return pendingRefresh
}

// Requisições já repetidas após um refresh, para não renovar de novo se o 401 se repetir.

const retriedRequests = new WeakSet<() => Promise<unknown>>()

function redirectToLogin() {
  useAuthStore().clearSession()

  router.push({
    name: 'login',
    query: {
      authError: 'invalid',
    },
  })
}

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

      if (!response || ![401, 403].includes(response.status)) {
        return context
      }

      if (response.status === 403) {
        router.push({
          name: 'restrict',
        })

        return context
      }

      if (NO_REFRESH_ROUTES.some((route) => response.url.includes(route))) {
        return context
      }

      // O 401 se repetiu logo após um refresh bem-sucedido: a sessão não vale mais.

      if (retriedRequests.has(execute)) {
        redirectToLogin()

        return context
      }

      const refreshed = await refreshSession()

      if (!refreshed) {
        redirectToLogin()

        return context
      }

      retriedRequests.add(execute)

      try {
        return await execute()
      } finally {
        retriedRequests.delete(execute)
      }
    },
  },
  fetchOptions: {
    mode: 'cors',
    credentials: 'include',
  },
})
