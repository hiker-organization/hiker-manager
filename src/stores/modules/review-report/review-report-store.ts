import type { PaginatedResponse, QueryParams, RouteParams } from '@/models/api/api-model'
import type { ReviewReportListRow } from '@/models/modules/review-report/review-report-model'
import { defineStore } from 'pinia'
import { useApiConnection } from '@/composables/api/api-connection'
import { generateFullEndpoint } from '@/utils/api/api-params-utils'

export const useReviewReportStore = defineStore('ReviewReportStore', () => {
  async function fetchReviewReports(queryParams: QueryParams, routeParams: RouteParams) {
    return await useApiConnection(
      generateFullEndpoint('/admin/review/:reviewCode/reports', queryParams, routeParams),
    )
      .get()
      .json<PaginatedResponse<ReviewReportListRow>>()
  }

  return {
    fetchReviewReports,
  }
})
