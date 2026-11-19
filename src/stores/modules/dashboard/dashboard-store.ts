import type { QueryParams, RouteParams } from '@/models/api/api-model'
import type {
  ReviewsModuleSummaryResponse,
  UsersModuleSummaryResponse,
} from '@/models/modules/dashboard/dashboard-model'
import { defineStore } from 'pinia'
import { useApiConnection } from '@/composables/api/api-connection'
import { generateFullEndpoint } from '@/utils/api/api-params-utils'

export const useDashboardStore = defineStore('DashboardStore', () => {
  async function getUsersModuleSummary(queryParams: QueryParams, routeParams: RouteParams) {
    return await useApiConnection(
      generateFullEndpoint('/admin/users/summary', queryParams, routeParams),
    )
      .get()
      .json<UsersModuleSummaryResponse>()
  }

  async function getReviewsModuleSummary(queryParams: QueryParams, routeParams: RouteParams) {
    return await useApiConnection(
      generateFullEndpoint('/admin/reviews/summary', queryParams, routeParams),
    )
      .get()
      .json<ReviewsModuleSummaryResponse>()
  }

  return {
    getUsersModuleSummary,
    getReviewsModuleSummary,
  }
})
