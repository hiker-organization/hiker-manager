import type { QueryParams, RouteParams } from '@/models/api/api-model'
import type { PaginatedResponse } from '@/models/components/table/pagination-model'
import type { UserListingResponse } from '@/models/modules/user/user-model'
import { defineStore } from 'pinia'
import { useApiConnection } from '@/composables/api/api-connection'
import { generateFullEndpoint } from '@/utils/api/api-params-utils'

export const useUserStore = defineStore('UserStore', () => {
  async function fetchAdmins(queryParams: QueryParams, routeParams: RouteParams) {
    return await useApiConnection(
      generateFullEndpoint(
        '/admin/users',
        queryParams,
        routeParams,
      )
    ).get().json<PaginatedResponse<UserListingResponse>>()
  }

  return {
    fetchAdmins,
  }
})
