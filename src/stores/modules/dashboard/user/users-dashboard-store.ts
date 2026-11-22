import type { ApiResponse, QueryParams, RouteParams } from '@/models/api/api-model'
import type {
  UsersModuleSummaryResponse,
  UserWithBlockedReviews,
} from '@/models/modules/dashboard/user/users-dashboard-model'
import { defineStore } from 'pinia'
import { useApiConnection } from '@/composables/api/api-connection'
import { generateFullEndpoint } from '@/utils/api/api-params-utils'

export const useUsersDashboardStore = defineStore('UsersDashboardStore', () => {
  async function getUsersModuleSummary(queryParams: QueryParams, routeParams: RouteParams) {
    return await useApiConnection(
      generateFullEndpoint('/admin/users/summary', queryParams, routeParams),
    )
      .get()
      .json<UsersModuleSummaryResponse>()
  }

  async function getUsersWithMostBlockedReviews(
    queryParams: QueryParams,
    routeParams: RouteParams,
  ) {
    return await useApiConnection(
      generateFullEndpoint('/admin/users/top-by-blocked-reviews', queryParams, routeParams),
    )
      .get()
      .json<ApiResponse<Array<UserWithBlockedReviews>>>()
  }

  return {
    getUsersModuleSummary,
    getUsersWithMostBlockedReviews,
  }
})
