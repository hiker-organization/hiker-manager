import { createFetch } from "@vueuse/core"
import { apiHost } from "@/config/env"

export const useApiConnection = createFetch({
  baseUrl: apiHost,
  fetchOptions: {
    mode: 'cors',
  },
})
