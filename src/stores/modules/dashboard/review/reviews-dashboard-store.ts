import type { ApiResponse, QueryParams, RouteParams } from '@/models/api/api-model'
import type {
  ReviewsModuleSummaryResponse,
  ReviewMostReportedCurrently,
} from '@/models/modules/dashboard/review/reviews-dashboard-model'
import { defineStore } from 'pinia'
import { useApiConnection } from '@/composables/api/api-connection'
import { generateFullEndpoint } from '@/utils/api/api-params-utils'

export const useReviewsDashboardStore = defineStore('ReviewsDashboardStore', () => {
  async function getReviewsModuleSummary(queryParams: QueryParams, routeParams: RouteParams) {
    return await useApiConnection(
      generateFullEndpoint('/admin/reviews/summary', queryParams, routeParams),
    )
      .get()
      .json<ReviewsModuleSummaryResponse>()
  }

  async function getReviewsMostReportedCurrently(
    queryParams: QueryParams,
    routeParams: RouteParams,
  ) {
    return await useApiConnection(
      generateFullEndpoint('/admin/reviews/top-by-open-reports', queryParams, routeParams),
    )
      .get()
      .json<ApiResponse<Array<ReviewMostReportedCurrently>>>()
  }

  return {
    getReviewsModuleSummary,
    getReviewsMostReportedCurrently,
  }
})
