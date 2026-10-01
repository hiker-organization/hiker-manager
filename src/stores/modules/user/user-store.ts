import type {
  ApiReponse,
  PaginatedResponse,
  QueryParams,
  RouteParams,
} from '@/models/api/api-model'
import type { User, UserBlockingParameters } from '@/models/modules/user/user-model'
import { defineStore } from 'pinia'
import { useApiConnection } from '@/composables/api/api-connection'
import { generateFullEndpoint } from '@/utils/api/api-params-utils'

export const useUserStore = defineStore('UserStore', () => {
  async function fetchAdmins(queryParams: QueryParams, routeParams: RouteParams) {
    return await useApiConnection(generateFullEndpoint('/admin/users', queryParams, routeParams))
      .get()
      .json<PaginatedResponse<User>>()
  }

  async function getUser(queryParams: QueryParams, routeParams: RouteParams) {
    return await useApiConnection(generateFullEndpoint('/admin/:user', queryParams, routeParams))
      .get()
      .json<ApiReponse<User>>()
  }

  async function blockUser(
    payload: UserBlockingParameters,
    queryParams: QueryParams,
    routeParams: RouteParams,
  ) {
    return await useApiConnection(
      generateFullEndpoint('/admin/:user/block', queryParams, routeParams),
    )
      .put(payload)
      .json()
  }

  async function unblockUser(queryParams: QueryParams, routeParams: RouteParams) {
    return await useApiConnection(
      generateFullEndpoint('/admin/:user/block', queryParams, routeParams),
    )
      .delete()
      .json()
  }

  return {
    fetchAdmins,
    getUser,
    blockUser,
    unblockUser,
  }
})
