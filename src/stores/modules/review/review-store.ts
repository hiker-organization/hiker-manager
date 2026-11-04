import type {
  ApiReponse,
  PaginatedResponse,
  QueryParams,
  RouteParams,
} from '@/models/api/api-model'
import type { Review, ReviewListRow } from '@/models/modules/review/review-model'
import { defineStore } from 'pinia'
import { useApiConnection } from '@/composables/api/api-connection'
import { generateFullEndpoint } from '@/utils/api/api-params-utils'

export const useReviewStore = defineStore('ReviewStore', () => {
  async function fetchReviews(queryParams: QueryParams, routeParams: RouteParams) {
    return await useApiConnection(generateFullEndpoint('/admin/reviews', queryParams, routeParams))
      .get()
      .json<PaginatedResponse<ReviewListRow>>()
  }

  async function getReview(queryParams: QueryParams, routeParams: RouteParams) {
    return await useApiConnection(
      generateFullEndpoint('/review/:reviewCode', queryParams, routeParams),
    )
      .get()
      .json<ApiReponse<Review>>()
  }

  return {
    fetchReviews,
    getReview,
  }
})
