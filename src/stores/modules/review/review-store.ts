import type { PaginatedResponse, QueryParams, RouteParams } from '@/models/api/api-model'
import type { Report } from '@/models/modules/report/report-model'
import type { Review } from '@/models/modules/review/review-model'
import { defineStore } from 'pinia'
import { useApiConnection } from '@/composables/api/api-connection'
import { generateFullEndpoint } from '@/utils/api/api-params-utils'

export const useReviewStore = defineStore('ReviewStore', () => {
  async function fetchReviews(queryParams: QueryParams, routeParams: RouteParams) {
    return await useApiConnection(generateFullEndpoint('/admin/reviews', queryParams, routeParams))
      .get()
      .json<PaginatedResponse<Review>>()
  }

  async function fetchReviewReports(queryParams: QueryParams, routeParams: RouteParams) {
    return await useApiConnection(generateFullEndpoint('/admin/review/:reviewCode/reports', queryParams, routeParams))
      .get()
      .json<PaginatedResponse<Report>>()
  }

  return {
    fetchReviews,
    fetchReviewReports,
  }
})
